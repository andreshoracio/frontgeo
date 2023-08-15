import React, { useState, useRef } from "react";
import useEfectoTraerProyectos from "./EfectoTraerProyectos";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import style from "../static/style.css";


// Items con estilo que depende de la función handleClick
const SelectableItem = ({ item, isSelected, onSelect }) => {

    return (
        <div className="selectable"
            onClick={() => onSelect(item.pk)}
            style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? 'lightcoral' : 'white',
                padding: '5px',
                margin: '5px',
            }}>

            {item.fields.archivo_origen}

        </div>
    )

};


// Lista de items
const SelectableItemList = ({ items, selectedItems, setSelectedItems, data, setData, mapRef }) => {

    // To avoid initialize twice the map
    // const [isLoading, setIsLoading] = useState(false);

    // Agrega o elimina items del Hook selectedItems
    const handleClick = async (id) => {

        // setIsLoading(true);
    
        // Where id is the key of the element
        setSelectedItems((prevSelectedItems) => {

            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((pk) => pk !== id);
            } else {
                return [...prevSelectedItems, id];
            }
            
        });

        // Crear una forma contenedora de datos
        const uploadData = new FormData();
        uploadData.append('id', selectedItems);

        try {

            const response = await fetch(

                "http://127.0.0.1:8000/visual/enviar_puntos_visuales",
                {
                method: "POST",
                body: uploadData
                }

            );
            
            const data_f = await response.json();
            const array = JSON.parse(data_f.data);
            setData(array);

        } catch (error) {

            console.error(error);
            
        }

        if ( data === null ) {

            console.log('a');
            console.log(mapRef.current);
            // mapRef.current.clearLayers();

        } else {

            // Add puntos to the map
            data.forEach((punto) => {

                var markerOptions = {
                    color: "green",
                    fillColor: "yellow",
                    fillOpacity: 0.8,
                    radius: 0.8
                };

                var marker;

                // Extract latitude and longitude from punto.coordinates string
                const regex = /POINT \(([-\d.]+) ([-\d.]+)\)/;
                const matches = punto.fields.posicion.match(regex);

                if (matches) {

                    const longitude = parseFloat(matches[1]);
                    const latitude = parseFloat(matches[2]);

                    // Create marker with extracted latitude and longitude
                    marker = L.circle([latitude, longitude], markerOptions);
                    marker.addTo(mapRef.current);

                }
                
            });

        }


    };

    return (

        <div>

            {items.map((item) => (
                
                // Componente arriba dinamizado y llenado aquí con datos de
                // useProjectsEffect
                <SelectableItem
                    key={item.pk}
                    item={item}
                    isSelected={selectedItems.includes(item.pk)}
                    onSelect={handleClick}
                />

            ))}

        </div>

    );

};


// Componente principal
const Inicio = () => {

    const proyectos = useEfectoTraerProyectos("http://127.0.0.1:8000/visual/enviar_proyectos_visuales");
    const [selectedItems, setSelectedItems] = useState([]);
    var subProject = proyectos.filter((item) => selectedItems.includes(item.pk));
    const [data, setData] = useState(null);

    // Mapa
    const mapRef = useRef(null);
    if (!mapRef.current) {

        console.log('b', !mapRef.current);

        // Create a Leaflet map
        var map = L.map("leaflet-map").setView([4.691901, -74.074223], 5);

        console.log('c', !mapRef.current);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        mapRef.current = map;
    
    }

    // Renderar puntos
    return (

        <div className="container mt-5">

            <h1>Visor</h1>

            <div className="flex-container">

                <div className="left-panel">

                    <SelectableItemList
                        items={proyectos}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        data={data}
                        setData={setData}
                        mapRef={mapRef}
                    />

                </div>

                <div id="leaflet-map" className="leaflet-map right-panel"></div>

            </div>
            
        </div>

    );

}

export default Inicio;