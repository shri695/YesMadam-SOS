import React from 'react';
import { MapPin, Phone, ShieldAlert, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveSession() {
    const navigate = useNavigate();

    return (
        <div style={container}>
            <div style={mapArea}>
                <button onClick={() => navigate(-1)} style={backBtn}><ChevronLeft/></button>
                <div style={pulseContainer}>
                    <div style={pulse}></div>
                    <MapPin size={50} color="#D43790" fill="#D43790"/>
                </div>
                <p style={mapText}>Sana is 0.8 km away • Arriving in 4 mins</p>
            </div>

            <div style={detailCard}>
                <div style={partnerInfo}>
                    <div style={avatar}>S</div>
                    <div>
                        <h2 style={{margin:0}}>Sana</h2>
                        <p style={{margin:0, color:'#888'}}>Professional Beautician • 500+ Bookings</p>
                    </div>
                </div>

                <div style={actionRow}>
                    <button style={callBtn} onClick={() => alert("Calling Sana...")}><Phone size={20}/> Call Sana</button>
                    <button style={sosBtn} onClick={() => alert("EMERGENCY: SOS Alert sent!")}><ShieldAlert size={20}/> SOS</button>
                </div>
                
                <div style={safetyBadge}>
                    🛡️ This session is monitored for your safety.
                </div>
            </div>
        </div>
    );
}

const container = { height: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f0f0' };
const mapArea = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', position: 'relative' };
const backBtn = { position: 'absolute', top: '20px', left: '20px', background: '#fff', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer' };
const pulseContainer = { position: 'relative', marginBottom: '20px' };
const pulse = { position: 'absolute', width: '100%', height: '100%', background: 'rgba(212, 55, 144, 0.3)', borderRadius: '50%', transform: 'scale(2)', animation: 'ping 2s infinite' };
const mapText = { fontWeight: 'bold', color: '#555' };
const detailCard = { background: '#fff', padding: '30px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', boxShadow: '0 -10px 20px rgba(0,0,0,0.1)' };
const partnerInfo = { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' };
const avatar = { width: '60px', height: '60px', background: '#D43790', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' };
const actionRow = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const callBtn = { padding: '15px', borderRadius: '15px', border: '1px solid #ddd', background: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' };
const sosBtn = { padding: '15px', borderRadius: '15px', border: 'none', background: '#FF4D4D', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' };
const safetyBadge = { textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#AAA' };