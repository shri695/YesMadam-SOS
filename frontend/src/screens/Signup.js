import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// FIXED: Removed './screens/' because we are already inside the screens folder
// We actually don't need to import Home or Login here unless you are using them as components inside this file.
// Usually, you only need Link for navigation.

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // This calls your backend CreateUser route
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            alert("Account Created Successfully!");
            navigate("/login"); // Take them to login after signing up
        } else {
            alert("Enter Valid Credentials");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', background: '#121212' }}>
            <div className='container'>
                <form className='w-50 m-auto border p-4 rounded bg-dark text-white' onSubmit={handleSubmit}>
                    <h2 className='text-center mb-4' style={{ color: '#D43790' }}>Create Account</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" required />
                    </div>
                    <button type="submit" className="btn w-100 mb-2" style={{ backgroundColor: '#D43790', color: 'white' }}>Submit</button>
                    <Link to="/login" className="btn btn-outline-danger w-100">Already a user? Login</Link>
                </form>
            </div>
        </div>
    )
}