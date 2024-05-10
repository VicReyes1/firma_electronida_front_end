import React from 'react';
import '../../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';
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


      <Tabla_Solicitudes_Usuario/>



      </div>
    </div>

  );
}

export default Mi_Solicitud;
