# Static Website Creation


## Objective

The objective of this project was to containerize and deploy a simple static HTML/CSS website using Docker and Nginx. The goal was to gain hands-on experience with Dockerfile creation, image building, port binding, and container networking, using a Windows 11 host system. This project provided foundational exposure to container-based application deployment, teaching critical skills in containerization, image management, and lightweight web hosting with Nginx.
By building and running a containerized website, the project aimed to simulate real-world DevOps practices, including infrastructure as code, reproducibility, and portability of web applications.

### Skills Learned

- Docker installation and setup on Windows
- Dockerfile creation and image building
- Static website creation using HTML and CSS
- Working with Nginx web server in containers
- Port mapping and container networking
- Volume management and file copying
- Localhost web hosting and testing via IP
- HTTPS with TLS using self-signed certificates
- Nginx SSL redirection and configuration

### Tools Used

- Docker Desktop (Windows):
Used to run the Docker engine on a Windows 10 host machine and manage containers locally.
- Docker CLI:
Utilized to build custom Docker images and run containers with specific configurations (e.g., ports, names, volumes).
- Nginx (Docker Image):
A lightweight nginx:alpine base image was used to serve the static HTML content inside the container.
- OpenSSL:
Used to generate self-signed TLS certificates for HTTPS testing locally.
- HTML/CSS:
A simple static website was created using basic HTML and inline CSS. The files were copied into the container's /usr/share/nginx/html directory.
- Windows 11 Host:
Served as the base platform to run Docker containers. The containerized website was accessed via http://localhost:8080 and https://localhost:8443.

## Steps

## 🖥️ Ref 1: Static Website Creation

Purpose: This step involved creating the actual HTML and CSS files for the static site that would be served. It focused on content, design, and directory setup.

    <!-- html/index.html -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Static Site</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; }
        h1 { color: #0077cc; }
      </style>
    </head>
    <body>
      <h1>Hello from Dockerized NGINX with HTTPS!</h1>
    </body>
    </html>

## 🔐 Ref 2: Dockerfile and Image Build

Purpose: This step explains how the Nginx container was configured to serve the static site by writing a Dockerfile. It also shows how the image was built with embedded content and TLS.

    # Dockerfile
    FROM nginx:alpine
    
    COPY html /usr/share/nginx/html
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    COPY certs/selfsigned.crt /etc/nginx/certs/selfsigned.crt
    COPY certs/selfsigned.key /etc/nginx/certs/selfsigned.key

    # Build the image
    docker build -t my-static-site-https .

## 🔐 Ref 3: Generate Self-Signed TLS Certificate

Purpose: Demonstrates how to create a local TLS certificate for HTTPS support using OpenSSL. This mimics a production SSL cert while remaining local-dev safe.

    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout certs/selfsigned.key \
    -out certs/selfsigned.crt \
    -subj "/CN=localhost"
      
## ⚙️ Ref 4: Custom NGINX Configuration

Purpose: Shows the manual config needed to make Nginx serve both HTTP and HTTPS traffic, redirect HTTP to HTTPS, and load the SSL certificate files.

    # nginx.conf
    server {
        listen 80;
        server_name localhost;
        return 301 https://$host$request_uri;
    }
    
    server {
        listen 443 ssl;
        server_name localhost;
    
        ssl_certificate /etc/nginx/certs/selfsigned.crt;
        ssl_certificate_key /etc/nginx/certs/selfsigned.key;
    
        location / {
            root /usr/share/nginx/html;
            index index.html;
        }
    }
    
## 🚀 Ref 5: Container Execution

Purpose: This is the final command to launch the container. It maps HTTP (8080) and HTTPS (8443) ports from the host to the container and starts it in the background.

    docker run -d \
      --name my-static-site-https \
      -p 8080:80 \
      -p 8443:443 \
      my-static-site-https

📍 Accessible At

Purpose: Where and how the container can be accessed once it's up and running.

- http://localhost:8080 (redirects to HTTPS)
- https://localhost:8443 (secured site)

## 📊 Ref 6: Website Results

Purpose: Summary of observable behaviors to confirm everything works.
- ✅ All HTML and CSS loaded correctly
- ✅ HTTP requests redirected to HTTPS
- ✅ TLS padlock warning shown (expected with self-signed cert)
- ✅ Container runs independently and serves content securely

## Screenshots
- Docker build Output
  
  <img width="1451" height="627" alt="image" src="https://github.com/user-attachments/assets/1ca1874c-06de-4ede-a9d6-6ab64cbe6952" />

- Running Container (docker ps)

  <img width="1881" height="140" alt="image" src="https://github.com/user-attachments/assets/fdce1a0d-a38b-494d-a202-c40e7f6394d7" />

- OpenSSL Certificate Generation

  <img width="1890" height="252" alt="image" src="https://github.com/user-attachments/assets/a5769b32-65ca-4152-b10b-6bac3b9a62a9" />

- nginx.conf File Preview

  <img width="663" height="485" alt="image" src="https://github.com/user-attachments/assets/8b1e56b5-57e1-44c4-a459-ae1979ead03e" />

- Website loaded in browser via HTTPS

  <img width="1913" height="557" alt="image" src="https://github.com/user-attachments/assets/77d0b5b0-c36e-4e7f-9b57-286ee4d333f6" />

- Browser Security Warning (Self-Signed Certificate)
  
  <img width="1437" height="875" alt="image" src="https://github.com/user-attachments/assets/a2184737-f623-4fdb-95c6-1a2d2e368f2b" />

