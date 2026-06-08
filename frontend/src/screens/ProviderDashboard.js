import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ProviderDashboard() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [activeMissions, setActiveMissions] = useState([]);

    const fetchAllData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/requests");
            const data = await response.json();
            // Separate lists to remove confusion
            setPendingRequests(data.filter(req => req.status === "Pending"));
            setActiveMissions(data.filter(req => req.status === "Accepted"));
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const updateStatus = async (id, newStatus) => {
        const response = await fetch("http://localhost:5000/api/update-status", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        if (response.ok) fetchAllData();
    };

    const triggerSOS = async (location, email) => {
        try {
            const response = await fetch("http://localhost:5000/api/send-sos", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, customerEmail: email })
            });
            const data = await response.json();
            if (data.success) alert("🚨 SOS Alert Sent to your WhatsApp (+91 6361648869)!");
            else alert("Error sending SOS. Check backend!");
        } catch (err) {
            alert("Could not connect to server!");
        }
    };

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar />
            <div className="container mt-5">
                <h2 style={{ color: "#00d1b2", fontWeight: "bold" }}>Sana's Partner Portal</h2>
                
                <h4 className="mt-4 text-warning">New Booking Requests</h4>
                {pendingRequests.map((req) => (
                    <div key={req._id} className="card bg-dark text-white mb-3 p-3 d-flex flex-row justify-content-between align-items-center border-info shadow">
                        <div>
                            <h5 className="mb-0 text-info">{req.serviceName}</h5>
                            <small className="text-muted">Client: {req.customerEmail}</small>
                        </div>
                        <button className="btn btn-info fw-bold" onClick={() => updateStatus(req._id, "Accepted")}>Accept Mission</button>
                    </div>
                ))}

                <h4 className="mt-5 text-success">Active Missions (In Progress)</h4>
                {activeMissions.map((req) => (
                    <div key={req._id} className="card bg-dark text-white mb-3 p-3 border-success shadow">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="text-success">{req.serviceName}</h5>
                                <p className="mb-1">Customer: {req.customerEmail}</p>
                                <p className="small text-warning">📍 Lat: {req.location?.lat}, Lon: {req.location?.lon}</p>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <button className="btn btn-success fw-bold" onClick={() => updateStatus(req._id, "Completed")}>Done / Finish</button>
                                <button className="btn btn-danger fw-bold" onClick={() => triggerSOS(req.location, req.customerEmail)}>🚨 SOS</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}