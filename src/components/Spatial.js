import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const useOsmVisualizer = (puntos) => {

    console.log(puntos);

    // To avoid initialize twice the map
    const mapRef = useRef(null);
    
    useEffect(() => {

        // if (puntos.length !== 0) {
            
        //     try {

        //         if (!mapRef.current) {
    
        //             // Create a Leaflet map
        //             var map = L.map("leaflet-map").setView([4.691901, -74.074223], 5);
    
        //             L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //                 maxZoom: 19,
        //                 attribution: "© OpenStreetMap contributors"
        //             }).addTo(map);
    
        //             mapRef.current = map;
    
        //             // Add puntos to the map
        //             puntos.forEach((punto) => {
        //                 // Extract latitude and longitude from punto.coordinates string
        //                 const regex = /POINT \(([-\d.]+) ([-\d.]+)\)/;
        //                 const matches = punto.fields.posicion.match(regex);
    
        //                 if (matches) {
        //                     const longitude = parseFloat(matches[1]);
        //                     const latitude = parseFloat(matches[2]);
                            
        //                     console.log(longitude, latitude);
    
        //                     // Create marker with extracted latitude and longitude
        //                     L.marker([latitude, longitude]).addTo(mapRef.current);
        //                 }
        //             });
                
        //         }
            
        //     } catch (error) {
    
        //         console.error("Error initializing Leaflet map:", error);
    
        //     }

        // } else {
        //     try {

        //         if (!mapRef.current) {
    
        //             // Create a Leaflet map
        //             var map = L.map("leaflet-map").setView([4.691901, -74.074223], 5);
    
        //             L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //                 maxZoom: 19,
        //                 attribution: "© OpenStreetMap contributors"
        //             }).addTo(map);
    
        //             mapRef.current = map;
                
        //         }
            
        //     } catch (error) {
    
        //         console.error("Error initializing Leaflet map:", error);
    
        //     }
        // }

    }, []);

};

export default useOsmVisualizer;