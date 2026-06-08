import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
    const [alerts, setAlerts] = useState([]);

    const fetchAlerts = async () => {
        const response = await fetch("http://localhost:5000/api/get-alerts");
        const data = await response.json();
        setAlerts(data);
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000); // Auto-refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-danger mb-4">🚨 Active Emergency Alerts</h2>
                <table className="table table-dark table-hover border-danger">
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Contact</th>
                            <th>Type</th>
                            <th>Location (Lat, Long)</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map((alert) => (
                            <tr key={alert._id}>
                                <td>{alert.userEmail}</td>
                                <td>{alert.contact}</td>
                                <td><span className="badge bg-danger">{alert.triggerType}</span></td>
                                <td>
                                    <a href={`https://www.google.com/maps?q=${alert.lat},${alert.long}`} 
                                       target="_blank" className="btn btn-sm btn-outline-info">
                                        View on Map
                                    </a>
                                </td>
                                <td>{new Date(alert.createdAt).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}