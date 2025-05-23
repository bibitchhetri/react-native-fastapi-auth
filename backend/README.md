# TriNetra Backend Services

This project includes multiple backend services running in Docker containers, managed with Docker Compose. The services are:

- **ai-service**: Handles AI predictions.
- **api-gateway**: Routes API requests to the appropriate services.
- **auth-service**: Manages user authentication and authorization.
- **db**: PostgreSQL database for storing data.

## Running the Backend

### 1. Build and start the services

In the project directory, simply run the following command to build and start all backend services:

``` bash
docker-compose up --build
```

This will start the following services:
- **AI Service**: Available at `http://localhost:5001`
- **API Gateway**: Available at `http://localhost:3000`
- **Auth Service**: Available at `http://localhost:4000`
- **PostgreSQL Database**: Running on port `5432` (internal connection only).


### 3. Stopping the services

To stop the services and remove the containers, run:

``` 
docker-compose down
```

This will stop and remove all containers, while preserving the database data.

### 4. Resetting the database

To reset the database and remove all data, run:

``` 
docker-compose down -v
```

This will remove both the containers and the database data.

---

Now you're good to go! The services should be running and ready to handle requests.
