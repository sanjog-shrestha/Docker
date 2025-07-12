## NGINX Reverse Proxy Locally with Self-Signed SSL

## Objective

The objective of this project was to set up a local reverse proxy using NGINX with HTTPS in a fully containerized environment, without relying on public domains or internet-exposed ports. The project simulates production-style reverse proxying of multiple web applications using path-based routing and a self-signed SSL certificate. This mirrors key DevOps and networking concepts while remaining suitable for a local development environment on Windows 11 with Docker Desktop.

### Skills Learned

- Writing modular docker-compose.yml files to run multi-container CI systems
- Configuring Docker-in-Docker for pipeline container builds
- Mounting Docker socket for container interaction inside Jenkins
- Creating pipeline jobs with Groovy Jenkinsfile syntax
- Securing and initializing Jenkins via CLI and UI
- Using Jenkins to automate builds inside a containerized setup

### Tools Used

- Docker Desktop (Windows 11): 
Primary environment for running and testing containers
- Docker Compose: 
Defined a multi-service stack with NGINX and backend apps
- NGINX (official image): 
Used as a TLS-terminating reverse proxy
- OpenSSL: 
Used to generate self-signed certificates
- httpd & nginx containers: 
Dummy web apps for proxy testing
- PowerShell: 
CLI for Docker commands and OpenSSL operations

## Steps

## 📁 Ref 1: Project Structure

    nginx-local-reverse-proxy/
    ├── docker-compose.yml
    ├── nginx/
    │   ├── nginx.conf
    │   └── certs/
    │       ├── localhost.crt
    │       └── localhost.key

The certs/ directory stores self-signed certificates for local HTTPS testing.
nginx.conf contains the full reverse proxy and SSL configuration.

## 🧱 Ref 2: Compose File Setup

    services:
      nginx:
        image: nginx:latest
        container_name: nginx
        ports:
          - "8080:80"
          - "8443:443"
        volumes:
          - ./nginx/nginx.conf:/etc/nginx/nginx.conf
          - ./nginx/certs:/etc/nginx/certs
        depends_on:
          - app1
          - app2
    
      app1:
        image: httpd:alpine
        container_name: app1
        restart: always
    
      app2:
        image: nginx:alpine
        container_name: app2
        restart: always

## 🔐 Ref 3: Self-Signed SSL Certificate

Generated via PowerShell (or WSL) using:

    openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost.key -out localhost.crt -days 365 -subj "/CN=localhost"

- Output stored in: ./nginx/certs/
- Used in the NGINX TLS server block to enable HTTPS on https://localhost:8443

## ⚙️ Ref 4: NGINX Configuration

    events {}
    
    http {
      server {
        listen 80;
        location /app1/ {
          proxy_pass http://app1/;
        }
        location /app2/ {
          proxy_pass http://app2/;
        }
      }
    
      server {
        listen 443 ssl;
        ssl_certificate /etc/nginx/certs/localhost.crt;
        ssl_certificate_key /etc/nginx/certs/localhost.key;
    
        location /app1/ {
          proxy_pass http://app1/;
        }
    
        location /app2/ {
          proxy_pass http://app2/;
        }
      }
    }

Path-based routing:
- /app1/ → forwards to httpd
- /app2/ → forwards to nginx

## 🚀 Ref 5: Running the Environment

Launched using:

    docker-compose up -d

✅ Services started:
- NGINX Proxy available at:
  - HTTP: http://localhost:8080/app1/
  - HTTPS: https://localhost:8443/app1/ (self-signed warning is expected)
    
✅ Backend containers available internally to NGINX:
- app1 → HTTPD container
- app2 → NGINX container

## 🔁 Ref 6: Persistent Configuration & Restarts

Configuration, certificates, and NGINX behavior persisted in the local file system. Restarted easily:

    docker-compose down
    docker-compose up -d

No data or config loss across restarts.

## 🔬 Ref 7: Proxy Verification & SSL Testing

Tested:
- NGINX path-based proxy functionality with both apps
- SSL handshake with self-signed cert via browser (after accepting the warning)
- Full local TLS termination without the need for public domain or DNS
Browser output for https://localhost:8443/app1/ showed Apache welcome page.

## 🧑‍💻 Ref 8: Project Screenshots (Placeholder)
<img width="900" src="https://dummyimage.com/900x400/333/fff.png&text=NGINX+Proxy+Path+Routing+Demo" /> <img width="900" src="https://dummyimage.com/900x400/555/fff.png&text=HTTPS+SSL+Certificate+Warning+(Expected)" /> <img width="900" src="https://dummyimage.com/900x400/111/fff.png&text=Reverse+Proxy+Architecture+Diagram" />
✅ Outcome

    Fully working reverse proxy setup with HTTPS using only local resources

    Simulated realistic DevOps networking configuration for microservice routing

    Configurable and extensible for:

        Path- or domain-based routing

        External certs (Let's Encrypt, etc.)

        Adding authentication or caching

