import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí

function Tabla_Solicitudes_Admin() {
  const [data, setData] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to adjust items per page



  useEffect(() => {
    // Define la URL de tu API
    const url = 'http://localhost:3001/admin/getAll'; // Reemplaza con la URL de tu API

    // Hacer la petición GET
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
      
      });
  }, []);
// Filter data based on search term including date
const filteredData = data.filter(item => {
  const normalizeDate = (dateString) => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const [day, month, year] = dateString.split('/');
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex, day);
  };

  // Normalize search term date
  const normalizedSearchTerm = normalizeDate(searchTerm);

  // Check if search term matches date format DD/Mes/YYYY
  if (!isNaN(normalizedSearchTerm.getTime())) {
    // Compare with date fields
    const normalizedLastUpdate = normalizeDate(item.lastUpdate);
    const normalizedSendDate = normalizeDate(item.sendDate);
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (normalizedLastUpdate.getTime() === normalizedSearchTerm.getTime()) ||
      (normalizedSendDate.getTime() === normalizedSearchTerm.getTime())
    );
  } else {
    // Perform regular search
    return item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  }
});


  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// Calcula el rango de índices de los elementos que se están mostrando actualmente
const currentRangeStart = indexOfFirstItem + 1;
const currentRangeEnd = Math.min(indexOfLastItem, filteredData.length);
const totalItems = filteredData.length;

// Muestra la información de la paginación
const paginationInfo = `Mostrando ${currentRangeStart} - ${currentRangeEnd} de ${totalItems} registros`;

const handleRedirection = (id, status) => {
  if (status === 1) {
    window.location.href = `/admin&verificar_datos/${id}`;
  } 
  if (status === 2) {
    window.location.href = `/admin&Aprobacion_Req/${id}`;
  }
   
};

const renderButton = (id,estatusTramite) => {
  if (estatusTramite === 1) {
    return (
      <button
        className='boton'
        onClick={() => handleRedirection(id, estatusTramite)}
      >
       Ver datos
      </button>
    );
  } else if (estatusTramite === 2 || estatusTramite === 3) {
    return (
      <button
        className='boton2'
        onClick={() => handleRedirection(id, estatusTramite)}
      >
        Continuar Solicitud
      </button>
    );
  }
};

  return (
    <div className="tabla-container">
      <Form.Group className='buscar'>
        <Form.Control
          type="text"
          placeholder="Buscar......"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Ultima Actualización</th>
            <th>Fecha de Envío</th>
            <th>Visualización</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item, index) => (
            <tr key={index}>
                <td className={item.nuevo_modificado ? 'blue-circle' : ''}></td>
                <td>{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
                <td>{item.correo}</td>
                <td>{item.telefono}</td>
                <td>{item.actualizacion}</td>
                <td>{item.createdAt}</td>
                <td>
                  {renderButton(item.id,item.estatusTramite)}
                </td>
            </tr>
            ))}

        </tbody>
      </Table>
      <div className="pagination-container">
        <div className="pagination-info">{paginationInfo}</div>
        <div className="pagination-controls">
          <button className='pagina' onClick={prevPage} disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? '#A02142' : '#691B31' }}>Anterior</button>
          <span className='pagina'>{currentPage}</span>
          <button className='pagina' onClick={nextPage} disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? '#A02142' : '#691B31' }}>Siguiente</button>
        </div>
      </div>
     
      
    </div>
    
  );
}

export default Tabla_Solicitudes_Admin;