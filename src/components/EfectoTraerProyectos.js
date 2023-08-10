import { useState, useEffect } from "react";


const useEfectoTraerProyectos = (url) => {

    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
        const getRequest = async (callback) => {
            try {

                const response = await fetch(
                    url,
                    {
                    method: "GET",
                    }
                );
                
                const data = await response.json();
                const array = JSON.parse(data.proyectos);
                callback(array);

            } catch (error) {
                console.error(error);
            }
        };
    
        const myCallback = (element) => {
            setProjects(element);
        };
    
        getRequest(myCallback);

    }, [projects]);

    return projects;
};
 
export default useEfectoTraerProyectos;