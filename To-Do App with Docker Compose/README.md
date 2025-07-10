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

![Image](https://github.com/user-attachments/assets/856d8eb8-f27e-4491-bb3e-f9b207566a92)

Result:

- Node backend running at: http://localhost:3000
- MongoDB running internally at: mongo:27017

🔍 Ref 5: API Testing

📍 Accessible Endpoints:

- GET http://localhost:3000/todos — fetches all todos.
- POST http://localhost:3000/todos — creates a new todo.

Test Example
![Image](https://github.com/user-attachments/assets/fb9e6b5e-1645-495e-9ca9-88d725d820f7)

![Image](https://github.com/user-attachments/assets/8e65c3e9-e5c5-4de6-a743-0e787db33477)

📊 Ref 6: Result Verification

Once containers were running:
- API requests were successfully served from the backend
- Todos were saved and retrieved from the MongoDB container
- Data persisted via Docker volume even after stopping containers
- Verified container communication and port exposure

✅ Outcome
- Successfully containerized and deployed a multi-tier Node.js + MongoDB app using Docker Compose.
- Demonstrated inter-container communication, persistent storage, and local development best practices.
- Built a strong foundation for future full-stack Docker projects, and set the stage for frontend integration or cloud deployment.
