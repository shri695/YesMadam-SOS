import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const pinkTheme = "#D43790";

    return (
        <div style={{ backgroundColor: "#000", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="card p-5 shadow-lg" style={{ backgroundColor: "#111", border: `2px solid ${pinkTheme}`, width: "400px" }}>
                <h1 className="text-center mb-4" style={{ color: pinkTheme, fontWeight: "bold" }}>YesMadam</h1>
                <p className="text-white text-center mb-4">Select your dashboard to begin</p>
                
                <button 
                    className="btn btn-lg w-100 mb-3 fw-bold" 
                    style={{ backgroundColor: pinkTheme, color: "white" }}
                    onClick={() => navigate("/customer")}
                >
                    I am a Customer
                </button>

                <button 
                    className="btn btn-lg btn-outline-light w-100 fw-bold" 
                    onClick={() => navigate("/provider")}
                >
                    I am a Partner (Sana)
                </button>
            </div>
        </div>
    );
}