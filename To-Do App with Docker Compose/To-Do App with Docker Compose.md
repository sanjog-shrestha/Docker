## To-Do App with Docker Compose


## Objective

The objective of this project was to containerize and deploy a basic full-stack application using Docker Compose, consisting of a Node.js (Express) backend and a MongoDB database. The goal was to gain practical experience in managing multi-container applications, linking services, using persistent volumes, and working with Docker networking on a Windows 10/11 host machine. This project simulates real-world DevOps workflows where services are deployed in isolated, reproducible containers that communicate via Docker's internal network. It demonstrates the principles of Infrastructure as Code, service orchestration, and container lifecycle management using docker-compose.

### Skills Learned

- Docker Compose syntax and multi-container configuration
- Building Docker images with Dockerfiles
- Service-to-service communication via Docker networks
- Persistent volume setup for MongoDB
- Environment variable usage for container configuration
- Running REST APIs in isolated containers
- API testing using curl, Postman, or browser

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized services on a Windows machine.
- Docker CLI & Docker Compose:
Utilized to build images, spin up containers, and orchestrate multi-service applications.
- Node.js (Express):
A lightweight backend framework used to create the to-do API.
- MongoDB (Docker Image):
Acts as the data store for the to-do application.
- PowerShell (Invoke-RestMethod):
Used to test the REST API endpoints directly from the Windows host:
- Windows 11 Host:
Base platform to run Docker containers and access exposed APIs on http://localhost.

## Steps

🛠️ Ref 1: Backend App Creation

The project started by building a basic Express.js backend for managing to-do items. It connects to MongoDB, exposes two routes (/todos GET & POST), and uses Mongoose for database operations.

⚙️ Ref 2: Dockerfile and Image Build

To containerize the backend app, a custom Dockerfile was created.

📄 backend/Dockerfile:

![Image](https://github.com/user-attachments/assets/5419ab9f-4d56-4fdc-baff-fbb7114b77da)

🧩 Ref 3: Docker Compose Orchestration

docker-compose.yml was created to spin up both the backend and the mongo services.

📄 docker-compose.yml:

![image](https://github.com/user-attachments/assets/2c4b52a5-2e01-4f3b-8a70-74fe0de028df)

✅ This setup allows the backend container to connect to the mongo service via hostname mongo.

🚀 Ref 4: Running the App
To launch the full application, the following command was executed from the project root:

