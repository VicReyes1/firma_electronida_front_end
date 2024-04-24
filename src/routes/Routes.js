import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Import paginas 
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import Ver_solicitud from '../pages/Usuario/Ver_Solicitud';
import Preregistro from '../pages/Usuario/Preregistro';



function Rutas() {
 

  return (
    <div className="App">
      <Routes>
        
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Landing_Page />} />
        <Route path='/ver_solicitud' element={<Ver_solicitud />} />
        <Route path='/preregistro' element={<Preregistro />} />
      
      </Routes>
    </div>
  );
}

export default Rutas;
