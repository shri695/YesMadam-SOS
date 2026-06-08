const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // NEW SAFETY FIELDS:
    role: { type: String, default: "customer", enum: ["customer", "rider", "admin"] },
    governmentId: { type: String, required: true }, // Verified ID for safety
    isVerified: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);