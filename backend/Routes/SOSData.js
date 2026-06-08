const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Initialize Twilio using your secret keys from .env
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

router.post('/send-sos', async (req, res) => {
    const { lat, lon, name } = req.body;
    
    // Create a clickable Google Maps link for the emergency contact
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

    try {
        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_PHONE}`, // Your Twilio Sandbox Number
            to: `whatsapp:${process.env.MY_PHONE}`,       // Your Personal Number
            body: `🚨 SOS ALERT! \nPartner: ${name} is in trouble. \nLive Location: ${googleMapsLink}`
        });
        res.json({ success: true, message: "WhatsApp Alert Sent!" });
    } catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ success: false, error: "Failed to send WhatsApp alert" });
    }
});

module.exports = router;