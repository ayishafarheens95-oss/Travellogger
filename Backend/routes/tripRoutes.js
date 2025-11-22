// backend/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Create Trip
router.post('/', async (req, res) => {
  try {
    const { title, location, startDate, endDate, notes, rating } = req.body;
    if (!title || !location || !startDate) {
      return res.status(400).json({ error: 'title, location and startDate are required' });
    }
    const trip = new Trip({ title, location, startDate, endDate, notes, rating });
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get single trip
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete trip
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
