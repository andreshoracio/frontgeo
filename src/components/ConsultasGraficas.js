import React, { useState } from "react";
import useEfectoTraerProyectos from "./EfectoTraerProyectos";
import useEfectoTraerPuntosPorProyecto from "./EfectoTraerPuntosPorProyecto";
import useOsmVisualizer from "./Spatial";
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
const SelectableItemList = ({ items, selectedItems, setSelectedItems, data, setData}) => {

    const [isLoading, setIsLoading] = useState(false);  

    // Agrega o elimina items del Hook selectedItems
    const handleClick = async (id) => {

        setIsLoading(true);
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
            
            const data = await response.json();
            const array = JSON.parse(data.data);
            setData(array);

        } catch (error) {

            console.error(error);
            
        }
    
        // Where id is the key of the element
        setSelectedItems((prevSelectedItems) => {

            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((pk) => pk !== id);
            } else {
                return [...prevSelectedItems, id];
            }
            
        });

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
    const [puntos, setPuntos] = useState([])
    var map = useOsmVisualizer(data);

    // Update the puntos state
    // setPuntos(useEfectoTraerPuntosPorProyecto("http://127.0.0.1:8000/visual/enviar_puntos_visuales", subProject));

    // Renderar puntos
    return (

        <div className="container mt-5">

            <h1>Visor</h1>

            <div className="flex-container">

                <div id="leaflet-map" className="leaflet-map right-panel"></div>

                <div className="left-panel">

                    <SelectableItemList
                        items={proyectos}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        data={data}
                        setData={setData}
                    />

                </div>

            </div>
            
        </div>

    );

}

export default Inicio;