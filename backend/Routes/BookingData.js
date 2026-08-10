require('dotenv').config();

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

let Booking = null;
try {
  Booking = require('../models/Booking');
} catch (e) {
  Booking = null;
}

const DATA_FILE = path.join(__dirname, '..', 'data', 'bookings.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

function readFileBookings() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeFileBookings(rows) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2), 'utf8');
}

function mongoReady() {
  return Booking && mongoose.connection.readyState === 1;
}

function getTwilioClient() {
  const sid = process.env.TWILIO_SID;
  const token = process.env.TWILIO_TOKEN;
  if (!sid || !token || sid.includes('your_')) return null;
  try {
    const twilio = require('twilio');
    return new twilio(sid, token);
  } catch {
    return null;
  }
}

router.post('/book-sana', async (req, res) => {
  try {
    const { email, serviceName, location } = req.body;

    if (mongoReady()) {
      const savedBooking = await Booking.create({
        customerEmail: email,
        serviceName,
        location,
        status: 'Pending',
      });
      return res.json({ success: true, bookingId: savedBooking._id });
    }

    const rows = readFileBookings();
    const booking = {
      _id: `local_${Date.now()}`,
      customerEmail: email,
      serviceName,
      location,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    rows.unshift(booking);
    writeFileBookings(rows);
    return res.json({ success: true, bookingId: booking._id, mode: 'file' });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/requests', async (req, res) => {
  try {
    if (mongoReady()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(bookings);
    }
    return res.json(readFileBookings());
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

router.put('/update-status', async (req, res) => {
  try {
    const { id, status } = req.body;

    if (mongoReady()) {
      await Booking.findByIdAndUpdate(id, { status });
      return res.json({ success: true });
    }

    const rows = readFileBookings();
    const idx = rows.findIndex((r) => r._id === id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Not found' });
    rows[idx].status = status;
    writeFileBookings(rows);
    return res.json({ success: true, mode: 'file' });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.post('/send-sos', async (req, res) => {
  try {
    const { location, customerEmail, lat, lon, long, userEmail, name } = req.body;
    const finalLat = location?.lat ?? lat;
    const finalLon = location?.lon ?? location?.long ?? lon ?? long;
    const who = customerEmail || userEmail || name || 'Unknown user';

    const maps = `https://www.google.com/maps?q=${finalLat},${finalLon}`;
    const messageBody = `SOS ALERT! ${who} needs help!\nLocation: Lat ${finalLat}, Lon ${finalLon}\nMaps: ${maps}`;

    const client = getTwilioClient();
    if (client && process.env.TWILIO_PHONE && process.env.MY_PHONE) {
      await client.messages.create({
        body: messageBody,
        from: `whatsapp:${process.env.TWILIO_PHONE}`,
        to: `whatsapp:${process.env.MY_PHONE}`,
      });
      return res.json({ success: true, channel: 'whatsapp' });
    }

    // Demo mode so interview deploy still works without Twilio keys
    console.log('SOS DEMO MODE:', messageBody);
    return res.json({
      success: true,
      channel: 'demo',
      message: 'SOS recorded in demo mode (Twilio keys not configured)',
      maps,
    });
  } catch (error) {
    console.error('Twilio SOS Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
