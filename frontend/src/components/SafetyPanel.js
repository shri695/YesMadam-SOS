import React, { useState, useEffect } from 'react';
import { apiUrl } from '../api';

export default function SafetyPanel({ userType, coords }) {
    const emergencyNumber = "6361648869";
    const [timeLeft, setTimeLeft] = useState(null); // null means timer is not running

    // --- The Timer Logic ---
    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            // Countdown every 1 second
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            // AUTOMATIC TRIGGER when time runs out
            handleSOS("AUTOMATIC TIMER EXPIRED");
            setTimeLeft(null);
        }
        return () => clearTimeout(timer); // Cleanup to prevent memory leaks
    }, [timeLeft]);

    const handleSOS = async (triggerType = "MANUAL") => {
        const userEmail = localStorage.getItem("userEmail") || "test@gmail.com"; 

        try {
            const response = await fetch(apiUrl("/api/send-sos"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: { lat: coords[0], lon: coords[1] },
                    lat: coords[0],
                    long: coords[1],
                    userEmail: userEmail,
                    customerEmail: userEmail,
                    contact: emergencyNumber,
                    type: triggerType // Tells backend if it was manual or timer
                })
            });

            const result = await response.json();
            if (result.success) {
                alert(`🚨 SOS SENT (${triggerType})!\nContacting: ${emergencyNumber}`);
                setTimeLeft(null); // Stop timer if SOS is sent
            }
        } catch (error) {
            alert("Error: Backend is not responding.");
        }
    };

    // Helper to format seconds into MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div style={{
            position: 'fixed', top: '80px', right: '20px', zIndex: '1000',
            backgroundColor: 'rgba(33, 37, 41, 0.95)', padding: '15px',
            borderRadius: '12px', color: 'white', width: '220px', 
            border: '2px solid #dc3545', boxShadow: '0px 0px 15px #dc3545'
        }}>
            <h6 className="text-center text-danger mb-3">SAFE-NIGHT HUB</h6>
            
            {/* SOS Button */}
            <button className="btn btn-danger w-100 mb-2" onClick={() => handleSOS("MANUAL CLICK")}>
                🆘 TRIGGER SOS
            </button>

            {/* Timer Button */}
            {!timeLeft ? (
                <button className="btn btn-outline-warning w-100 mb-3" onClick={() => setTimeLeft(300)}>
                    ⏱ START 5M TIMER
                </button>
            ) : (
                <div className="text-center mb-3">
                    <div className="badge bg-warning text-dark p-2 w-100" style={{fontSize: '14px'}}>
                        Safety Check: {formatTime(timeLeft)}
                    </div>
                    <button className="btn btn-sm btn-link text-white mt-1" onClick={() => setTimeLeft(null)}>Cancel</button>
                </div>
            )}

            <div style={{ fontSize: '11px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                <p className="mb-1 text-muted"><strong>Contact:</strong> {emergencyNumber}</p>
                <p className="mb-0"><strong>GPS:</strong> {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</p>
            </div>
        </div>
    );
}