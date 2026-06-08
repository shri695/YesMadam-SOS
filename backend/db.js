const mongoose = require('mongoose');

// Replace this with your actual MongoDB connection string
const mongoURI = "mongodb://localhost:27017/safenight"; 

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
};

module.exports = mongoDB;