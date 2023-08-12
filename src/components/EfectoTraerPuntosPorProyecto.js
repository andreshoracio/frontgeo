import { useState, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const useEfectoTraerPuntosPorProyecto = (url, proyectos) => {

    const [pks, setPks] = useState([]);
    
    const [points, setPoints] = useState([]);
  
    useEffect(() => {

        const getRequest = async (callback) => {

            try {
                
                proyectos.forEach(element => {

                    setPks((prevSelectedItems) => {

                        if (prevSelectedItems.includes(element.pk)) {
                            return prevSelectedItems.filter((pk) => pk !== element.pk);
                        } else {
                            return [...prevSelectedItems, element.pk];
                        }
            
                    });

                });

                pks.forEach(element => {
                    console.log(element.pk);
                });

                const response = await fetch(
                    url,
                    {
                    method: "POST",
                    body: JSON.stringify(pks)
                    }
                );
                
                const data = await response.json();
                const array = JSON.parse(data.data);
                callback(array);

            } catch (error) {

                console.error(error);
                
            }

        };
    
        const myCallback = (element) => {

            setPoints(element);
            
        };
    
        getRequest(myCallback);

    }, []);

    return points;

};
 
export default useEfectoTraerPuntosPorProyecto;