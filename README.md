# Full Stack Open: Containers

Exercises for the Containers part of Full Stack Open.

## Structure

- `answers/` — command line transcripts asked for in the exercises
- `todo-app/todo-backend/` — Express backend with MongoDB and Redis
- `todo-app/todo-frontend/` — React frontend
- `todo-app/docker-compose.dev.yml`, `todo-app/nginx.dev.conf` — development environment
- `todo-app/docker-compose.yml`, `todo-app/nginx.conf` — production environment
- `todo-tests/` — Playwright end to end tests

## Running the whole application

Development, with hot reloading for both the frontend and the backend:

```bash
cd todo-app
docker compose -f docker-compose.dev.yml up
```

Production:

```bash
cd todo-app
docker compose up
```

Both environments are available at http://localhost:8080 and only Nginx
publishes a port to the host: the frontend, the backend, MongoDB and Redis are
reachable only inside the Compose network.

## Running the end to end tests

Start the production environment and then:

```bash
cd todo-tests
npm install
npx playwright install --with-deps chromium
npm run test:e2e
```

The same tests run in GitHub Actions on every push to `main`.

## Containerising an existing application

The development and production container environments for my own full stack
application (the bloglist of parts 4, 5 and 7) live in the repository of that
application: https://github.com/Rororo06/openfullstack/tree/main/my-app

## Backend endpoints

- `GET /todos`, `POST /todos`
- `GET /todos/:id`, `PUT /todos/:id`, `DELETE /todos/:id`
- `GET /statistics` — number of todos added, counted in Redis
