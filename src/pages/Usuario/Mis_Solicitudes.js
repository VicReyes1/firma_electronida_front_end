import React, { useState, useEffect } from 'react';
import '../../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';
import Button from 'react-bootstrap/Button';
import Tabla_Solicitudes_Usuario from '../Componentes/Tabla_Usuario';

function Mi_Solicitud() {
  const [data, setData] = useState([]);
  const [dummy, setDummy] = useState([]);
  const [userId, setUserId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${apiUrl}/usuario/obtenerSolicitudes`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json(); // Parsea la respuesta como JSON
        })
        .then(data => {
          setData(data); // Asigna los datos al estado
          setUserId(data.idUser); // Asume que todos los elementos tienen el mismo idUser
          
          console.log(data[0].idUser);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    } else {
      console.error('No token found');
      // Aquí puedes manejar el caso en que no se encuentre el token en el localStorage
    }
  }, []);
 
  return (
    <div>
      <Heder />
      <div className="container2">
        <div className='titulo-container'>
          <div className='titulo_2'>
            Mis Solicitudes
          </div>
        </div>
        <a href={`/preregistro/${userId}`} className='boton_solicitud'>
          <Button className='boton-nueva-soli' variant="primary">Nueva Solicitud</Button>
        </a>
        <Tabla_Solicitudes_Usuario />
      </div>
    </div>
  );
}

export default Mi_Solicitud;
