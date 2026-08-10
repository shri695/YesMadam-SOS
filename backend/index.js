require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Mongo is optional — app falls back to local JSON file store
mongoDB().catch((err) => {
  console.warn("MongoDB unavailable, using file store:", err.message);
});

const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(cors({
  origin: allowedOrigin === "*" ? true : allowedOrigin,
}));
app.use(express.json());

const routesDir = fs.existsSync(path.join(__dirname, "Routes"))
  ? path.join(__dirname, "Routes")
  : path.join(__dirname, "routes");

app.use('/api', require(path.join(routesDir, "BookingData")));

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Emergency Alert & Response System API is running',
    endpoints: ['/api/book-sana', '/api/requests', '/api/update-status', '/api/send-sos'],
  });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
