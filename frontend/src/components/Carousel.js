import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    {/* The Search Bar Overlay */}
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-dark text-white border-danger" type="search" placeholder="Search for nearby Safe-Zones or Verified Riders..." aria-label="Search" />
                            <button className="btn btn-danger text-white" type="submit">Search</button>
                        </form>
                    </div>

                    {/* Image 1: High-Tech Security/City */}
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1555854817-5b27a8a27578?auto=format&fit=crop&w=1200&q=80" 
                             className="d-block w-100" 
                             style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} 
                             alt="Security Tracking" />
                    </div>

                    {/* Image 2: Night City Safety */}
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200" 
                             className="d-block w-100" 
                             style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} 
                             alt="Safe Night Streets" />
                    </div>

                    {/* Image 3: Digital Map/Safety Interface */}
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80" 
                             className="d-block w-100" 
                             style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} 
                             alt="Digital Surveillance" />
                    </div>
                </div>

                {/* Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}