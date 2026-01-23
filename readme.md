✅ todo-app-backend/README.md
# Todo Application – Backend API

This repository contains the backend API for the Todo application.

The backend is a Node.js and Express REST API that handles business logic and communicates with MongoDB for data persistence. It is containerized with Docker and deployed to a private Kubernetes cluster running on AWS.

---

## 📌 Application Responsibilities

The backend service provides:
- REST API endpoints for managing todo tasks
- Authentication and request validation
- MongoDB database connectivity
- JSON-based API responses

The backend is **not exposed directly to the internet**.

---

## 🗂️ Project Structure

```text
todo-app-backend/
├── app.yml
├── docker-compose.yml
├── Dockerfile
├── index.js
├── nodemon.json
├── package.json
├── package-lock.json
├── src/
├── README.md

🛠️ Technologies Used

Node.js

Express.js

MongoDB

Docker

Kubernetes

AWS Elastic Container Registry (ECR)

🐳 Docker

The backend is containerized using Docker.

Build the image locally
docker build -t todo-backend .

Run locally (optional)
docker run -p 8080:8080 todo-backend

☸️ Kubernetes Deployment

The backend is deployed to Kubernetes using:

Deployment

ClusterIP Service

Ingress routing

Key points:

Backend pods run in private subnets

Service type is ClusterIP

External access is handled via Ingress

Routing behavior:

/api → todo-backend service (port 8080)

📦 Container Registry (ECR)

Backend images are pushed to AWS ECR and pulled by Kubernetes using IAM roles and imagePullSecrets.

Example image:

<account-id>.dkr.ecr.<region>.amazonaws.com/primus-capstone/backend:latest

🔄 CI (Continuous Integration)

CI is implemented using GitHub Actions to:

Build Docker images

Tag images

Push images to Amazon ECR

This ensures consistent and reproducible builds.

🚫 CD Scope (Intentional)

For this capstone project:

Kubernetes deployments are applied manually

CI focuses on image build and registry push only

This avoids exposing Kubernetes credentials and keeps deployment control within the private cluster.

🔐 Security Design

No public IPs on Kubernetes nodes

Backend service is not publicly exposed

Access only through Ingress

MongoDB access restricted to internal networking

IAM roles follow least-privilege principles

👤 Author

Honorine
Primus Capstone Project
