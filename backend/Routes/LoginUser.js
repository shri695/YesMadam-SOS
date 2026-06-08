const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/loginuser", async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid Login" });
        }

        if (req.body.password !== userData.password) {
            return res.status(400).json({ errors: "Invalid Login" });
        }

        // Return everything the frontend needs
        return res.json({ 
            success: true, 
            name: userData.name, 
            role: userData.role, 
            authToken: "secret_123" 
        });
    } catch (error) {
        res.json({ success: false });
    }
});

module.exports = router;