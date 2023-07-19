import React from "react";

const CargueArchivo = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                <h2>Cargue Archivos</h2>
                <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre (utilice minusculas y no tildes):</label>
                    <input type="text" className="form-control" id="nombre" aria-describedby="emailHelp"></input>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Archivo:</label>
                    <input type="file" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo de proyecto:</label>
                    <input type="text" className="form-control" id="tipo" aria-describedby="emailHelp"></input>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="detalle" className="form-label">Detalle:</label>
                    <input type="text" className="form-control" id="detalle" aria-describedby="emailHelp"></input>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-outline-primary">Submit</button>
                </form>

                </div>
            </div>
        </div>
    );
}

export default CargueArchivo;