require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db"); // Ensure you have a db.js file that connects to MongoDB
const cors = require('cors');

// 1. Initialize MongoDB Connection
mongoDB();

// 2. Middleware
// CORS is essential to stop the "Backend is offline" error
app.use(cors()); 

// Allows the backend to understand JSON data sent from React
app.use(express.json()); 

// 3. Routes
// This links all the booking, status update, and SOS logic we wrote
app.use('/api', require("./routes/BookingData"));

// 4. Default Route for testing
app.get('/', (req, res) => {
  res.send('YesMadam Backend is Running Perfectly!');
});

// 5. Start Server
app.listen(port, () => {
  console.log(`Server successfully listening on port ${port}`);
  console.log("MongoDB Connected Successfully"); 
});