import React from 'react';
import '../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Logo from '../Images/logotipo-01.png'; // Verifica la ruta a tu imagen
import { Link, useNavigate } from 'react-router-dom'; // Usar useNavigate para la navegación

function Heder() {
  const navigate = useNavigate();
  const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    navigate('/');
  }
  return (
    <div className="container2">
      <div className="header2">
        <div className="image2">
          <img src={Logo} alt="Logo2" className="Logo2" />
        </div>
        <div style={{ display: 'inline-block', width: '100%', fontWeight: 'bold' }}className='titulo_header'>
          Firma Electrónica Avanzada
          <button className="logout-button" onClick={logOut}>Cerrar Sesión</button>
          <div>
          
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Heder;
