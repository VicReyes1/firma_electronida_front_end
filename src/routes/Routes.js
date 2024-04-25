import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Import paginas 
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import Ver_solicitud from '../pages/Usuario/Ver_Solicitud';
import Preregistro from '../pages/Usuario/Preregistro';
import Login_recuperar_contra from '../pages/Login_recuperar_contra';
import Mi_Solicitud from '../pages/Usuario/Mis_Solicitudes';
import Continuar_solicitud from '../pages/Usuario/Continuar_Solicitud';



function Rutas() {
 

  return (
    <div className="App">
      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/login&RecuperarContraseña' element={<Login_recuperar_contra />} />
        <Route path='/' element={<Landing_Page />} />
        <Route path='/ver_solicitud' element={<Ver_solicitud />} />
        <Route path='/mi_solicitud' element={<Mi_Solicitud />} />
        <Route path='/preregistro' element={<Preregistro />} />
        <Route path='/continuar_solicitud' element={<Continuar_solicitud />} />
      
      </Routes>
    </div>
  );
}

export default Rutas;
