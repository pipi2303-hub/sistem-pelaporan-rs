# 09 — DevOps & Infrastruktur

**Docker | GitHub Actions CI/CD | Monitoring | Backup**

---

## Daftar Isi

1. [Arsitektur Deployment](#1-arsitektur-deployment)
2. [Dockerfile](#2-dockerfile)
3. [CI/CD Pipeline](#3-cicd-pipeline)
4. [Nginx Configuration](#4-nginx-configuration)
5. [Monitoring & Alerting](#5-monitoring--alerting)
6. [Backup Strategy](#6-backup-strategy)
7. [Incident Response](#7-incident-response)
8. [Checklist Go-Live](#8-checklist-go-live)

---

## 1. Arsitektur Deployment

### Production Stack

```
Internet
    │ HTTPS (Port 443)
    ▼
┌───────────────────────────────────────────────────┐
│  Nginx (Reverse Proxy + SSL Termination)          │
│  Let's Encrypt / Self-signed cert                 │
└─────────┬────────────────────┬────────────────────┘
          │                    │
          ▼                    ▼
   ┌──────────────┐    ┌──────────────────┐
   │  Next.js     │    │   NestJS API     │
   │  (Port 3000) │    │   (Port 3001)    │
   └──────────────┘    └────────┬─────────┘
                                │
          ┌─────────────────────┼────────────────────┐
          ▼                     ▼                    ▼
   ┌──────────────┐   ┌──────────────────┐  ┌──────────────┐
   │  PostgreSQL  │   │      Redis       │  │    MinIO     │
   │  (Port 5432) │   │   (Port 6379)    │  │  (Port 9000) │
   └──────────────┘   └──────────────────┘  └──────────────┘
```

### Docker Production Compose

```yaml
# docker/docker-compose.prod.yml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: sirs_postgres_prod
    restart: always
    environment:
      POSTGRES_DB:       ${POSTGRES_DB}
      POSTGRES_USER:     ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_prod_data:/var/lib/postgresql/data
    networks:
      - sirs_internal
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: sirs_redis_prod
    restart: always
    command: >
      redis-server
      --requirepass ${REDIS_PASSWORD}
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --appendonly yes
    volumes:
      - redis_prod_data:/data
    networks:
      - sirs_internal

  minio:
    image: minio/minio:latest
    container_name: sirs_minio_prod
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER:     ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - minio_prod_data:/data
    networks:
      - sirs_internal

  api:
    image: ${REGISTRY}/sirs-api:${IMAGE_TAG}
    container_name: sirs_api_prod
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    env_file:
      - .env.prod
    networks:
      - sirs_internal
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://localhost:3001/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'

  web:
    image: ${REGISTRY}/sirs-web:${IMAGE_TAG}
    container_name: sirs_web_prod
    restart: always
    depends_on:
      - api
    env_file:
      - .env.web.prod
    networks:
      - sirs_internal
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'

  nginx:
    image: nginx:alpine
    container_name: sirs_nginx_prod
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      - api
      - web
    networks:
      - sirs_internal
      - sirs_external

volumes:
  postgres_prod_data:
  redis_prod_data:
  minio_prod_data:
  nginx_logs:

networks:
  sirs_internal:
    driver: bridge
    internal: true   # API, DB tidak aksesibel dari luar
  sirs_external:
    driver: bridge   # Hanya Nginx yang di-expose
```

---

## 2. Dockerfile

### API Dockerfile

```dockerfile
# apps/api/Dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter=@sirs/api build
RUN pnpm db:generate

# Stage 2: Production
FROM node:20-alpine AS production

RUN npm install -g pnpm
WORKDIR /app

# Install only production deps
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Non-root user
RUN addgroup -g 1001 -S sirs && adduser -S sirs -u 1001
USER sirs

EXPOSE 3001

# Jalankan migrasi + start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
```

### Web Dockerfile

```dockerfile
# apps/web/Dockerfile
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter=@sirs/web build

# Production
FROM node:20-alpine AS production

WORKDIR /app
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

RUN addgroup -g 1001 -S sirs && adduser -S sirs -u 1001
USER sirs

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 3. CI/CD Pipeline

### GitHub Actions — Full Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: sirs_test
          POSTGRES_USER: sirs_test
          POSTGRES_PASSWORD: sirs_test
        ports: ["5433:5432"]
        options: --health-cmd pg_isready --health-interval 5s --health-retries 5
      redis:
        image: redis:7-alpine
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }

      - run: pnpm install --frozen-lockfile
      - run: pnpm db:generate
      - run: pnpm db:migrate
        env:
          DATABASE_URL: postgresql://sirs_test:sirs_test@localhost:5433/sirs_test

      - name: Run all tests
        run: pnpm test
        env:
          DATABASE_URL: postgresql://sirs_test:sirs_test@localhost:5433/sirs_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: ci-test-secret

      - name: Check coverage
        run: pnpm test:cov

  build-and-push:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=api-
            type=ref,event=branch

      - name: Build and push API image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/api/Dockerfile
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/api:${{ github.sha }}
          cache-from: type=gha
          cache-to:   type=gha,mode=max

      - name: Build and push Web image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: apps/web/Dockerfile
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/web:${{ github.sha }}
          cache-from: type=gha
          cache-to:   type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: Deploy ke server on-premise via SSH
        uses: appleboy/ssh-action@v1
        with:
          host:     ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key:      ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /opt/sirs-app
            export IMAGE_TAG=${{ github.sha }}
            docker compose -f docker/docker-compose.prod.yml pull
            docker compose -f docker/docker-compose.prod.yml up -d --remove-orphans
            docker image prune -f
            echo "Deploy $IMAGE_TAG selesai: $(date)"
```

---

## 4. Nginx Configuration

```nginx
# docker/nginx/nginx.prod.conf
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Hide nginx version
    server_tokens off;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log warn;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=60r/m;
    limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;

    # HTTP → HTTPS redirect
    server {
        listen 80;
        server_name _;
        return 301 https://$host$request_uri;
    }

    # HTTPS
    server {
        listen 443 ssl http2;
        server_name sirs.rs-anda.local;  # ganti dengan domain RS

        ssl_certificate     /etc/nginx/certs/cert.pem;
        ssl_certificate_key /etc/nginx/certs/key.pem;
        ssl_protocols       TLSv1.2 TLSv1.3;
        ssl_ciphers         HIGH:!aNULL:!MD5;

        client_max_body_size 10M;  # untuk upload dokumen

        # Frontend (Next.js)
        location / {
            proxy_pass         http://web:3000;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }

        # API
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            proxy_pass         http://api:3001;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_read_timeout 60s;
        }

        # Login rate limiting ketat
        location /api/v1/auth/login {
            limit_req zone=login_limit burst=3 nodelay;
            proxy_pass http://api:3001;
        }

        # MinIO (internal only — hanya untuk upload dari API)
        # Jangan expose MinIO ke internet
    }
}
```

---

## 5. Monitoring & Alerting

### Health Check Endpoint

```typescript
// apps/api/src/modules/admin/system.controller.ts
@Get('health')
@Public()  // Tidak perlu auth, untuk load balancer check
async getHealth() {
  const dbStatus   = await this.checkDatabase();
  const redisStatus = await this.checkRedis();
  const overall = dbStatus && redisStatus ? 'healthy' : 'degraded';

  return {
    status: overall,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    db:    { connected: dbStatus },
    redis: { connected: redisStatus }
  };
}
```

### Uptime Monitoring (Uptime Kuma — Self-hosted)

```yaml
# Tambahkan ke docker-compose.prod.yml
uptime_kuma:
  image: louislam/uptime-kuma:1
  container_name: sirs_uptime
  restart: always
  volumes:
    - uptime_data:/app/data
  ports:
    - "3003:3001"
  networks:
    - sirs_external
```

Monitor berikut di Uptime Kuma:
- `https://sirs.rs-anda.local/api/v1/health` — API health
- `https://sirs.rs-anda.local` — Web app
- `https://sirs6.kemkes.go.id` — SIRS Online availability
- BullMQ queue length (custom monitor via API)

### Log Monitoring (opsional — Loki + Grafana)

```yaml
# docker-compose.monitoring.yml
services:
  grafana:
    image: grafana/grafana:latest
    container_name: sirs_grafana
    ports: ["3004:3000"]
    volumes:
      - grafana_data:/var/lib/grafana

  loki:
    image: grafana/loki:latest
    container_name: sirs_loki
    ports: ["3100:3100"]
    volumes:
      - loki_data:/loki
```

---

## 6. Backup Strategy

### Backup Otomatis PostgreSQL

```bash
#!/bin/bash
# scripts/backup-postgres.sh
# Dijalankan setiap malam jam 02.00 via cron

set -e

BACKUP_DIR="/opt/sirs-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="sirs_db_${TIMESTAMP}.sql.gz"
RETENTION_DAYS=30

echo "[BACKUP] Mulai backup: $TIMESTAMP"

# Dump database
docker exec sirs_postgres_prod pg_dump \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  --no-password \
  | gzip > "$BACKUP_DIR/$BACKUP_FILE"

echo "[BACKUP] File dibuat: $BACKUP_FILE ($(du -sh $BACKUP_DIR/$BACKUP_FILE | cut -f1))"

# Upload ke MinIO (backup offsite)
docker exec sirs_minio_prod mc cp \
  "/data/$BACKUP_FILE" \
  "local/sirs-backups/$BACKUP_FILE"

# Hapus backup lokal lebih dari 30 hari
find "$BACKUP_DIR" -name "sirs_db_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "[BACKUP] Selesai: $TIMESTAMP"
```

```bash
# Crontab (jalankan sebagai root atau user sirs)
# Edit dengan: crontab -e
0 2 * * * /opt/sirs-app/scripts/backup-postgres.sh >> /var/log/sirs-backup.log 2>&1
```

### Prosedur Restore

```bash
# Restore dari backup
gunzip -c sirs_db_20260520_020000.sql.gz | \
  docker exec -i sirs_postgres_prod psql \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB"
```

### Retensi Backup

| Tipe | Retensi |
|---|---|
| Backup harian | 30 hari |
| Backup mingguan (Minggu) | 3 bulan |
| Backup bulanan (tanggal 1) | 1 tahun |
| Backup sebelum go-live | Permanen |

---

## 7. Incident Response

### Runbook: Deadline Pelaporan (Tgl 8–10 Tiap Bulan)

**Skenario: API Kemenkes down pada hari deadline**

```
1. Cek status API Kemenkes:
   curl -I https://sirs6.kemkes.go.id
   → Jika timeout: jangan panik, retry queue akan coba lagi

2. Cek queue BullMQ:
   GET /api/v1/admin/system-health
   → Lihat "submit_kemenkes" queue: waiting, active, failed

3. Jika failed count tinggi:
   a. Cek log detail: GET /api/v1/admin/audit-log?aksi=SUBMIT_FAILED
   b. Retry manual: POST /api/v1/admin/scheduler-jobs/{id}/run-now

4. Jika API Kemenkes masih down mendekati deadline:
   a. Export laporan ke Excel/PDF: GET /api/v1/rl3/indikator/{id}/export
   b. Submit manual via web SIRS Online dengan file Excel
   c. Catat nomor tiket ke Kemenkes

5. Dokumentasikan incident di audit log
```

### Runbook: Database Error

```bash
# 1. Cek status container
docker ps -a | grep sirs_postgres

# 2. Cek log PostgreSQL
docker logs sirs_postgres_prod --tail 100

# 3. Jika disk penuh
df -h /var/lib/docker
# → Hapus backup lama, atau tambah disk

# 4. Restart container (jika perlu)
docker restart sirs_postgres_prod

# 5. Jika data corrupt: restore dari backup
# (lihat prosedur restore di atas)
```

---

## 8. Checklist Go-Live

### Infrastruktur
- [ ] Server on-premise dipasang dan dikonfigurasi (Ubuntu 22.04 LTS)
- [ ] Docker & Docker Compose terinstall
- [ ] SSL certificate terpasang (self-signed atau Let's Encrypt)
- [ ] Firewall: hanya port 80, 443 yang terbuka ke publik
- [ ] Backup otomatis berjalan dan diverifikasi

### Aplikasi
- [ ] Semua migrasi database dijalankan
- [ ] Seed master data lengkap (ICD-10, kelas TT, dll.)
- [ ] Profil RS diisi oleh admin
- [ ] Semua laporan_periode untuk 1 tahun ke depan dibuat
- [ ] 8 role & semua permissions terkonfigurasi
- [ ] User accounts semua PIC dibuat + password sementara
- [ ] Notifikasi email test berhasil

### Keamanan
- [ ] Semua default password diganti
- [ ] JWT_SECRET panjang (≥64 karakter) dan unik
- [ ] PostgreSQL tidak terbuka ke luar server
- [ ] Redis terproteksi password
- [ ] MinIO tidak terbuka ke internet
- [ ] Audit log aktif dan tercatat

### Operasional
- [ ] Uptime monitoring aktif
- [ ] Cron backup berjalan
- [ ] Runbook incident response dibagikan ke admin
- [ ] Nomor kontak Kemenkes untuk eskalasi tersedia
- [ ] Pelatihan semua PIC unit selesai
- [ ] Sesi demo dengan direksi selesai

### Pre-Launch Test
- [ ] Input data 1 bulan dummy: semua modul terisi
- [ ] Workflow approval full cycle: draft → sent
- [ ] Export Excel/PDF berfungsi
- [ ] Dashboard menampilkan data dengan benar
- [ ] Test submit ke SIRS Online (dengan akun test jika tersedia)
- [ ] Load test: 20 concurrent users, response time <2 detik
