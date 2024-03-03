import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';

const MapController = ({ changeCenter, changeZoom, center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
        // map.panTo(center);
        // map.setZoom(zoom);
    }, [center, map]);

    return null;
};

export default MapController;