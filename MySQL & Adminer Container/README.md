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

