import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';

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

      <div className='table_conteiner'>
      <Table className='tabla'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Fecha de Envío</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td><Button className='boton2' class='btn' variant="primary">Editar</Button></td>
        </tr>
      </tbody>
    </Table>
    </div>
    </div>


    </div>
  );
}

export default Mi_Solicitud;
