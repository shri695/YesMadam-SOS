import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Your local images are working perfectly!
import maniImg from '../assets/mani.jpg';
import pediImg from '../assets/pedi.jpg';
import facialImg from '../assets/facial.jpg';

export default function CustomerDashboard() {
    const [lat, setLat] = useState("Searching...");
    const [lon, setLon] = useState("Searching...");
    const [bookingStatus, setBookingStatus] = useState(null);
    const [currentBookingId, setCurrentBookingId] = useState(null); 
    const pinkTheme = "#D43790";

    const services = [
        { id: 1, name: "Luxury Manicure", price: 499, img: maniImg },
        { id: 2, name: "Premium Pedicure", price: 599, img: pediImg },
        { id: 3, name: "Bridal Facial", price: 999, img: facialImg }
    ];

    useEffect(() => {
        // High Accuracy GPS
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition((position) => {
                setLat(position.coords.latitude.toFixed(4));
                setLon(position.coords.longitude.toFixed(4));
            }, (err) => console.error(err), { enableHighAccuracy: true, maximumAge: 0 });

            // This polls the backend you just successfully started
            const checkStatus = setInterval(async () => {
                if (!currentBookingId) return; 

                try {
                    const response = await fetch("http://localhost:5000/api/requests");
                    const data = await response.json();
                    
                    const myBooking = data.find(req => req._id === currentBookingId);

                    if (myBooking && myBooking.status === "Accepted" && bookingStatus !== "Accepted") {
                        setBookingStatus("Accepted");
                        alert("✨ Sana has Accepted your mission! She is on her way! 🏃‍♀️💨");
                        setCurrentBookingId(null); 
                    }
                } catch (error) { 
                    console.error("Polling error: Check if backend is still running."); 
                }
            }, 5000);

            return () => {
                navigator.geolocation.clearWatch(watchId);
                clearInterval(checkStatus);
            };
        }
    }, [bookingStatus, currentBookingId]);

    const handleBooking = async (serviceName) => {
        const userEmail = localStorage.getItem("userEmail") || "test@gmail.com";
        try {
            // Updated fetch to match your live port 5000
            const response = await fetch("http://localhost:5000/api/book-sana", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, serviceName, location: { lat, lon } })
            });
            
            if (!response.ok) throw new Error("Backend connection failed");

            const data = await response.json();
            
            if (data.success) {
                setBookingStatus("Pending");
                setCurrentBookingId(data.bookingId); 
                alert(`✅ Request Sent! Waiting for Sana...`);
            }
        } catch (error) { 
            // This is the error message you saw
            alert("Backend is offline! Check your terminal for errors."); 
        }
    };

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 style={{ color: pinkTheme, fontWeight: "bold" }}>YesMadam Customer Portal</h1>
                    <div className="p-3 rounded-pill shadow" style={{ backgroundColor: pinkTheme, fontSize: "14px", fontWeight: "bold", border: "2px solid white" }}>
                        📍 LIVE: Lat: {lat}, Lon: {lon}
                    </div>
                </div>

                {bookingStatus === "Accepted" && (
                    <div className="alert alert-success text-center fw-bold shadow-sm mb-4" style={{ borderRadius: "15px" }}>
                        🎉 Sana is currently fulfilling your request!
                    </div>
                )}

                <div className="row">
                    {services.map((service) => (
                        <div className="col-md-4 mb-4" key={service.id}>
                            <div className="card bg-dark text-white border-0 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden" }}>
                                <img src={service.img} className="card-img-top" alt={service.name} style={{ height: "220px", width: "100%", objectFit: "cover" }} />
                                <div className="card-body text-center p-4">
                                    <h4 className="card-title fw-bold">{service.name}</h4>
                                    <h5 className="mb-3" style={{ color: pinkTheme }}>₹{service.price}</h5>
                                    <button 
                                        className="btn w-100 py-2 fw-bold" 
                                        style={{ backgroundColor: pinkTheme, color: "white", borderRadius: "10px" }}
                                        onClick={() => handleBooking(service.name)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}