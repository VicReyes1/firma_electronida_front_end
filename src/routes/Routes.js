import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Import paginas 
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import Ver_solicitud from '../pages/Usuario/Ver_Solicitud';
import Preregistro from '../pages/Usuario/Preregistro';
import Login_recuperar_contra from '../pages/Login_recuperar_contra';
import Mi_Solicitud from '../pages/Usuario/Mis_Solicitudes';

import Continuar_solicitud2 from '../pages/Usuario/Continuar_Solicitud2';
import Continuar_solicitud1 from '../pages/Usuario/Continuar_Solicitud1';
import Continuar_solicitud3 from '../pages/Usuario/Continuar_Solicitud3';
import Admin_Solicitudes from '../pages/ADMIN/Solicitudes';
import Verificar_Datos from '../pages/ADMIN/Verificar_Datos';




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
        <Route path='/continuar_solicitud2' element={<Continuar_solicitud2 />} />
        <Route path='/continuar_solicitud1' element={<Continuar_solicitud1 />} />
        <Route path='/continuar_solicitud3' element={<Continuar_solicitud3 />} />
        <Route path='/admin&solicitudes' element={<Admin_Solicitudes/>} />
        <Route path='/admin&verificar_datos' element={<Verificar_Datos/>} />
      
      </Routes>
    </div>
  );
}

export default Rutas;
