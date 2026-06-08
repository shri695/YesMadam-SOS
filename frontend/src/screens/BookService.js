import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, MessageCircle } from 'lucide-react';

export default function BookService() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        setLoading(true);
        // Simulate sending a WhatsApp notification via Backend
        try {
            await fetch("http://localhost:5000/api/book-escort", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ agent: "Sana", client: "User" })
            });
            // After booking, move to the Active Session Page
            setTimeout(() => navigate('/active-session'), 2000);
        } catch (e) { 
            alert("Backend offline! Redirecting to session anyway..."); 
            navigate('/active-session');
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center', background: '#FFF5F8', minHeight: '100vh' }}>
            <h2 style={{ color: '#D43790' }}>Hire a Safety Escort</h2>
            <div style={{ background: '#fff', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <UserCheck size={50} color="#D43790" />
                <h3>Agent Sana</h3>
                <p>Shield ID: #8821 | Professional Safety Guard</p>
                <button onClick={handleBooking} style={{ width: '100%', padding: '20px', background: '#D43790', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>
                    {loading ? "Notifying Sana via WhatsApp..." : "CONFIRM BOOKING"}
                </button>
            </div>
        </div>
    );
}