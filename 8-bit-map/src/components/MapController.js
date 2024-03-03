import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';

const MapController = ({ changeCenter, changeZoom, center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.panTo(center);
    }, [center, map]);

    useEffect(() => {
        map.setZoom(zoom);
    }, [zoom, map]);
  
    return null;
};

export default MapController;