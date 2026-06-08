const mongoose = require('mongoose');

// This defines exactly what data we save in MongoDB
const BookingSchema = new mongoose.Schema({
    customerEmail: { type: String, required: true },
    serviceName: { type: String, required: true },
    location: {
        lat: { type: String },
        lon: { type: String }
    },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);