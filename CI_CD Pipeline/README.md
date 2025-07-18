## CI/CD Pipeline in Docker

## Objective

The objective of this project was to deploy a lightweight, fully containerized CI/CD system using Jenkins on Docker Compose. The setup demonstrates how to orchestrate Jenkins and Docker-in-Docker (DinD) services to automate build, test, and deploy pipelines. This mimics a professional DevOps workflow, making it ideal for learning and showcasing modern software delivery techniques on a local Windows environment.

### Skills Learned

- Writing modular docker-compose.yml files to run multi-container CI systems
- Configuring Docker-in-Docker for pipeline container builds
- Mounting Docker socket for container interaction inside Jenkins
- Creating pipeline jobs with Groovy Jenkinsfile syntax
- Securing and initializing Jenkins via CLI and UI
- Using Jenkins to automate builds inside a containerized setup

### Tools Used

- Docker Desktop (Windows):
  Run and manage containerized services with CLI & GUI
- Docker Compose:
  Defined multi-container environments for Jenkins and DinD
- Jenkins (Docker image):
  Core CI/CD server
- docker:dind (Docker-in-Docker):
  Used to allow Jenkins to build Docker images from within containers
- PowerShell:
  Used to execute Docker CLI commands
- Windows 11 Host:
  Used as the host OS for the project execution

## Steps

## 🧱 Ref 1: Compose File Setup

A docker-compose.yml file was created to define the Jenkins and DinD services, with volume persistence and Docker socket mounting for container operations.

    services:
      dind:
        image: docker:dind
        container_name: dind
        privileged: true
        networks:
          - jenkins
  
    jenkins:
      image: jenkins/jenkins:lts
      container_name: jenkins
      user: root
      ports:
        - "8080:8080"
        - "50000:50000"
      volumes:
        - jenkins_home:/var/jenkins_home
        - /var/run/docker.sock:/var/run/docker.sock
      networks:
        - jenkins
      depends_on:
        - dind

    volumes:
      jenkins_home:
    
    networks:
      jenkins:

📁 The jenkins_home volume was used to persist Jenkins jobs, plugins, and settings across container restarts.

## ⚙️ Ref 2: Running the Container

The project was launched using:

    docker-compose up -d

✅ Services started successfully:
- Jenkins accessible at: http://localhost:8080
- Docker-in-Docker running for container builds

## 🌐 Ref 3: Accessing Jenkins

Web interface accessed via:
📍 http://localhost:8080

🔐 Jenkins default setup:

    docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

🛡️ Password was changed after login and Suggested Plugins were installed.

## 🔁 Ref 4: Creating Pipeline & Build Job

A Pipeline job was created with the following Jenkinsfile:

    pipeline {
      agent any
  
      stages {
          stage('Build') {
              steps {
                  sh 'echo Building Docker container...'
                  sh 'docker --version'
              }
          }
          stage('Test') {
              steps {
                  sh 'echo Running tests...'
              }
          }
          stage('Deploy') {
              steps {
                  sh 'echo Deploying application...'
              }
          }
      }
    }

⚙️ CLI tools were installed inside the Jenkins container:

    docker exec -u root -it jenkins bash
    apt update
    apt install -y docker.io
    exit

## 🔐 Ref 5: Jenkins Authentication & Secrets
- Default admin password retrieved securely
- Manual password change enforced after first login
- No exposed credentials in compose or Dockerfiles

## 📦 Ref 6: Persistent Volumes & Restarts
- jenkins_home volume ensured data persisted even after restarts:
-     docker-compose down
      docker-compose up -d

- No loss of jobs, plugins, or configuration across sessions.

## 🧪 Ref 7: CI/CD Pipeline Execution Output

✅ Sample pipeline output:

-  Build: Validated Docker CLI
-  Test: Simulated unit tests
-  Deploy: Dummy deploy command
-  Verified through Jenkins Blue Ocean UI and console logs

## 🧑‍💻 Ref 8: Project Screenshots (Placeholder)

  <img width="1918" height="428" alt="image" src="https://github.com/user-attachments/assets/4965d4c1-e453-49e8-a2fb-365bfc0d7a1f" />

  <img width="1891" height="853" alt="image" src="https://github.com/user-attachments/assets/aa124f3e-6fd5-4ecb-b638-3b5bb24e4593" />

  <img width="1675" height="617" alt="image" src="https://github.com/user-attachments/assets/1bc847dd-2d36-49f9-b498-52d4ee44a527" />

  <img width="1917" height="651" alt="image" src="https://github.com/user-attachments/assets/61569bad-769f-45ac-a883-0b9b1d66e036" />

  <img width="932" height="618" alt="image" src="https://github.com/user-attachments/assets/41613db6-8105-4288-a91d-35a3be109c0e" />

✅ Outcome

- Fully working, self-contained Jenkins CI/CD pipeline using Docker Compose on Windows
- Data persisted using volumes
- Realistic environment simulating enterprise DevOps workflows
- Reusable base setup for future CI/CD projects
