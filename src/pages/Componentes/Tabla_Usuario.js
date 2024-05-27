
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí

function Tabla_Solicitudes_Usuario() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://localhost:3001/usuario/obtenerSolicitudes', {
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
            console.log(data)
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    } else {
        console.error('No token found');
        // Aquí puedes manejar el caso en que no se encuentre el token en el localStorage
    } 
  }, []); 
 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to adjust items per page

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
  if (status === 2) {
    window.location.href = `/continuar_solicitud1/${id}`;
  }
};

const renderButton = (id,estatusTramite) => {
  if (estatusTramite === 1) {
    return (
      <button
        className='boton'
      >
       Sin acciones
      </button>
    );
  } else if (estatusTramite === 2) {
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
            <th>Nombre</th>
            <th>Estatus</th>
            <th>Fecha Envio</th>
            <th>Visualización</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item, index) => (
            <tr key={index}>
                
                <td>{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
                <td>{item.status}</td>
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
          <button className='pagina' onClick={prevPage} disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? '#ccc' : '#6e6e6e' }}>Anterior</button>
          <span className='pagina'>{currentPage}</span>
          <button className='pagina' onClick={nextPage} disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? '#ccc' : '#6e6e6e' }}>Siguiente</button>
        </div>
      </div>
     
      
    </div>
    
  );
}

export default Tabla_Solicitudes_Usuario;