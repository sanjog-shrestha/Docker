## MySQL & Adminer Container

## Objective

The objective of this project was to deploy a MySQL database alongside a lightweight web-based database management UI (Adminer) using Docker Compose. The goal was to understand multi-container orchestration, Docker volumes for persistent storage, and container-to-container networking. This project simulates a common real-world setup used for local database development or testing, emphasizing Infrastructure as Code, environment configuration, and service discovery using Docker's internal DNS.

### Skills Learned

- Writing Docker Compose files for multi-service apps
- Exposing and mapping ports from container to host
- Configuring MySQL databases with environment variables
- Using Docker named volumes for persistent DB data
- Inter-service communication using Docker network names
- Testing DB connection using a browser-based Adminer interface

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized via GUI & CLI
- Docker CDocker Compose:
Automates multi-container setup & teardown
- MySQL (Docker Image):
Relational database container
- Adminer:
Lightweight database management UI container
- PowerShell:
Used to interact with Docker CLI
- Windows 11 Host:
Host system for running the project locally

## Steps
🏗️ Ref 1: Compose File Setup

A docker-compose.yml file was created to define both the MySQL and Adminer services in a single configuration.

<img width="1557" height="811" alt="Image" src="https://github.com/user-attachments/assets/e2d7dd24-c9a6-4be8-bc4e-c3cbcca002ac" />

⚙️ Ref 2: Running the Containers

The following command was executed from the project root to launch both containers:

<img width="1900" height="680" alt="Image" src="https://github.com/user-attachments/assets/ecbdda89-1c0e-4842-80b2-6c8a0ea932c9" />

🟢 Result:
- MySQL service starts at internal port 3306
- Adminer UI available at http://localhost:8080

🌐 Ref 3: Accessing Adminer

With Adminer running, it was accessed via browser:

📍 http://localhost:8080

Login Configuration:
- System: MySQL
- Server: db (Docker service name, resolved internally)
- Username: user123
- Password: pass123
- Database: sampledb

📊 Ref 4: Result Verification

✅ Successful verification included:
- Adminer connected to the MySQL container via service name db

  <img width="963" height="490" alt="Image" src="https://github.com/user-attachments/assets/1d4b3b75-d86d-4747-9622-ff37ab61e0dd" />

  <img width="1915" height="758" alt="Image" src="https://github.com/user-attachments/assets/df4ce70a-6438-44bd-b40f-aa2268cf415d" />

- Test tables and entries were created through Adminer UI
  <img width="1913" height="716" alt="Image" src="https://github.com/user-attachments/assets/fb989539-37a0-454d-b755-77c9ac49af68" />
  
- Data persisted across docker-compose down and up (volume verification)
- Adminer allowed full CRUD operations on the sampledb

✅ Outcome
- Deployed and configured a basic database stack using Docker Compose.
- Demonstrated inter-container networking, volume persistence, and service orchestration.
- Set the stage for future back-end or data-driven projects that rely on relational databases.
- Built a foundation for integrating MySQL with other containerized services (Node.js, PHP, etc.).


