# Dockerized Application Deployment on AWS EC2

## Project Overview

This project demonstrates how to deploy a containerized web application on an AWS EC2 instance using Docker. The goal of this project is to show how containerization can simplify application deployment and ensure consistency across environments.

The application is packaged inside a Docker container and deployed on a Linux based cloud server. Nginx is used as a reverse proxy to route incoming requests to the application container.

This setup ensures that the application runs reliably and can be easily deployed on any system that supports Docker.

---

## Technologies Used

AWS EC2
Amazon Linux
Docker
Node.js
Nginx
Docker Networking

---

## Project Architecture

User sends request through browser
Request reaches EC2 Public IP
Nginx receives the request on port 80
Nginx forwards the request to the Node.js application container
Node.js application processes the request and sends the response back to the user

---

## Folder Structure

docker-ec2-deployment

app
server.js
package.json

nginx
default.conf

Dockerfile
docker-compose.yml
README.md

---

## Application Code

server.js

The Node.js application is a simple Express server that responds with a message when the root URL is accessed.

const express = require('express')

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
res.send('Dockerized Application Successfully Deployed on AWS EC2')
})

app.listen(PORT, () => {
console.log(Server running on port 3000)
})

---

package.json

{
"name": "docker-ec2-app",
"version": "1.0.0",
"description": "Dockerized application deployed on AWS EC2",
"main": "server.js",
"dependencies": {
"express": "^4.18.2"
}
}

---

## Dockerfile

The Dockerfile defines the instructions to build the Docker image for the Node.js application.

FROM node:18

WORKDIR /app

COPY app/package.json .

RUN npm install

COPY app .

EXPOSE 3000

CMD ["node", "server.js"]

---

## Nginx Configuration

default.conf

Nginx is configured to forward incoming requests to the Node.js container.

server {

listen 80

location / {

proxy_pass http://node_app:3000

proxy_http_version 1.1

proxy_set_header Upgrade $http_upgrade

proxy_set_header Connection 'upgrade'

proxy_set_header Host $host

proxy_cache_bypass $http_upgrade

}

}

---

## AWS EC2 Setup

Step 1
Log in to the AWS Management Console.

Step 2
Navigate to the EC2 Dashboard and launch a new instance.

Step 3
Choose Amazon Linux as the operating system.

Step 4
Select instance type t2.micro.

Step 5
Create or select an existing key pair for SSH access.

Step 6
Configure security group rules.

Allow the following ports

SSH port 22
HTTP port 80
Custom TCP port 3000

---

## Connecting to the EC2 Instance

Use the following command from your terminal.

ssh -i yourkey.pem ec2-user@EC2_PUBLIC_IP

---

## Installing Docker on EC2

Update system packages

sudo yum update -y

Install Docker

sudo yum install docker -y

Start Docker service

sudo systemctl start docker

Enable Docker to start on boot

sudo systemctl enable docker

Add ec2-user to Docker group

sudo usermod -aG docker ec2-user

Reconnect to the instance after running the above command.

---

## Building the Docker Image

Navigate to the project directory

cd docker-ec2-deployment

Build the Docker image

docker build -t node_app .

---

## Creating Docker Network

Create a network for communication between containers.

docker network create app-network

---

## Running the Application Container

docker run -d --name node_app --network app-network -p 3000:3000 node_app

---

## Running the Nginx Container

docker run -d --name nginx_server --network app-network -p 80:80 -v ~/docker-ec2-deployment/nginx/default.conf:/etc/nginx/conf.d/default.conf nginx

---

## Verifying Running Containers

docker ps

This command will show the list of active containers.

---

## Accessing the Application

Open your browser and enter the EC2 public IP address.

http://EC2_PUBLIC_IP

The browser will display the message confirming that the application is successfully deployed.

Dockerized Application Successfully Deployed on AWS EC2

---

## Advantages of Using Docker

Docker provides portability across environments.
Applications run consistently on different systems.
Deployment becomes faster and easier.
Containers isolate applications and their dependencies.

---

## Conclusion

This project demonstrates how containerization can be used to deploy applications efficiently on cloud infrastructure. By using Docker and AWS EC2, applications can be deployed quickly and managed easily.

The use of Nginx as a reverse proxy improves request handling and provides better scalability. This approach represents a modern DevOps deployment method used widely in industry.

