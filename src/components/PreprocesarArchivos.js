import React, { useState, useEffect } from "react";
import useProjectsEffect from "./UseProjectEffect";
import style from "../static/style.css"


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

            {item.fields.detalles}

        </div>
    )

};

// var selectedItemsG = [];

// Lista de items
const SelectableItemList = ({ items }) => {

    const [selectedItems, setSelectedItems] = useState([]);

    // Agrega o elimina items del Hook selectedItems
    const handleClick = (id) => {

        // Donde id es la key del elemento

        setSelectedItems((prevSelectedItems) => {

            // if (selectedItems.includes(id)) {
            //     selectedItemsG = selectedItemsG.filter((item) => item !== id);
            // } else {
            //     selectedItemsG.push(id);
            //     console.log('Entra', id);
            //     console.log('A', selectedItemsG);
            // }

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

    // Proyectos obtenidos dentro del hook en el módulo useProjectsEffect
    const project = useProjectsEffect();

    const [selectedItems, setSelectedItems] = useState([]);

    console.log(selectedItems, 'A');

    // Rendera los items estilizados en <SelectableItemList> y alimentados
    // con useProjectsEffect
    return (
        <div className="container mt-5">

            <h1>Archivos disponibles</h1>
            <SelectableItemList items={project}/>

        </div>
    );
};

export default Inicio;