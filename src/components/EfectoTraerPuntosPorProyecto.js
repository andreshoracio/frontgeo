import { useState, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const useEfectoTraerPuntosPorProyecto = (url, subProject) => {

    // const [pks, setPks] = useState([]);
    const [points, setPoints] = useState([]);


    useEffect(() => {

        const getRequest = async (callback) => {

            // Crear una forma contenedora de datos
            const uploadData = new FormData();
            uploadData.append('projects', subProject);

            try {

                const response = await fetch(

                    url,
                    {
                    method: "POST",
                    body: uploadData
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