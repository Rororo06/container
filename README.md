# Full Stack Open: Containers

Exercises for the Containers part of Full Stack Open.

## Structure

- `answers/` — command line transcripts asked for in the exercises
- `todo-app/todo-backend/` — Express backend with MongoDB and Redis
- `todo-app/todo-frontend/` — React frontend
- `todo-tests/` — Playwright end to end tests

## Running the backend in development

Start MongoDB and Redis:

```bash
cd todo-app/todo-backend
docker compose -f docker-compose.dev.yml up -d
```

Then start the application:

```bash
MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database \
REDIS_URL=redis://localhost:6379 \
npm run dev
```

The containerised backend alone can be started with:

```bash
cd todo-app/todo-backend
docker compose up
```

## Endpoints

- `GET /todos`, `POST /todos`
- `GET /todos/:id`, `PUT /todos/:id`, `DELETE /todos/:id`
- `GET /statistics` — number of todos added, counted in Redis
