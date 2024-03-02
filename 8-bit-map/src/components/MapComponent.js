import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import React, { useState } from 'react';
import '@/styles/MapComponent.module.css';

import L from 'leaflet';

// Define the custom icon
const bankIcon = new L.Icon({
  iconUrl: "./bank.png",
  iconSize: [35, 35],
  iconAnchor: [25 + 10, 20],
});

const atmIcon = new L.Icon({
  iconUrl: "./atm.png",
  iconSize: [50, 50],
  iconAnchor: [25 - 10, 25],
});

const MapComponent = ({ center, zoom, branches, atms }) => {
  const [showAtms, setShowAtms] = useState(true);
  const [showBranches, setShowBranches] = useState(true);

  const controlStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000, // Ensure it appears above the map layers
    background: 'rgba(255, 255, 255, 0.8)', // Optional: for better visibility
    padding: '5px',
    borderRadius: '5px' // Optional: for styled corners
  };

  return (
    <>
      <div style={controlStyles}>
        <input
          type="checkbox"
          checked={showBranches}
          onChange={(e) => setShowBranches(e.target.checked)}
        /> Show Branches
        <input
          type="checkbox"
          checked={showAtms}
          onChange={(e) => setShowAtms(e.target.checked)}
        /> Show ATMs
      </div>
      <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
        {showBranches && branches.map((branch, index) => (
          <Marker key={index} position={branch.coordinates} icon={bankIcon} />
        ))}
        {showAtms && atms.map((atm, index) => (
          <Marker key={index} position={atm.coordinates} icon={atmIcon} />
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;
