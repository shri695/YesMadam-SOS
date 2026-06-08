const mongoose = require('mongoose');

const SOSSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    contact: { type: String, required: true },
    triggerType: { type: String, required: true }, // MANUAL or TIMER
    status: { type: String, default: "Urgent" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('sos_alerts', SOSSchema);