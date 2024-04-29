import React from 'react';
import Heder from '../heder';
import Tabla from '../Componentes/Tabla';

function Admin_Solicitudes() {
  return (
     <div>
        <Heder />
    <div className="container2">

      <div className='titulo-container'>
        <div className='titulo_2'>
          Solicitudes
        </div>
      </div>
    </div>

    <Tabla />

    </div>
  );
}

export default Admin_Solicitudes;
