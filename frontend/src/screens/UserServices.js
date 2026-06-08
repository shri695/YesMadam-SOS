import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            // This fetches the data from your fixed Port 5000
            let response = await fetch("http://localhost:5000/api/salonData", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setServices(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load services:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleBooking = (serviceName) => {
        // The popup message for Sana you wanted!
        alert(`Booking request for ${serviceName} sent to Sana! She is preparing her kit.`);
        navigate('/active-session');
    };

    // If the data hasn't arrived yet, show this instead of a white screen
    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>Loading YesMadam Services...</div>;
    }

    return (
        <div style={{ padding: '40px', background: '#FDF7F9', minHeight: '100vh' }}>
            <h1 style={{ color: '#D43790', fontWeight: '900', marginBottom: '30px' }}>Available Services</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                {services.length > 0 ? services.map((item) => (
                    <div key={item.id} style={cardStyle}>
                        <img src={item.img} style={imgStyle} alt={item.name} />
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                            <p style={{ color: '#888' }}>Duration: {item.time}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                <span style={{ fontSize: '20px', fontWeight: '800', color: '#D43790' }}>{item.price}</span>
                                <button onClick={() => handleBooking(item.name)} style={btnStyle}>Book Now</button>
                            </div>
                        </div>
                    </div>
                )) : <div>No services found. Check your backend data!</div>}
            </div>
        </div>
    );
}

// Simple styling to make it look professional
const cardStyle = { background: '#fff', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };
const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' };
const btnStyle = { background: '#D43790', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' };