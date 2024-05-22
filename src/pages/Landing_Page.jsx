import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Landing_Page.css'; // Verifica la ruta a tu archivo CSS
import Logo from '../Images/Logo.png'; // Verifica la ruta a tu imagen

function Landing_Page() {
  return (
    <div className="container">
      <div className="header">
          <img src={Logo} alt="Logo" className="Logo" />

      </div>
      <div className="content">
        <div className='titulo'>
          Genera tu Firma Electrónica
        </div>

        <div className='texto'>
          La Firma Electrónica Avanzada Estatal es de uso exclusivo para trámites gubernamentales del Estado de Hidalgo y no se emplea en trámites de tipo federal.
        </div>
        
      </div>
      <div className="footer">
        <a href="/login">
          <Button className='boton' variant="primary">Iniciar Sesión</Button>
        </a>
      </div>
      <div className="footer2">
        <a href="/preregistro">
          <Button className='boton' variant="primary">Crear Cuenta</Button>
        </a>
      </div>

    </div>
  );
}

export default Landing_Page;
