## File Sharing Server

## Objective

The objective of this project was to deploy a lightweight, fully containerized file-sharing web application using FileBrowser via Docker Compose. This enhanced setup introduces HTTPS with a self-signed certificate using an NGINX reverse proxy, environment-based secrets management, persistent data volumes, and automated file backups. The configuration replicates secure NAS/file-server use cases for local or small team environments running on a Windows 11 host.

### Skills Learned

- Writing modular docker-compose.yml files for multi-container environments
- Using NGINX as a reverse proxy to enable HTTPS for web UI access
- Mounting Windows host directories into containers as persistent Docker volumes
- Securing credentials using .env files and removing default hardcoded secrets
- Writing shell scripts for backing up mounted file storage volumes
- Adding health checks and restart policies to ensure container uptime
- Validating secure browser access to containerized services

### Tools Used

- Docker Desktop (Windows 11):<br>
  Run and manage containers
- Docker Compose: <br>
  Define and orchestrate multi-container services
- FileBrowser: <br>
  Lightweight file manager (Dockerized)
- NGINX: <br>
  Reverse proxy for HTTPS termination
- OpenSSL: <br>
  Generate self-signed TLS certificates
- PowerShell & Bash: <br>
  CLI automation and backup scripting
- .env file: <br>
  Externalize configuration and secrets
  
## Steps

🧱 Ref 1: Compose File Setup

A docker-compose.yml file was created to define FileBrowser and NGINX services. TLS certs were mounted into NGINX, host file volume was mounted into FileBrowser, and secrets were managed using an .env file.

📄 .env

    FILEBROWSER_IMAGE=filebrowser/filebrowser:s6
    NGINX_IMAGE=nginx:alpine
    FB_PORT_HTTP=8080
    FB_PORT_HTTPS=8443
    FB_ADMIN_USER=admin
    FB_ADMIN_PASS=StrongPassword123!

📦 docker-compose.yml

    services:
      filebrowser:
        image: ${FILEBROWSER_IMAGE}
        container_name: filebrowser
        volumes:
          - ./SharedFiles:/srv
          - ./filebrowser.db:/database/filebrowser.db
          - ./filebrowser.json:/config/settings.json
        environment:
          - FB_USERNAME=${FB_ADMIN_USER}
          - FB_PASSWORD=${FB_ADMIN_PASS}
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost:8080"]
          interval: 30s
          timeout: 10s
          retries: 3
        restart: unless-stopped
    
      nginx:
        image: ${NGINX_IMAGE}
        container_name: filebrowser-nginx
        ports:
          - "${FB_PORT_HTTPS}:443"
        volumes:
          - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
          - ./nginx/certs:/etc/nginx/certs:ro
        depends_on:
          - filebrowser
        restart: unless-stopped

## 🔐 Ref 2: Enabling HTTPS via Reverse Proxy

Self-signed TLS certificates were generated using OpenSSL and mounted into NGINX.

✅ TLS Certificate Generation

    mkdir -p nginx/certs
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout nginx/certs/file.local.key \
      -out nginx/certs/file.local.crt \
      -subj "/C=UK/ST=London/L=London/O=DevSec/CN=file.local"

✅ NGINX Configuration (nginx/nginx.conf)

    server {
        listen 443 ssl;
        server_name file.local;
    
        ssl_certificate /etc/nginx/certs/file.local.crt;
        ssl_certificate_key /etc/nginx/certs/file.local.key;
    
        location / {
            proxy_pass http://filebrowser:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

## 🧪 Ref 3: Running the Container

Project launched using:

    docker compose up -d

✅ Services started successfully:
- FileBrowser UI accessible via HTTPS: https://file.local:8443
- TLS terminated at NGINX proxy
- Data persisted in SharedFiles directory

📝 Note: Add 127.0.0.1 file.local to the Windows hosts file to simulate domain-based access.

## 🌐 Ref 4: Accessing FileBrowser

- Access FileBrowser at: https://file.local:8443
- Default credentials securely set via .env file (not hardcoded)
- Password changed on first login

✅ Verified UI supports:
- Upload, download, rename, and delete files
- Creating folders inside /srv
- Managing users with custom access permissions
- Role-based access control per folder

## 🧰 Ref 5: Persistent Volume Backup Script

A shell script was created to compress the shared volume into a timestamped backup file.

🗃️ scripts/backup.sh

    #!/bin/bash
    TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
    BACKUP_DIR="./backups"
    SRC_DIR="./SharedFiles"
    
    mkdir -p "$BACKUP_DIR"
    tar -czvf "$BACKUP_DIR/sharedfiles-backup-$TIMESTAMP.tar.gz" "$SRC_DIR"
    echo "✅ Backup created at $TIMESTAMP"

Can be executed manually or scheduled via Windows Task Scheduler or Linux cron.

## ♻️ Ref 6: Healthcheck & Restart Policy

Built-in Docker health check added to FileBrowser service. Ensures container self-recovers if the service becomes unhealthy.

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

## 📸 Screenshots

| Step | Description | Image |
|------|-------------|-------|
| 1 | HTTPS Jenkins login (`https://localhost:8443`) | [Login Page](screenshots/login_page.png) |
| 2 | Terminal output of `docker compose up -d` | [Compose Up](screenshots/compose_up.png) |
| 3 | Jenkins dashboard after login | [Dashboard](screenshots/dashboard.png) |
| 4 | Pipeline-from-SCM job configuration | [Pipeline Config](screenshots/SCM1.png) |
| 5 | Pipeline-from-SCM job configuration  | [Pipeline Config Continued](screenshots/SCM2.png) |
| 6 | Console log showing Build → Test → Deploy | [Console Log](screenshots/Console_log.png) |
| 7 | Blue Ocean pipeline visualization | [Blue Ocean](screenshots/blue_ocean.png) |
| 8 | `docker ps` displaying running containers | [Docker PS](screenshots/docker_ps.png) |
