import React from 'react';
import '../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Logo from '../Images/logotipo-01.png'; // Verifica la ruta a tu imagen

function heder() {
  return (
    <div className="container2">
      <div className="header2">
        <div className="image2">
          <img src={Logo} alt="Logo2" className="Logo2" />
        </div>
        <div className='titulo_header'>
          Firma Electrónica Avanzada
        </div>
      </div>
    </div>
  );
}

export default heder;
