const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get ALL bookings (Pending, Accepted, SOS, Completed)
router.get('/admin/all-bookings', async (req, res) => {
    try {
        const allBookings = await Booking.find({}).sort({ createdAt: -1 });
        res.json(allBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;