
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí

function Tabla_Solicitudes_Usuario() {
  const [data, setData] = useState([
    { id: 1, name: 'John', state: 'Active', lastUpdate: '20/Abril/2024', sendDate: '15/Abril/2024', views: 100, isNew: true },
    { id: 2, name: 'Alice', state: 'Inactive', lastUpdate: '19/Abril/2024', sendDate: '10/Abril/2024', views: 150 },
    { id: 3, name: 'Bob', state: 'Active', lastUpdate: '18/Abril/2024', sendDate: '05/Abril/2024', views: 200, isNew: true },
    { id: 4, name: 'Jane', state: 'Inactive', lastUpdate: '17/Abril/2024', sendDate: '01/Abril/2024', views: 250, isNew: true },
    { id: 5, name: 'Doe', state: 'Active', lastUpdate: '16/Abril/2024', sendDate: '25/Marzo/2024', views: 300 },
    { id: 6, name: 'Mary', state: 'Active', lastUpdate: '15/Abril/2024', sendDate: '20/Marzo/2024', views: 350 },
    { id: 7, name: 'Peter', state: 'Inactive', lastUpdate: '14/Abril/2024', sendDate: '15/Marzo/2024', views: 400 },
    { id: 8, name: 'David', state: 'Active', lastUpdate: '13/Abril/2024', sendDate: '10/Marzo/2024', views: 450 },
    { id: 9, name: 'Sarah', state: 'Inactive', lastUpdate: '12/Abril/2024', sendDate: '05/Marzo/2024', views: 500 },
   
  ]);
 
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
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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

//

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
            <th>Estado</th>
            <th>Última Actualización</th>
            <th>Fecha de Envío</th>
            <th>Visualización</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item, index) => (
            <tr key={index}>
                
                <td>{item.name}</td>
                <td>{item.state}</td>
                <td>{item.lastUpdate}</td>
                <td>{item.sendDate}</td>
                <td>
                <button className='boton2'>Ver</button>
                </td>
                <td>
                <button className='boton3'>Actualizar</button>
                </td>
                <td>
                <button className='boton3'>Eliminar</button>
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