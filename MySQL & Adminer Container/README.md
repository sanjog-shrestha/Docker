## MySQL & Adminer Container

## Objective

The objective of this project was to deploy a MySQL database alongside a lightweight web-based database management UI (Adminer) using Docker Compose. The goal was to understand multi-container orchestration, Docker volumes for persistent storage, and container-to-container networking. This project simulates a common real-world setup used for local database development or testing, emphasizing Infrastructure as Code, environment configuration, and service discovery using Docker's internal DNS.

This version of the project also focuses on improving security and network isolation, by enabling SSL/TLS encryption for MySQL and restricting external access using Docker’s custom bridge networks and service exposure control.

### Skills Learned

- Writing Docker Compose files for multi-service apps
- Exposing and mapping ports from container to host
- Configuring MySQL databases with environment variables 
- Using Docker named volumes for persistent DB data
- Inter-service communication using Docker network names
- Testing DB connection using a browser-based Adminer interface
- Enabling SSL/TLS for secure MySQL connections
- Implementing container-level network isolation and exposure control

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized via GUI & CLI
- Docker Compose:
Automates multi-container setup & teardown
- MySQL (Docker Image):
Relational database container with SSL enabled
- Adminer:
Lightweight database management UI container
- OpenSSL:
Used to generate self-signed TLS certificates for MySQL
- PowerShell:
Used to interact with Docker CLI
- Windows 11 Host:
Host system for running the project locally

## 🏗️ Ref 1: Compose File Setup

A docker-compose.yml file was created with the following features:
- Two services: db (MySQL) and adminer
- Custom Docker bridge network: backend
- TLS certificates mounted into MySQL container
- Port mapped only for Adminer (8080); MySQL is isolated

      services:
        db:
          image: mysql:8.0
          container_name: mysql_secure
          restart: always
          environment:
            MYSQL_ROOT_PASSWORD: rootpass
            MYSQL_DATABASE: sampledb
            MYSQL_USER: user123
            MYSQL_PASSWORD: pass123
          volumes:
            - mysql_data:/var/lib/mysql
            - ./certs:/etc/mysql/certs
          command: >
            --ssl-ca=/etc/mysql/certs/ca.pem
            --ssl-cert=/etc/mysql/certs/server-cert.pem
            --ssl-key=/etc/mysql/certs/server-key.pem
          networks:
            - backend
          expose:
            - "3306"
      
        adminer:
          image: adminer
          container_name: adminer_ui
          restart: always
          ports:
            - "8080:8080"
          networks:
            - backend
      
      volumes:
        mysql_data:
      
      networks:
        backend:
          driver: bridge

## 🔐 Ref 2: Generating MySQL SSL Certificates

Self-signed TLS certificates were generated using openssl:

    mkdir certs
    cd certs

    # Generate private key and save in correct PEM format
    openssl genpkey -algorithm RSA -out ca-key.pem
    
    # Generate a self-signed certificate using the private key
    openssl req -new -x509 -key ca-key.pem -out ca.pem -days 365 -subj "/CN=MySQL_CA"
    
    # Generate server cert
    openssl req -newkey rsa:2048 -nodes -keyout server-key.pem \
      -out server-req.pem -subj "/CN=mysql"
    openssl x509 -req -in server-req.pem -days 365 \
      -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem
      
## ⚙️ Ref 3: Running the Containers
From the project root:

    docker compose up -d

✅ Services launched:
- MySQL running with TLS-only connections (require_secure_transport=ON)
- Adminer accessible on host at http://localhost:8080
- MySQL not exposed publicly (expose used instead of ports)


## 🌐 Ref 4: Accessing Adminer

Open:
📍 http://localhost:8080

Use these credentials to log in:
- System: MySQL
- Server: db
- Username: user123
- Password: pass123
- Database: sampledb

✅ The internal Docker DNS (db) resolved successfully from Adminer.

## 📊 Ref 5: Result Verification
- Adminer successfully connected to MySQL using internal service name
- Data was created and verified using Adminer’s UI
- Full CRUD operations performed
- Volume persistence confirmed: data was not lost after docker compose down && up
- MySQL only accepted secure SSL connections

## ✅ Outcome
- Deployed and configured a secure multi-container database stack using Docker Compose
- TLS encryption enforced for all MySQL connections using self-signed certificates
- MySQL service was isolated from external networks using Docker’s internal bridge
- Adminer was securely connected over internal DNS and handled full database operations
- The architecture is now ready for integration with app containers (Node.js, Flask, etc.)
- Infrastructure is secure, reproducible, and portable — aligned with modern DevOps practices

## 📸 Screenshots
- docker-compose.yml file showing TLS and networks

  <img width="712" height="840" alt="image" src="https://github.com/user-attachments/assets/b1c80d67-df98-425b-bc33-c42128f8be98" />
  
- OpenSSL certificate generation output

  <img width="1872" height="202" alt="image" src="https://github.com/user-attachments/assets/af88ffa2-9145-4844-a02a-f66b7ea78277" />
  <img width="1897" height="325" alt="image" src="https://github.com/user-attachments/assets/2af3f1b2-2899-42e5-bd5b-0d1d2817bf48" />

- PowerShell terminal: docker compose up -d

  <img width="1450" height="513" alt="image" src="https://github.com/user-attachments/assets/5a85cc6e-d83b-4a3a-b79f-763b38d19d46" />

- docker ps showing both containers running

  <img width="1792" height="152" alt="image" src="https://github.com/user-attachments/assets/eb901c57-4034-45f5-932c-a22c6a2c8b56" />

- Adminer login screen

  <img width="742" height="628" alt="image" src="https://github.com/user-attachments/assets/e1636129-80e2-4b84-96ca-fe1f629b0b30" />

- Adminer dashboard connected to sampledb

  <img width="992" height="767" alt="image" src="https://github.com/user-attachments/assets/5bbf88a4-5b90-4933-a2a5-aef25dbee19e" />

- Table creation and data input

  <img width="960" height="1000" alt="image" src="https://github.com/user-attachments/assets/3ec9841e-9f2d-4d76-9d50-e281766bfc1d" />

- Re-launching containers and verifying data persisted

  <img width="1913" height="375" alt="image" src="https://github.com/user-attachments/assets/217c74ce-baa2-4600-84d4-7946c8b17697" />
  <img width="910" height="931" alt="image" src="https://github.com/user-attachments/assets/3e9360ac-d1c5-4527-bfe1-75f7a4437951" />

- Adminer TLS-backed connection (MySQL enforcing SSL)

  <img width="637" height="177" alt="image" src="https://github.com/user-attachments/assets/615f2196-34cb-4b9e-be66-67376465c652" />
