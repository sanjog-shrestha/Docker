# Static Website Creation


## Objective

The objective of this project was to containerize and deploy a simple static HTML/CSS website using Docker and Nginx. The goal was to gain hands-on experience with Dockerfile creation, image building, port binding, and container networking, using a Windows 11 host system. This project provided foundational exposure to container-based application deployment, teaching critical skills in containerization, image management, and lightweight web hosting with Nginx.
By building and running a containerized website, the project aimed to simulate real-world DevOps practices, including infrastructure as code, reproducibility, and portability of web applications.

### Skills Learned

- Docker installation and setup on Windows
- Dockerfile creation and image building
- Static website creation using HTML and CSS
- Working with Nginx web server in containers
- Port mapping and container networking
- Volume management and file copying
- Localhost web hosting and testing via IP

### Tools Used

- Docker Desktop (Windows): <br>
Used to run the Docker engine on a Windows 10 host machine and manage containers locally.
- Docker CLI: <br>
Utilized to build custom Docker images and run containers with specific configurations (e.g., ports, names, volumes).
- Nginx (Docker Image): <br>
A lightweight nginx:alpine base image was used to serve the static HTML content inside the container.
- HTML/CSS: <br>
A simple static website was created using basic HTML and inline CSS. The files were copied into the container's /usr/share/nginx/html directory.
- Windows 11 Host: <br>
Served as the base platform to run Docker containers. The containerized website was accessed via http://localhost:8080.

## Steps

🖥️ Ref 1: Static Website Creation

<img width="748" height="288" alt="Image" src="https://github.com/user-attachments/assets/3b5650ab-3d97-49f4-a2bb-f0f5a27b67a5" />

The project began by creating a simple static website using HTML. This website would later be served inside an Nginx container. The file structure was kept minimal to focus on Docker and Nginx deployment.

🔐 Ref 2: Dockerfile and Image Build

To containerize the static website, the nginx:alpine base image was used for its small footprint.

📄 Dockerfile:

<img width="575" height="152" alt="Image" src="https://github.com/user-attachments/assets/174d018b-1260-435c-8899-a76fc50ce704" />

📦 Build Command:

<img width="1117" height="652" alt="Image" src="https://github.com/user-attachments/assets/aed15cbc-7739-41b1-b5ce-48a624457c4c" />

This copied the website content into the default Nginx directory /usr/share/nginx/html, creating a deployable image.

🚀 Ref 3: Container Execution

<img width="1830" height="56" alt="Image" src="https://github.com/user-attachments/assets/805585ea-3221-44a4-8f99-44d1a519a3c4" />

This started a detached container named my-static-site with port mapping from host 8080 to container 80.

📍 Accessible at:

  http://localhost:8080 (from host)

  http://192.168.1.121:8080 (from LAN)
  
📊 Ref 5: Website Results

Once the container was up, the static website became accessible via browser.

✔️ All HTML and CSS loaded correctly
✔️ The site was responsive and viewable from other devices on the LAN
✔️ Verified that the site runs entirely inside the container

<img width="1917" height="472" alt="Image" src="https://github.com/user-attachments/assets/d3be5255-3553-45a0-9912-f09a51ff9435" />
