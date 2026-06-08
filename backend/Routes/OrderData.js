const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Importing the model we just made

// 1. ROUTE: Guest clicks "Book Now" to send a Ping
router.post('/bookService', async (req, res) => {
    try {
        await Order.create({
            guestEmail: req.body.email,
            guestName: req.body.name,
            serviceName: req.body.serviceName,
            price: req.body.price,
            status: "Pending" // Automatically marked as Pending
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. ROUTE: Sana fetches all "Pending" requests to see them on her screen
router.get('/getPendingRequests', async (req, res) => {
    try {
        let data = await Order.find({ status: "Pending" });
        res.json({ success: true, orders: data });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// 3. ROUTE: Sana clicks "Accept" to update the status in MongoDB
router.post('/updateStatus', async (req, res) => {
    try {
        await Order.findOneAndUpdate(
            { _id: req.body.orderId },
            { $set: { status: req.body.status } } // Changes status to 'Accepted'
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;