# elunic Developer Assessment Task

## Author

usman

## Getting Started

1. Start the development shell by running the following command in the root directory:
   ```bash
   ./shell
   ```
   This will set up a Docker container with all the necessary development tools.

## Running with Docker

1. Copy `.env.example` to `.env` and adjust if needed.
2. Build and start all services:
   ```bash
   docker-compose up --build
   ```
3. The backend will be available at [http://localhost:3333](http://localhost:3333).
4. MySQL will be available at `localhost:3306` (inside Docker network as `mysql:3306`).

## Migrations

- Migrations are run automatically on backend startup via Docker Compose.
- To run manually:
  ```bash
  npx nx run api:migrate
  ```

## Assessment Tasks

Your task is to set up a full-stack application using Nx as the monorepo tool, with the following components:

### 1. Set Up Nx in the Existing Repository

- Initialize Nx in this repository

### 2. Create an Angular Frontend Application

- Set up a new Angular application using Nx
- Create a responsive UI for displaying data from the backend

### 3. Create a NestJS Backend Application

- Set up a new NestJS application using Nx

### 4. Implement Basic API Functionality

- Frontend: Implement PrimeNG components with the default theme

Create an API endpoint that returns:
```json
{
  "message": "hello",
  "items": [1, 2, 3]
}
```

Display this data in the frontend:
- Show the message in a PrimeNG message component
- Display the items in a PrimeNG listbox component

### 5. Implement Database Functionality

- Connect backend to the MySQL database (credentials in `.env.example`)
- The MySQL database is running via Docker (see docker-compose.shell.yml)
- Database credentials are available in the .env file
- Use explicit database migrations rather than implicit schema generation
- Create a database model for "user messages"
- Implement explicit database migrations (no implicit schema generation)
- Create an API endpoint that accepts and stores messages from a form in the frontend
- Display all messages in a paginated PrimeNG component (3 messages per page)
- Create 10 test messages to validate pagination functionality
