## File Sharing Server

## Objective

The objective of this project was to deploy a lightweight file-sharing web application using FileBrowser, enabling users to browse, upload, download, and manage files from a web UI. The project emphasizes multi-container orchestration, persistent storage via Docker volumes, and secure access control. The setup simulates real-world NAS/file-server use cases and is ideal for local or remote file access in personal or small team environments.

### Skills Learned

- Writing clean and modular docker-compose.yml for service configuration
- Mounting Windows host directories into container as persistent volumes
- Exposing web interfaces with Docker port mapping
- Managing user roles & access control in containerized environments
- Interacting with Docker volumes for long-term data storage
- Testing & verifying secure file access over a browser UI

### Tools Used

- Docker Desktop (Windows):
Used to run and manage containerized via GUI & CLI
- Docker Compose:
- FileBrowser(Docker Image):
  Lightwright file-sharing & file-management container
- PowerShell:
Used to interact with Docker CLI
- Windows 11 Host:
Host system for running the project locally

## Steps
🏗️ Ref 1: Compose File Setup

A docker-compose.yml file was created to define the FileBrowser service, with a persistent volume and mapped file directory on the Windows host:

<img width="687" height="437" alt="image" src="https://github.com/user-attachments/assets/e288f9be-7f69-4cbe-bda8-483a90ee40bc" />

📁 The host directory SharedFiles was created to store files shared through FileBrowser.
⚙️ Ref 2: Running the Container

Executed the following command from the project root directory:

<img width="1457" height="512" alt="image" src="https://github.com/user-attachments/assets/9d6a72c0-45e0-4393-9955-c376ac4628a1" />

🟢 Result:
- FileBrowser service launched and was accessible at http://localhost:8080.

🌐 Ref 3: Accessing FileBrowser

The web interface was accessed at:

📍 http://localhost:8080

🔐 Default Login:
- Username: admin
- Password: randomly generated (uvdMTj-p7IFKUL1m) in this case

⚠️ The password was changed immediately after login to enhance security.
📂 Ref 4: File Operations & Access Control

✅ Successful verification included:
- Uploading, downloading, renaming, and deleting files/folders

  <img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/6f6a5aec-5385-4069-849f-b8a3c3ddc3ae" />

  <img width="1918" height="891" alt="image" src="https://github.com/user-attachments/assets/803280dd-fd62-4b42-b551-b611d7c967cd" />

- Creating new directories inside /srv

  <img width="1917" height="928" alt="image" src="https://github.com/user-attachments/assets/9f0d6ab3-5109-4982-8324-fc2e38283658" />

  <img width="1851" height="772" alt="image" src="https://github.com/user-attachments/assets/146c1167-a724-4011-b0fe-7a5c6b727690" />
    
- Role-based user management (added new users with limited access)

  <img width="713" height="793" alt="image" src="https://github.com/user-attachments/assets/975da171-7c47-4119-9274-54a70bfba25a" />


- File permissions applied per-user

  <img width="1918" height="821" alt="image" src="https://github.com/user-attachments/assets/85f3d430-c6ed-4ec7-9e00-62050c85917b" />

  <img width="1917" height="867" alt="image" src="https://github.com/user-attachments/assets/f9c89d90-d4c7-46a1-800b-176f81ec6f42" />

- The mounted volume persisted data across container restarts

  <img width="1472" height="336" alt="image" src="https://github.com/user-attachments/assets/2fa3431a-2d30-4e7b-a087-22e1bd577f0c" />

  <img width="1918" height="882" alt="image" src="https://github.com/user-attachments/assets/a9ff7ac6-7a3a-4dba-b922-ab22b57d9200" />


