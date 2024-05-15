import React from 'react';
import Heder from '../heder';
import Tabla_Solicitudes_Admin from '../Componentes/Tabla';


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

    <Tabla_Solicitudes_Admin/>

    </div>
  );
}

export default Admin_Solicitudes;
