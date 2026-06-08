import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
    const [cart, setCart] = useState([]);
    const [bookingStatus, setBookingStatus] = useState("None");
    const [coords, setCoords] = useState({ lat: 12.9716, lon: 77.5946 });
    const pinkTheme = "#D43790";
    
    // Detect role from Login page
    const userRole = localStorage.getItem("userRole") || "Customer";

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({ lat: pos.coords.latitude.toFixed(4), lon: pos.coords.longitude.toFixed(4) });
            });
        }
    }, []);

    const services = [
        { id: 1, name: "Manicure", price: 499, img: "https://images.unsplash.com/photo-1632345033839-23188d7df6db?w=300" },
        { id: 2, name: "Pedicure", price: 599, img: "https://images.unsplash.com/photo-1519415510236-8557bada8b09?w=300" },
        { id: 3, name: "Facial", price: 999, img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?w=300" },
        { id: 4, name: "Hair Spa", price: 799, img: "https://images.unsplash.com/photo-1560869713-7d0a29430863?w=300" },
        { id: 5, name: "Full Massage", price: 1500, img: "https://images.unsplash.com/photo-1544161515-4ae6ce6ca606?w=300" },
        { id: 6, name: "Full Waxing", price: 899, img: "https://images.unsplash.com/photo-1596178065829-34b4e7410d02?w=300" }
    ];

    const handleAccept = () => {
        setBookingStatus("Accepted");
        const msg = `YESMADAM: Sana accepted your request at Loc: ${coords.lat}, ${coords.lon}`;
        window.open(`https://wa.me/916361648869?text=${encodeURIComponent(msg)}`);
    };

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar />
            <div className="container mt-4">
                
                {/* SHARED HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{borderColor: pinkTheme}}>
                    <div>
                        <h4 style={{color: pinkTheme}}>Welcome, {userRole}</h4>
                        <p className="small mb-0">📍 Live Location: {coords.lat}, {coords.lon}</p>
                    </div>
                    {userRole === "Customer" && (
                        <div className="text-end border p-2 rounded" style={{borderColor: pinkTheme}}>
                            <h6 className="mb-0">🛒 Cart: {cart.length} Items</h6>
                            <button className="btn btn-sm mt-1" style={{backgroundColor: pinkTheme, color: "white"}} onClick={() => setBookingStatus("Pending")}>Book Now</button>
                        </div>
                    )}
                </div>

                {/* SANA'S DASHBOARD */}
                {userRole === "Sana" ? (
                    <div className="text-center p-5 rounded" style={{backgroundColor: "#111", border: `1px solid ${pinkTheme}`}}>
                        <h3>Service Provider Dashboard</h3>
                        {bookingStatus === "Pending" ? (
                            <div className="mt-4">
                                <p className="fs-5">New Booking Request from Customer!</p>
                                <button className="btn btn-success btn-lg px-5" onClick={handleAccept}>Accept & Notify via WhatsApp</button>
                            </div>
                        ) : bookingStatus === "Accepted" ? (
                            <div className="mt-4">
                                <button className="btn btn-danger pulse shadow-lg" style={{ borderRadius: "50%", width: "120px", height: "120px", fontWeight: "bold", border: "5px solid white" }} onClick={() => alert("🚨 SOS TRIGGERED! Location sent to Police.")}>SOS</button>
                                <h4 className="text-danger mt-3 fw-bold">SANA SAFETY SOS ACTIVE</h4>
                            </div>
                        ) : <p className="text-muted">Waiting for customer pings...</p>}
                    </div>
                ) : (
                    /* CUSTOMER DASHBOARD */
                    <div className="row">
                        <h3 className="mb-4">Select Your Beauty Services</h3>
                        {services.map(s => (
                            <div key={s.id} className="col-md-4 mb-4">
                                <div className="card bg-dark text-white h-100 shadow" style={{ border: `1px solid ${pinkTheme}` }}>
                                    <img src={s.img} className="card-img-top" style={{height: "160px", objectFit: "cover"}} alt={s.name} />
                                    <div className="card-body text-center">
                                        <h5>{s.name}</h5>
                                        <p className="text-muted">₹{s.price}</p>
                                        <button className="btn w-100 fw-bold" style={{backgroundColor: pinkTheme, color: "white"}} onClick={() => setCart([...cart, s])}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}