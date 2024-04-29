import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../css/Ver_solicitud.css'; // Verifica la ruta a tu archivo CSS
import Logo from '../../Images/Logo.png'; // Verifica la ruta a tu imagen

function Ver_solicitud() {
  return (
    <div className="container2">
      <div className="header2">
        <div className="image2">
          <img src={Logo} alt="Logo2" className="Logo2" />
        </div>
        <div className='titulo_header'>
          Firma Electrónica
        </div>
      </div>

      <div className='titulo-container'>
        <div className='titulo_2'>
          Ver Solicitud
        </div>
      </div>

      <div className='table_conteiner'>
      <Table className='tabla'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estatus</th>
          <th>Fecha de Envío</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td><Button className='boton2' variant="primary">Editar</Button></td>
        </tr>
      </tbody>
    </Table>
    </div>
    </div>
  );
}

export default Ver_solicitud;
