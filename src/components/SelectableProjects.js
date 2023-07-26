import { useState, useEffect } from "react";


const selectableProjects = () => {

    const [selectedItems, setSelectedItems] = useState([]);

    // Agrega o elimina items del Hook selectedItems
    const handleClick = (id) => {

        // Donde id es la key del elemento

        setSelectedItems((prevSelectedItems) => {
            
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter((pk) => pk !== id);
            } else {
                return [...prevSelectedItems, id];
            }

        });

    };
  
    return selectedItems;
  };
  
  export default selectableProjects;