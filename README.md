TravelLogger

Log your trips and revisit beautiful memories.

Project overview

TravelLogger is a simple full-stack web application that lets users create, save, and view trip entries. Each trip contains a title, location, start and end dates, notes, and a rating. The frontend is built with React and modern CSS for a clean, card-based UI. The backend is built with Node.js + Express and uses MongoDB (via Mongoose) to persist trip data.

Key features:-

Add trips with title, location, dates, notes, and a rating

View all saved trips in a clean list/card layout

Frontend ↔ Backend communication through REST APIs (GET /api/trips, POST /api/trips)

Single-repo friendly structure (client/ + server/) and easy deployment options

Screenshot

![TravelLogger screenshot](/mnt/data/Screenshot 2025-11-22 105259.png)

Tech stack

Frontend: React

Styling: CSS (custom styles, gradients, shadows)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Dev tools: npm, Vite or Create React App (adjust instructions below if using CRA)

Live demo

Live deployment (replace with your actual link):
netlify link: https://travelloger.netlify.app



Repository structure (recommended)
root/
  client/        # React frontend
  server/        # Express backend
  README.md
  .gitignore

Setup & installation (development)

The instructions below assume you have node and npm installed and that you cloned the repository to your machine.

1. Clone the repository
git clone <https://github.com/ayishafarheens95-oss/Travellogger.git>


2. Install frontend dependencies
cd client
npm install

3. Install backend dependencies

Open a second terminal (or go back after step 2):

cd server
npm install

4. Environment variables

Create .env in server/ with something like:

PORT=5000



If the frontend uses environment variables (Vite or CRA), create .env in client/:

For Vite:

VITE_API_URL=http://localhost:5000


For CRA:

REACT_APP_API_URL=http://localhost:5000

5. Run backend (dev)

From server/:

npm run dev   # or: node server.js (or nodemon server.js if you have nodemon)

6. Run frontend (dev)

From client/:

npm run dev   # Vite
# OR
npm start     # CRA


Now open the frontend URL (Vite typically: http://localhost:5173, CRA: http://localhost:3000). The frontend will call the backend at http://localhost:5000 (or whatever PORT you set).

Build & production (single-app: serve frontend from Express)

If you want to deploy as one app (backend serves static frontend):

Build frontend:

cd client
npm run build   # Vite -> dist/     CRA -> build/


Copy build files into server/public (example for Vite -> dist):

# from repo root
rm -rf server/public
mkdir -p server/public
cp -r client/dist/* server/public/   # for CRA: cp -r client/build/* server/public/


Ensure server/server.js serves static files and has SPA fallback:

// server/server.js (example)
import express from 'express';
import path from 'path';
const app = express();

app.use(express.json());

// API routes
app.use('/api/trips', tripsRouter);

// Serve frontend
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(process.env.PORT || 5000);


Run the server:

cd server
node server.js


Your app is now accessible from the single server URL (e.g., https://your-domain.com).

Deploying (short guide)
Option A — Deploy frontend & backend separately

Deploy frontend to Netlify or Vercel (upload dist/ or build/).

Deploy backend to Heroku, Render, Railway, or DigitalOcean App Platform.

Set frontend VITE_API_URL / REACT_APP_API_URL to the backend’s production URL.

Allow CORS in backend for frontend origin.

Option B — Deploy single app (backend serves static files)

Build frontend and copy files to server/public (see above).

Deploy the backend repo to a platform that supports Node.js (Heroku, Render, Railway).

The server will serve both API and frontend from the same origin (recommended if you want just one deployment).

API Endpoints

GET /api/trips — returns JSON array of all trips

POST /api/trips — accepts JSON body { title, location, startDate, endDate, notes, rating } and saves a trip

Adjust endpoints as implemented in your server/ code. If you have auth or more endpoints, list them here.

Troubleshooting & common tips

If you see CORS errors during development, either:

Use a dev proxy in the frontend (Vite dev server proxy or CRA proxy), or

Enable CORS in Express: npm i cors and app.use(cors({ origin: 'http://localhost:5173' }))

If SPA routes show 404 after refresh in production, make sure your server has the SPA fallback to index.html.

For production DB, use a managed MongoDB (Atlas) and secure your connection string.

Contributing

Fork the repo

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add feature")

Push and open a Pull Request