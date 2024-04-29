import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí

function Tabla() {
  const [data, setData] = useState([
    { id: 1, name: 'John', state: 'Active', lastUpdate: '2024-04-20', sendDate: '2024-04-15', views: 100, isNew: true },
    { id: 2, name: 'Alice', state: 'Inactive', lastUpdate: '2024-04-19', sendDate: '2024-04-10', views: 150 },
    { id: 3, name: 'Bob', state: 'Active', lastUpdate: '2024-04-18', sendDate: '2024-04-05', views: 200, isNew: true },
    { id: 4, name: 'Jane', state: 'Inactive', lastUpdate: '2024-04-17', sendDate: '2024-04-01', views: 250, isNew: true },
    { id: 5, name: 'Doe', state: 'Active', lastUpdate: '2024-04-16', sendDate: '2024-03-25', views: 300 },
    { id: 6, name: 'Mary', state: 'Active', lastUpdate: '2024-04-15', sendDate: '2024-03-20', views: 350 },
    { id: 7, name: 'Peter', state: 'Inactive', lastUpdate: '2024-04-14', sendDate: '2024-03-15', views: 400 },
    { id: 8, name: 'David', state: 'Active', lastUpdate: '2024-04-13', sendDate: '2024-03-10', views: 450 },
    { id: 9, name: 'Sarah', state: 'Inactive', lastUpdate: '2024-04-12', sendDate: '2024-03-05', views: 500 },
    { id: 10, name: 'Emily', state: 'Active', lastUpdate: '2024-04-11', sendDate: '2024-03-01', views: 550 },
    { id: 11, name: 'Lucas', state: 'Active', lastUpdate: '2024-04-10', sendDate: '2024-03-28', views: 600 },
    { id: 12, name: 'Sophia', state: 'Inactive', lastUpdate: '2024-04-09', sendDate: '2024-03-23', views: 650 },
    { id: 13, name: 'Matthew', state: 'Active', lastUpdate: '2024-04-08', sendDate: '2024-03-18', views: 700 },
    { id: 14, name: 'Olivia', state: 'Inactive', lastUpdate: '2024-04-07', sendDate: '2024-03-13', views: 750 },
    { id: 15, name: 'Ethan', state: 'Active', lastUpdate: '2024-04-06', sendDate: '2024-03-08', views: 800 },
    { id: 16, name: 'Emma', state: 'Active', lastUpdate: '2024-04-05', sendDate: '2024-03-03', views: 850 },
    { id: 17, name: 'Alexander', state: 'Inactive', lastUpdate: '2024-04-04', sendDate: '2024-02-27', views: 900 },
    { id: 18, name: 'Ava', state: 'Active', lastUpdate: '2024-04-03', sendDate: '2024-02-22', views: 950 },
    { id: 19, name: 'Michael', state: 'Inactive', lastUpdate: '2024-04-02', sendDate: '2024-02-17', views: 1000 },
    { id: 20, name: 'Isabella', state: 'Active', lastUpdate: '2024-04-01', sendDate: '2024-02-12', views: 1050 },
    { id: 21, name: 'William', state: 'Active', lastUpdate: '2024-03-31', sendDate: '2024-02-07', views: 1100 },
    { id: 22, name: 'Mia', state: 'Inactive', lastUpdate: '2024-03-30', sendDate: '2024-02-02', views: 1150 },
    { id: 23, name: 'James', state: 'Active', lastUpdate: '2024-03-29', sendDate: '2024-01-28', views: 1200 },
    { id: 24, name: 'Charlotte', state: 'Inactive', lastUpdate: '2024-03-28', sendDate: '2024-01-23', views: 1250 },
    { id: 25, name: 'Daniel', state: 'Active', lastUpdate: '2024-03-27', sendDate: '2024-01-18', views: 1300 },
    { id: 26, name: 'Amelia', state: 'Inactive', lastUpdate: '2024-03-26', sendDate: '2024-01-13', views: 1350 },
    { id: 27, name: 'Benjamin', state: 'Active', lastUpdate: '2024-03-25', sendDate: '2024-01-08', views: 1400 },
    { id: 28, name: 'Sophie', state: 'Inactive', lastUpdate: '2024-03-24', sendDate: '2023-12-31', views: 1450 },
    { id: 29, name: 'Jacob', state: 'Active', lastUpdate: '2024-03-23', sendDate: '2023-12-26', views: 1500 },
    { id: 30, name: 'Oliver', state: 'Active', lastUpdate: '2024-03-22', sendDate: '2023-12-21', views: 1550 },
    // Agrega más datos aquí si es necesario
  ]);

 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to adjust items per page

  // Filter data based on search term including date
  const filteredData = data.filter(item => {
    // Check if search term matches date format YYYY-MM-DD
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(searchTerm);
    if (isDate) {
      // Compare with date fields
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastUpdate.includes(searchTerm) ||
        item.sendDate.includes(searchTerm)
      );
    } else {
      // Perform regular search
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
            <th></th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Última Actualización</th>
            <th>Fecha de Envío</th>
            <th>Visualización</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item, index) => (
            <tr key={index}>
                <td className={item.isNew ? 'blue-circle' : ''}></td>
                <td>{item.name}</td>
                <td>{item.state}</td>
                <td>{item.lastUpdate}</td>
                <td>{item.sendDate}</td>
                <td>
                <button className='boton2'>Ver</button>
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

export default Tabla;