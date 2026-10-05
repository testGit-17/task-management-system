# Task management frontend

## Run locally

1. Start the API server on `http://localhost:5000`.
2. From this directory, run `npm install` and `npm run dev`.
3. Open the URL printed by Vite. Registration, login, and task management use the API server.

The API base URL defaults to `http://localhost:5000/api`. To use a different server, set `VITE_API_URL` to the full API base URL (for example, `https://example.com/api`) before starting or building the frontend.

## API endpoints

- `POST /register` and `POST /login` accept JSON `{ "username": "...", "password": "..." }`.
- Login must return an authentication token as either `{ "token": "..." }` or `{ "data": { "token": "..." } }`.
- `GET /tasks` returns a task array directly or in a `data` property. Tasks have `id` (or `_id`), `title`, and `description`.
- `POST /tasks` and `PUT /tasks/:id` accept JSON `{ "title": "...", "description": "..." }`.
- `DELETE /tasks/:id` deletes a task.

Authenticated task requests include the token as a Bearer authorization header. API errors can be returned as JSON with a `message` or `error` property.
