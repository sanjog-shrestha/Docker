## Personal Blog with Ghost CMS

## Objective

The objective of this project was to deploy a self-hosted blogging platform using Ghost CMS with a MySQL backend via Docker Compose. The goal was to simulate a real-world, multi-container environment, emphasizing data persistence through Docker volumes, service orchestration, and inter-service communication using Docker's internal DNS. This setup mirrors production-grade architectures for scalable and portable CMS deployment

### Skills Learned

- Writing Docker Compose files for multi-container applications
- Configuring Ghost CMS with a MySQL database backend
- Mapping Docker volumes for persistent content and database data
- Setting environment variables for both Ghost and MySQL services
- Ensuring inter-service connectivity using Docker service names
- Managing container lifecycle: build, up, down, restart
- Verifying persistence by testing data after container recreation

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized via GUI & CLI
- Docker Compose:
Automates container configuration, deployment, & orchestration
- Ghost (Docker Image):
Open-source headless Node.js-based blogging platform
- MySQL (Docker Image):
  Reliable relational database to store blog data
- PowerShell:
Used to interact with Docker CLI from the host system
- Windows 11 Host:
Local system running Docker & storing volume-mapped blog content

## Steps
🏗️ Ref 1: Compose File Setup

A docker-compose.yml file was created to define and run the Ghost CMS service, configured for volume persistence and external access.

![image](https://github.com/user-attachments/assets/c81b998b-edc2-4a83-88f7-d25873e97300)


📁 The ./content directory on the Windows host was mapped to /var/lib/ghost/content inside the container to persist blog posts, images, themes, and settings.
⚙️ Ref 2: Running the Container

To launch the Ghost blog locally, the following command was executed from the project root:

![image](https://github.com/user-attachments/assets/7230f4b8-5fd2-4be1-b6c8-1e664885f4a2)

This pulled the Ghost image, created the necessary volume, and started the container.

🟢 Result:
- MySQL started on Docker internal port 3306
- Ghost CMS became accessible at:
📍 http://localhost:2368
