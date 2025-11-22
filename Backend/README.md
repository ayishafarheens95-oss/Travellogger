# TravelLogger — Backend (Express + MongoDB)

## Setup

1. cd backend
2. npm install
3. Copy `.env.example` to `.env` and update MONGO_URI (local or Atlas) and PORT if needed.
4. Start server:
   - dev: `npm run dev` (requires nodemon)
   - prod: `npm start`

## API Endpoints

Base: `http://localhost:5000/api/trips`

- `POST /api/trips` — create trip (JSON body)
- `GET /api/trips` — list all trips
- `GET /api/trips/:id` — get single trip
- `DELETE /api/trips/:id` — delete trip

## Example trip JSON
```json
{
  "title": "Weekend in Goa",
  "location": "Goa, India",
  "startDate": "2025-12-01",
  "endDate": "2025-12-04",
  "notes": "Relax and try local seafood",
  "rating": 5
}
