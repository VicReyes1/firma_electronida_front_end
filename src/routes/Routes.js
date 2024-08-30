import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Import paginas 
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import Preregistro from '../pages/Usuario/Preregistro';
import Login_recuperar_contra from '../pages/Login_recuperar_contra';
import Mi_Solicitud from '../pages/Usuario/Mis_Solicitudes';

import Continuar_solicitud2 from '../pages/Usuario/Continuar_Solicitud2';
import Continuar_solicitud1 from '../pages/Usuario/Continuar_Solicitud1';
import Continuar_solicitud3 from '../pages/Usuario/Continuar_Solicitud3';
import Admin_Solicitudes from '../pages/ADMIN/Solicitudes';
import Verificar_Datos from '../pages/ADMIN/Verificar_Datos';
import Aprobacion_Req from '../pages/ADMIN/Aprobacion_req';
import Solicitud_Concluida from '../pages/ADMIN/Solicitud_Concluida';
import Solicitud_Concluida_U from '../pages/ADMIN/solicitudConcluidaUsuario';


import PDFGenerator from '../pages/ADMIN/PDF';
import PDFCarta from '../pages/ADMIN/PDF2';
import PDFViewer from '../pages/ADMIN/prueba';
import Aprobacion_Carta from '../pages/ADMIN/Aprobacion_carta_Responsiva';
import PreregistroPresencial from '../pages/Usuario/PreregistroPresencial';
import Continuar_solicitud_Presencial from '../pages/Usuario/Continuar_Solicitud_Presencial';
import PreregistroActualizacion from '../pages/Usuario/PreregistroActualizacion';
import Solicitud_ConcluidaUsuario from '../pages/ADMIN/Solicitud_Concluida';


import PrivateRoute from './privateRoute';
import RoleProtectedRoute from './roleProtectedRoute'



function Rutas() {
 

  return (
    <div className="App">
      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/login&RecuperarContraseña' element={<Login_recuperar_contra />} />
        <Route path='/' element={<Landing_Page />} />
        <Route path='/preregistro' element={<Preregistro />} />
        
        <Route path="/mi_solicitud" element={<PrivateRoute> <Mi_Solicitud /> </PrivateRoute>}/>
        <Route path="/preregistro/:idUser" element={<PrivateRoute><Preregistro /></PrivateRoute>} />
        <Route path="/preregistro22" element={<PrivateRoute><PreregistroActualizacion /></PrivateRoute>} />
        <Route path="/continuar_solicitud_presencial" element={<PrivateRoute><Continuar_solicitud_Presencial /></PrivateRoute>} />
        <Route path="/preregistro-presencial" element={<PrivateRoute><PreregistroPresencial /></PrivateRoute>} />
        <Route path="/continuar_solicitud2/:id" element={<PrivateRoute><Continuar_solicitud2 /></PrivateRoute>} />
        <Route path="/continuar_solicitud1/:id" element={<PrivateRoute><Continuar_solicitud1 /></PrivateRoute>} />
        <Route path="/continuar_solicitud3/:id" element={<PrivateRoute><Continuar_solicitud3 /></PrivateRoute>} />
        <Route path="/solicitud-concluida-usuario/:id" element={<PrivateRoute><Solicitud_Concluida_U /></PrivateRoute>} />


        <Route path="/admin&solicitudes" element={<RoleProtectedRoute><Admin_Solicitudes /></RoleProtectedRoute>} />
        <Route path="/admin&verificar_datos/:id" element={<RoleProtectedRoute><Verificar_Datos /></RoleProtectedRoute>} />
       


        <Route path="/admin&Aprobacion_Carta/:id" element={<RoleProtectedRoute><Aprobacion_Carta /></RoleProtectedRoute>} />
        <Route path="/admin&Aprobacion_Req/:id" element={<RoleProtectedRoute><Aprobacion_Req /></RoleProtectedRoute>} />
        <Route path="/admin&Solicitud_Concluida/:id" element={<RoleProtectedRoute><Solicitud_Concluida /></RoleProtectedRoute>} />

        
        <Route path='/PDF' element={<PDFGenerator/>} />
        <Route path='/PDF2' element={<PDFCarta/>} />
        <Route path='/PDF3' element={<PDFViewer/>} />

        <Route path='/continuar_solicitud_presencial' element={<Continuar_solicitud_Presencial />} />
        <Route path='/preregistro-presencial' element={<PreregistroPresencial />} />

      </Routes>
    </div>
  );
}

export default Rutas;