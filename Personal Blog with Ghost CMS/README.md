## Personal Blog with Ghost CMS

## Objective

The objective of this project was to deploy a self-hosted blogging platform using Ghost CMS within a Docker container, focusing on simplicity, persistence, and real-world container orchestration. This project demonstrates how to launch a containerized content management system with permanent data storage using Docker volumes, and how to manage application lifecycle using Docker Compose. The setup mimics a production environment where CMS platforms are containerized for scalability and portability.

### Skills Learned

- Writing Docker Compose files for single-service applications
- Volume mapping for persistent content storage
- Exposing web application ports to the host
- Using Ghost environment variables to congiure a CMS
- Docker container lifecycle management (start, stop, rebuild)
- Testing persistence & backup through Docker volumes

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized via GUI & CLI
- Docker Compose:
Automates container configuration, deployment, & orchestration
- Ghost (Docker Image):
Open-source headless Node.js-based blogging platform
- PowerShell:
Used to interact with Docker CLI from the host system
- Windows 11 Host:
Local system running Docker & storing volume-mapped blog content

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
  <img width="1572" height="348" alt="Image" src="https://github.com/user-attachments/assets/000fae2b-422f-4b61-865f-1f76cf27376d" />
  
  <img width="1408" height="541" alt="Image" src="https://github.com/user-attachments/assets/e47a9dca-6b80-40be-ae50-f72214b83d1c" />

  <img width="1061" height="623" alt="Image" src="https://github.com/user-attachments/assets/4940c0e9-20ad-4c98-9dda-1d3719454065" />
  
- Data persisted across docker-compose down and up (volume verification)

  ![image](https://github.com/user-attachments/assets/df1d85d6-a44a-4538-8b97-d13b3c0dde8b)

- Adminer allowed full CRUD operations on the sampledb

✅ Outcome
- Deployed and configured a basic database stack using Docker Compose.
- Demonstrated inter-container networking, volume persistence, and service orchestration.
- Set the stage for future back-end or data-driven projects that rely on relational databases.
- Built a foundation for integrating MySQL with other containerized services (Node.js, PHP, etc.).



