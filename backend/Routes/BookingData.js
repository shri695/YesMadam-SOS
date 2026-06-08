require('dotenv').config();

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// 2. CREATE BOOKING (Customer Side)
router.post('/book-sana', async (req, res) => {
    try {
        const { email, serviceName, location } = req.body;
        const newBooking = new Booking({
            customerEmail: email,
            serviceName: serviceName,
            location: location, // Stores Lat/Lon
            status: "Pending"
        });
        
        const savedBooking = await newBooking.save();
        
        // SUCCESS: Returning the unique ID to the frontend
        res.json({ 
            success: true, 
            bookingId: savedBooking._id 
        }); 
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. GET ALL REQUESTS (Partner Side)
router.get('/requests', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

// 4. UPDATE STATUS (When Sana clicks Accept)
router.put('/update-status', async (req, res) => {
    try {
        const { id, status } = req.body;
        await Booking.findByIdAndUpdate(id, { status: status });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// 5. SOS WHATSAPP ROUTE
router.post('/send-sos', async (req, res) => {
    try {
        const { location, customerEmail } = req.body;
        
        const messageBody = `🚨 SOS ALERT! Sana needs help! 
        Location: Lat ${location.lat}, Lon ${location.lon}
        Customer: ${customerEmail}
        Maps: http://maps.google.com/maps?q=${location.lat},${location.lon}`;

        await client.messages.create({
            body: messageBody,
            from: `whatsapp:${process.env.TWILIO_PHONE}`,
            to: `whatsapp:${process.env.MY_PHONE}`
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Twilio SOS Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;