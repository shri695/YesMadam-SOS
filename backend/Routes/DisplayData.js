const express = require('express');
const router = express.Router();

router.post('/salonData', (req, res) => {
    try {
        // This is the data that will appear on your screen
        const salonServices = [
            { 
                id: 1, 
                name: "Luxury Haircut", 
                price: "₹599", 
                time: "45 min", 
                img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500" 
            },
            { 
                id: 2, 
                name: "Bridal Glow Facial", 
                price: "₹1499", 
                time: "60 min", 
                img: "https://images.unsplash.com/photo-1570172619666-114317a3f25c?w=500" 
            },
            { 
                id: 3, 
                name: "Stress Relief Massage", 
                price: "₹899", 
                time: "50 min", 
                img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500" 
            }
        ];
        
        // This line sends the data back to your React App
        res.send(salonServices);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;