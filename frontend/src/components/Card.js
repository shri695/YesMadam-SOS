import React from 'react'

export default function Card(props) {
    return (
        <div>
            <div className="card mt-3 bg-dark text-white border-danger shadow" style={{ "width": "100%", "maxHeight": "400px" }}>
                <img src={props.imgSrc} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "cover" }} />
                <div className="card-body">
                    <h5 className="card-title text-danger">{props.title}</h5>
                    <p className="card-text" style={{ fontSize: "14px" }}>{props.description}</p>
                    <hr className='bg-white' />
                    <button className="btn btn-danger w-100 fw-bold">Activate Service</button>
                </div>
            </div>
        </div>
    )
}