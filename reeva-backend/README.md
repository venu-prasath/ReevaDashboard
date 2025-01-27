# Project Management Dashboard API with Django

This repository contains the API server for a project management dashboard built with Django. The server provides endpoints to manage users, projects, and tasks. The application is containerized with Docker and uses PostgreSQL as the database.

---

## Features

- **User Management**: Create and manage users with attributes like `name`, `email`, and `id`.
- **Project Management**: Handle projects with attributes like `title`, `description`, `status`, and `deadline`.
- **Task Management**: Manage tasks with attributes like `title`, `description`, `status`, `priority`, `assignee`, and `due_date`.

---

## Project Structure

The project is divided into three Django apps:

1. **User**: Manages user data and operations.
2. **Project**: Handles project-related entities and operations.
3. **Task**: Manages tasks and their associations with users and projects.

---

## Requirements

- Python 3.8+
- Docker
- Docker Compose
- PostgreSQL

---

## Installation

### 1. Clone the Repository

```bash
$ git clone git@github.com:venu-prasath/ReevaDashboard.git
$ cd ReevaDashboard/reeva-backend
```

### 2. Install dependencies & Build and Run with Docker Compose

#### Build and Run the Containers

```bash
$ pip install -r requirements.txt
$ docker-compose up --build
```

This command:

- Builds the Docker images for the Django API server and PostgreSQL.
- Starts the containers and sets up the application environment.

#### Access the API Server

The server will be running at `http://localhost:8000/`.

---

## Configuration

### Environment Variables

Ensure that the following environment variables are set in a `.env` file:

```
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## API Overview

### Entities and Their Attributes

#### User

- `name` (string)
- `email` (string, unique)
- `id` (integer, primary key)

#### Project

- `title` (string)
- `description` (string)
- `status` (string: e.g., active, completed, pending)
- `deadline` (date)

#### Task

- `title` (string)
- `description` (string)
- `status` (string: e.g., todo, in-progress, done)
- `priority` (integer)
- `assignee` (foreign key to User)
- `due_date` (date)

---

## Notes on Improvements

1. Role based access control for key components
2. Better implementation of JOIN queries to effieciently fetch data from database.
3. CI/CD pipeline set up for easy testing and deployment

## Development

### Install Dependencies Locally

```bash
$ pip install -r requirements.txt
```

### Run the Server Locally

```bash
$ python manage.py runserver
```

### Run Migrations

```bash
$ python manage.py makemigrations <app_name>
$ python manage.py migrate
```

---

## Docker Details

### Dockerfile

The `Dockerfile` defines the image for the Django API server.

### docker-compose.yml

The `docker-compose.yml` file defines services for:

- **db**: PostgreSQL database.
- **djangoapp**: Django API server.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
