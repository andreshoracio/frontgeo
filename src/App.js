import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Nav from './components/Nav';

import Contacto from './components/Contacto';
import Inicio from './components/Inicio';
import CargueArchivo from './components/CargueArchivo';
import PreprocesarArchivos from './components/PreprocesarArchivos';

function App() {
  return (
  
    <Router>
      
      <Nav></Nav>

      <Routes>
        <Route path='/' exact element={<Inicio></Inicio>}></Route>
        <Route path='/contacto' exact element={<Contacto></Contacto>}></Route>
        <Route path='/cargarArchivo' exact element={<CargueArchivo></CargueArchivo>}></Route>
        <Route path='/preprocesarArchivo' exact element={<PreprocesarArchivos></PreprocesarArchivos>}></Route>
      </Routes>

    </Router>
  
  );
}

export default App;
