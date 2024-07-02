import React from 'react';
import '../../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';
import Button from 'react-bootstrap/Button';
import Tabla_Solicitudes_Usuario from '../Componentes/Tabla_Usuario';

function Mi_Solicitud() {
  return (
     <div>
        <Heder />
    <div className="container2">

      <div className='titulo-container'>
        <div className='titulo_2'>
          Mis Solicitudes
        </div>
      </div>
   
      <a href="/preregistro" className='boton_solicitud'>
        <Button className='boton-nueva-soli' variant="primary">Nueva Solicitud</Button>
      </a>

      <Tabla_Solicitudes_Usuario/>



      </div>
    </div>

  );
}

export default Mi_Solicitud;
