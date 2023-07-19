import React from "react";
import {Link} from 'react-router-dom';


const Inicio = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                <ul className="list-group">
                    <li className="list-group-item" aria-current="true">Para subir un archivo crudo <Link className="right" to="/cargarArchivo">Ir...</Link></li>
                    <li className="list-group-item">Para procesar archivos crudos en conjunto</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default Inicio;