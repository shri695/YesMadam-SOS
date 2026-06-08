import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, MapPin, Star } from 'lucide-react';

export default function Summary() {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically save mission details to MongoDB
        const saveMissionToDB = async () => {
            try {
                await fetch("http://localhost:5000/api/save-mission", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        agentName: "Sana",
                        clientName: "Priya",
                        duration: "18 Mins"
                    })
                });
                console.log("Mission saved successfully!");
            } catch (err) {
                console.error("Failed to log mission:", err);
            }
        };

        saveMissionToDB();
    }, []);

    return (
        <div style={{ background: '#FFF5F8', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
            <div style={{ marginTop: '50px', marginBottom: '20px' }}>
                <div style={{ background: '#E8F5E9', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <ShieldCheck size={60} color="#4CAF50" />
                </div>
            </div>

            <h2 style={{ color: '#D43790' }}>Mission Accomplished!</h2>
            <p style={{ color: '#888' }}>Priya has reached her destination safely.</p>

            <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', margin: '20px 0', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <Clock color="#D43790" size={20} />
                        <p style={{ fontSize: '12px', color: '#AAA', margin: '5px 0' }}>Duration</p>
                        <h4 style={{ margin: 0 }}>18 Mins</h4>
                    </div>
                    <div style={{ borderLeft: '1px solid #EEE', borderRight: '1px solid #EEE', padding: '0 20px' }}>
                        <MapPin color="#D43790" size={20} />
                        <p style={{ fontSize: '12px', color: '#AAA', margin: '5px 0' }}>Distance</p>
                        <h4 style={{ margin: 0 }}>2.4 km</h4>
                    </div>
                    <div>
                        <Star color="#FFD700" size={20} fill="#FFD700" />
                        <p style={{ fontSize: '12px', color: '#AAA', margin: '5px 0' }}>Rating</p>
                        <h4 style={{ margin: 0 }}>5.0</h4>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => navigate('/home')}
                style={{ width: '100%', padding: '15px', background: '#D43790', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', marginTop: '20px', cursor: 'pointer' }}
            >
                BACK TO DASHBOARD
            </button>
        </div>
    );
}