import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrders() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrders = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
        });
        let res = await response.json();
        setOrderData(res.orderData);
    }

    useEffect(() => { fetchMyOrders() }, [])

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
            <Navbar />
            <div className='container mt-5'>
                <h2 className='text-white mb-4' style={{ color: "#D43790" }}>My YesMadam Bookings</h2>
                <div className='row'>
                    {orderData && orderData.length > 0 ? orderData.map((data) => (
                        <div key={data._id} className="card bg-dark text-white mb-3 p-3 border-0 shadow">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{data.serviceName}</h5>
                                    <p className="text-secondary small mb-0">{new Date(data.date).toDateString()}</p>
                                </div>
                                <div>
                                    <span className={`badge p-2 ${data.status === 'Accepted' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {data.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : <p className='text-white'>No bookings found.</p>}
                </div>
            </div>
            <Footer />
        </div>
    )
}