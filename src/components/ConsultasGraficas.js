import React, {useState, useEffect} from "react";
import useEfectoTraerProyectos from "./EfectoTraerProyectos";
import useEfectoTraerPuntosPorProyecto from "./EfectoTraerPuntosPorProyecto";
import useOsmVisualizer from "./Spatial";
import axios from "axios";


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
const SelectableItemList = ({ items, selectedItems, setSelectedItems }) => {

    // Agrega o elimina items del Hook selectedItems
    const handleClick = (id) => {
    
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
    const puntos = useEfectoTraerPuntosPorProyecto("http://127.0.0.1:8000/visual/enviar_puntos_visuales", subProject);

    // Renderar puntos
    return (

        <div className="container mt-5">
            <h1>Visor gráfico</h1>

            <SelectableItemList
                items={proyectos}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems} />
            
            {/* <div>
                osm
            </div> */}

        </div>
    );

}

export default Inicio;