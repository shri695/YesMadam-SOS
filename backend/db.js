const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/safenight";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        throw err;
    }
};

module.exports = mongoDB;
