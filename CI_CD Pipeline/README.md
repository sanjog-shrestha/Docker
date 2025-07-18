## CI/CD Pipeline in Docker

## Objective

The objective of this project was to deploy a lightweight, fully containerized CI/CD system using Jenkins on Docker Compose. This enhanced setup introduces HTTPS with a self-signed certificate using an NGINX reverse proxy, externalized environment variables via a .env file, and pipeline-as-code through a Jenkinsfile sourced from SCM. These upgrades replicate modern production CI/CD pipelines and promote security, modularity, and maintainability on a local Windows environment.

## Skills Learned
- Writing modular docker-compose.yml files for multi-container CI systems
- Configuring Docker-in-Docker (DinD) for building Docker images within pipelines
- Using NGINX as a reverse proxy to enable HTTPS for Jenkins UI
- Mounting Docker socket for Jenkins container access to the host Docker daemon
- Creating Groovy-based pipeline-as-code using Jenkinsfile
- Securing Jenkins with TLS, CLI secrets, and controlled admin initialization
- Persisting Jenkins data using Docker named volumes
- Integrating SCM-based pipelines for GitOps-style automation

## Tools Used
- Docker Desktop (Windows):
  Run and manage containerized services with CLI & GUI
- Docker Compose:
  Defined multi-container environments for Jenkins, DinD, and NGINX
- Jenkins (Docker image):
  Core CI/CD server
- docker:dind (Docker-in-Docker):
  Allows Jenkins to build Docker images from within containers
- NGINX:
  Reverse proxy to enable HTTPS (SSL/TLS)
- OpenSSL:
  For generating self-signed certificates
- PowerShell:
  Used to execute Docker CLI commands
- Windows 11 Host:
  Host system for executing the entire CI/CD stack locally

## 🧱 Ref 1: Compose File Setup

A docker-compose.yml file was created to define the Jenkins, Docker-in-Docker (DinD), and NGINX services. TLS certificates were mounted into NGINX, and Docker socket was shared with Jenkins. Environment variables were abstracted into a .env file.

📄 .env

    JENKINS_IMAGE=jenkins-docker
    NGINX_IMAGE=nginx:alpine
    JENKINS_PORT_HTTP=8080
    JENKINS_PORT_HTTPS=8443
    JENKINS_AGENT_PORT=50000
    JENKINS_VOLUME=jenkins_home

📦 docker-compose.yml

    services:
      dind:
        image: docker:dind
        container_name: dind
        privileged: true
        networks:
          - jenkins
        environment:
          DOCKER_TLS_CERTDIR: ""
      
      jenkins:
        image: ${JENKINS_IMAGE}
        container_name: jenkins
        user: root
        ports:
          - "${JENKINS_PORT_HTTP}:8080"
          - "${JENKINS_AGENT_PORT}:50000"
        volumes:
          - ${JENKINS_VOLUME}:/var/jenkins_home
          - /var/run/docker.sock:/var/run/docker.sock
        depends_on:
          - dind
        networks:
          - jenkins
    
      nginx:
        image: ${NGINX_IMAGE}
        container_name: jenkins-nginx
        ports:
          - "${JENKINS_PORT_HTTPS}:443"
        volumes:
          - ./nginx.conf:/etc/nginx/nginx.conf:ro
          - ./certs:/etc/nginx/certs:ro
        depends_on:
          - jenkins
        networks:
          - jenkins
    
    
    volumes:
      jenkins_home:
    
    networks:
      jenkins:

## ⚙️ Ref 2: Running the Container
Project launched using:

    docker compose up -d

✅ Services started successfully:
- Jenkins UI served via: https://localhost:8443
- Docker-in-Docker available for container builds
- Jenkins data persisted in jenkins_home volume

## 🌐 Ref 3: Accessing Jenkins

Web interface accessed via HTTPS:
📍 https://localhost:8443

🔐 Retrieve the default admin password:

    docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

🔐 After login, password was changed and suggested plugins were installed.

## 🔁 Ref 4: Creating Pipeline from SCM

Instead of pasting a Jenkinsfile manually, the pipeline was configured using Pipeline from SCM with Git.
A sample Jenkinsfile was committed to a GitHub repo and linked through the Jenkins job UI.
Sample Jenkinsfile
    
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

✅ Jenkins automatically fetched the Jenkinsfile and executed pipeline stages from the repo.

## 🔐 Ref 5: Jenkins Authentication & Secrets
- Default admin password was retrieved securely via CLI
- Manual password reset enforced after first login
- No credentials or tokens hardcoded in Dockerfiles or Compose files
- HTTPS secured using self-signed certificate via NGINX proxy

## 📦 Ref 6: Persistent Volumes & Restarts

The jenkins_home volume ensures full data persistence:

    docker compose down
    docker compose up -d

✅ No loss of jobs, credentials, plugins, or build history across restarts.

## 🧪 Ref 7: CI/CD Pipeline Execution Output

✅ Verified Output:
- Build: Docker CLI checked inside Jenkins container
- Test: Simulated test logs
- Deploy: Echo deployment command
- Output available in Jenkins console log and Blue Ocean UI
