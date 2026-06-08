import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';

export default function RoleSelection() {
    const navigate = useNavigate();

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFF5F8', padding: '20px' }}>
            <h1 style={{ color: '#D43790', fontSize: '32px' }}>YesMadam</h1>
            <p style={{ color: '#888', marginBottom: '40px' }}>Choose your mode to continue</p>

            <div onClick={() => navigate('/user-services')} style={cardStyle}>
                <div style={iconStyle('#FCE4EC')}><User color="#D43790" size={30} /></div>
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0 }}>Customer</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Book professional home services</p>
                </div>
            </div>

            <div onClick={() => navigate('/partner-dashboard')} style={cardStyle}>
                <div style={iconStyle('#E8F5E9')}><ShieldCheck color="#4CAF50" size={30} /></div>
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0 }}>Partner (Sana)</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Accept jobs & Safety Tools</p>
                </div>
            </div>
        </div>
    );
}

const cardStyle = { width: '100%', maxWidth: '350px', background: '#fff', padding: '20px', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(212, 55, 144, 0.1)' };
const iconStyle = (bg) => ({ background: bg, padding: '15px', borderRadius: '15px' });