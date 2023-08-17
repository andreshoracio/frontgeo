import React, { useState, useRef, useEffect } from "react";
import useEfectoTraerProyectos from "./EfectoTraerProyectos";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import style from "../static/style.css";


// Items con estilo que depende de la función handleClick
const SelectableItem = ({ item, isSelected, onSelect, selectedItems, setSelectedItems }) => {

    const itemUpdater = (id, setSelectedItems) => {

        // Where id is the key of the element
        setSelectedItems((prevSelectedItems) => {

            if (prevSelectedItems.includes(id)) {
                console.log('Y', id);
                return prevSelectedItems.filter((pk) => pk !== id);
            } else {
                console.log('N', id);
                return [...prevSelectedItems, id];
            }
            
        });

    }

    return (
        <div className="selectable"
            onClick={() => { onSelect(item.pk); itemUpdater(item.pk, setSelectedItems) }}
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
const SelectableItemList = ({ items, data, setData, mapRef }) => {

    const [selectedItems, setSelectedItems] = useState([]);
    console.log('EYYYY', selectedItems);

    // Agrega o elimina items del Hook selectedItems    
    const handleClick = async (selectedItems) => {

        // Crear una forma contenedora de datos
        const uploadData = new FormData();
        
        try {

            const response = await fetch(

                "http://127.0.0.1:8000/visual/enviar_puntos_visuales",
                {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': selectedItems})
                }

            );
            
            const data_f = await response.json();
            const array = JSON.parse(data_f.data);
            setData(array);

        } catch (error) {

            console.error(error);
            
        }

        if ( data === null ) {

            console.log('null');
            const map = mapRef.current

        } else {

            console.log('notnull');
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
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />

            ))}

        </div>

    );

};


// Componente principal
const Inicio = () => {

    const proyectos = useEfectoTraerProyectos("http://127.0.0.1:8000/visual/enviar_proyectos_visuales");
    // var subProject = proyectos.filter((item) => selectedItems.includes(item.pk));
    const [data, setData] = useState(null);

    // Mapa
    useEffect(() => {

        // console.log('b', !mapRef.current);

        if (!mapRef.current) {

            // Create a Leaflet map
            var map = L.map("leaflet-map").setView([4.691901, -74.074223], 5);

            // console.log('c', !mapRef.current);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);

            mapRef.current = map;
        
        }

    }, [])

    const mapRef = useRef(null);

    // Renderar puntos
    return (

        <div className="container mt-5">

            <h1>Visor</h1>

            <div className="flex-container">

                <div className="left-panel">

                    <SelectableItemList
                        items={proyectos}
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