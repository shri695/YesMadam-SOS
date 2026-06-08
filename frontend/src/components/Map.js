import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        // Only run if the 'map' div exists and isn't already used
        const container = L.DomUtil.get('map');
        if (container && !container._leaflet_id) {
            const map = L.map('map').setView([12.9716, 77.5946], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([12.9716, 77.5946]).addTo(map).bindPopup("Current Safety Hub");

            setMapInstance(map);
        }

        return () => {
            if (mapInstance) mapInstance.remove();
        };
    }, []);

    return <div id="map" style={{ height: "200px", width: "100%", borderRadius: "10px" }}></div>;
}