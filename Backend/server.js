// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const tripRoutes = require('./routes/tripRoutes');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors()); // adjust origin for production
app.use(express.json());

// Routes
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => res.send('TravelLogger API running'));

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
