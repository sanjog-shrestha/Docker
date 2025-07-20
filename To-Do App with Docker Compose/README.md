## To-Do App with Docker Compose


## Objective

The objective of this project was to deploy a containerized full-stack application using Docker Compose, consisting of a Node.js (Express) backend and a MongoDB database. The project demonstrates multi-container orchestration, container-to-container networking, Docker volume persistence, and RESTful API exposure on a local Windows environment. This setup simulates real-world microservice design and is enhanced with production-ready features such as .env config, health checks, logging, and a reverse proxy entry point for future frontend expansion.

### Skills Learned

- Writing Docker Compose files for service orchestration
- Building custom Docker images from Dockerfiles
- Service discovery and inter-container networking
- Environment variable config via .env file
- Persistent data storage using Docker volumes
- API testing using Postman and PowerShell
- Logging, health checks, and production hardening

### Tools Used

- Docker Desktop (Windows): <br>
Container engine and management UI
- Docker CLI & Docker Compose: <br>
Build, orchestrate, and monitor services
- Node.js (Express): <br>
Backend API server
- MongoDB (Docker Image): <br>
NoSQL database for persistent task storage
- PowerShell (Invoke-RestMethod): <br>
API endpoint testing

## Steps

## 📁 Ref 1: Project Structure

    todo-app/
    ├── backend/
    │   ├── Dockerfile
    │   └── index.js
    ├── docker-compose.yml
    ├── .env
    └── README.md


## 🧱 Ref 2: Compose File Setup

    services:
      api:
        build: ./backend
        container_name: todo-api
        ports:
          - "${APP_PORT}:3000"
        environment:
          - MONGO_URL=mongodb://mongo:27017/tododb
        depends_on:
          - mongo
        networks:
          - todo-net
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost:3000/todos"]
          interval: 30s
          timeout: 10s
          retries: 3
    
      mongo:
        image: mongo:latest
        container_name: todo-mongo
        restart: always
        volumes:
          - mongo-data:/data/db
        networks:
          - todo-net
    
    networks:
      todo-net:
    
    volumes:
      mongo-data:

## 📄 Ref 3: Backend Dockerfile

    FROM node:18-alpine
    
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD ["node", "index.js"]

## 🌐 Ref 4: Environment Configuration

.env file:

    APP_PORT=3000

## 🔐 Ref 5: API Functionality
- GET /todos — Fetch all tasks
- POST /todos — Create new task (JSON body)
- Data stored in MongoDB container todo-mongo
- Accessible via: http://localhost:3000/todos

## 🧪 Ref 6: Sample API Test (PowerShell)

    Invoke-RestMethod -Uri http://localhost:3000/todos -Method GET
    Invoke-RestMethod -Uri http://localhost:3000/todos -Method POST -Body (@{task="Write docs"} | ConvertTo-Json) -ContentType "application/json"

## 🔁 Ref 7: Service Lifecycle & Restart

Containers are started via:

    docker-compose up -d

Persistent volume ensures MongoDB retains data even after:

    docker-compose down
    docker-compose up -d

## 📊 Ref 8: Logging and Debugging
- docker logs todo-api – Inspect API output
- docker logs todo-mongo – View database logs
- Logs routed to Docker console by default (can be extended to fluentd or file mounts)js + MongoDB app using Docker Compose.

## 🧑‍💻 Ref 9: Project Screenshots 

| Step | Description | Screenshot |
|------|-------------|------------|
| 1 | Running API from Compose | [View](Screenshots/compose_up.png) |
| 2 | Testing `/todos` endpoint via PowerShell | [View](Screenshots/powershell_test.png) |
| 3 | API output showing persisted entries | [View](Screenshots/api_response.png) |
| 4 | Docker containers running | [View](Screenshots/docker_ps.png) |
| 5 | MongoDB volume reuse verification | [View](Screenshots/volume_check.png) |

## ✅ Outcome
- Successfully containerized a full-stack backend with persistent storage
- Verified service-to-service communication over Docker network
- Used PowerShell to simulate realistic API testing workflows
- Adopted production-grade features:
  - Environment variables 
  - Health checks
  - Volume persistence
  - Docker logs
- Ready to integrate NGINX frontend proxy, CI/CD pipelines, or deployment to a cloud container service
