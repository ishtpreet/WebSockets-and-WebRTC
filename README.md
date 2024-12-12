# WebSockets and WebRTC

A simple tutorial on WebSockets and WebRTC and how to use them in a web application.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1ef91b5-1487-41a3-a929-b88e091d819f/deploy-status)](https://app.netlify.com/sites/ser421/deploys)

Live Preview: [Here](https://ser421.netlify.app/)

## Pre-requisites
Before running the script, make sure you have the following installed:

- NodeJS v22.6.0
- Docker (Optional)

## Various setup Methods
- [Setup using docker](#setup-using-docker) (Recommended)
- [Setup Script](#setup-using-shell)
- [Shell Using Docker Compose](#setup-using-shell-script)


## Setup (using docker)

#### Prerequisites

Before spinning up the docker containers, make sure you have the following installed:

- Docker
- Docker Compose

1. Make sure you are in the root of the project directory. This should have the `docker-compose.yml` file.

2. Build and Run the Docker Containers
	
	```bash
	docker-compose up --build
	```

3. Accesing the applications
* The React frontend app will be accessible at http://localhost:3000.

## Setup (using shell)

1. Make the script executable
```bash
chmod +x manual-setup.sh
```
2. Run the script (you'll be asked to enter your system's logged in user's  password)
```bash
./manual-setup.sh
```
3.  Open http://localhost:3000 to view the landing page in your browser.



## Setup (using Docker Compose in a shell script)

1. Make the script executable
```bash
chmod +x setup.sh
```
2. Run the script (you'll be asked to enter your system's logged in user's  password)
```bash 
./setup.sh
```

3. Open http://localhost:3000 to view the login page in your browser.


