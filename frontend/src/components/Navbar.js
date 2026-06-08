import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const pinkTheme = "#D43790";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom" style={{ borderColor: pinkTheme }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fw-bold" to="/" style={{ color: pinkTheme }}>YesMadam</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
          </ul>
          <div className='d-flex'>
            {localStorage.getItem("token") ? (
              <button onClick={handleLogout} className="btn btn-danger fw-bold">Logout</button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}