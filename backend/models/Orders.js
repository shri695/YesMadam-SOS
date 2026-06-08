const mongoose = require('mongoose');
const { Schema } = mongoose;

// This defines the structure of a "Ping" in your database
const OrderSchema = new Schema({
    guestEmail: { type: String, required: true },
    guestName: { type: String, required: true },
    serviceName: { type: String, required: true },
    price: { type: String, required: true },
    // Status starts as "Pending" until Sana clicks Accept
    status: { type: String, default: "Pending" }, 
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', OrderSchema);