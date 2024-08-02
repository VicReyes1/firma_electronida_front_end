import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí
import Swal from 'sweetalert2'


function TablaAlta({ tab }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to adjust items per page
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Define la URL de tu API
    const url = `${apiUrl}/admin/obtenerAlta`; // Reemplaza con la URL de tu API
    
    // Hacer la petición GET
    fetch(url, {
      headers: {
        'authorization': `${token}`, // Es buena práctica usar el esquema "Bearer"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setFilteredData(data); // Inicialmente establece filteredData con todos los datos
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = data;
      //solicitudesNuevas solicitudesEnCurso estadisticas solicitudesSuspendidas estadisticas solicitudesConcluidas
      if (tab) {
        switch (tab) {
          case 'solicitudesNuevas':
            filtered = filtered.filter(item => item.estatusTramite === 1);
            break;
          case 'solicitudesEnCurso':
            filtered = filtered.filter(item => item.estatusTramite != 1 && item.estatusTramite != 5);
            break;
          case 'solicitudesConcluidas':
            filtered = filtered.filter(item => item.estatusTramite === 5);
            break;
          default:
            filtered = filtered;
            break;
        }
        
      }

      const normalizeDate = (dateString) => {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const [day, month, year] = dateString.split('/');
        const monthIndex = months.indexOf(month);
        return new Date(year, monthIndex, day);
      };

      const normalizedSearchTerm = normalizeDate(searchTerm);

      filtered = filtered.filter(item => {
        if (!isNaN(normalizedSearchTerm.getTime())) {
          const normalizedLastUpdate = normalizeDate(item.lastUpdate);
          const normalizedSendDate = normalizeDate(item.sendDate);
          return (
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (normalizedLastUpdate.getTime() === normalizedSearchTerm.getTime()) ||
            (normalizedSendDate.getTime() === normalizedSearchTerm.getTime())
          );
        } else {
          return item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });

      setFilteredData(filtered);
    };

    filterData();
  }, [tab, searchTerm, data]);

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

  const aceptarRechazar = async (id, estatus) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${apiUrl}/admin/aceptarRechazarAlta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ "id":id, "estado":estatus })
        });

        if (response.ok) {
            Swal.fire({
                title: 'Éxito',
                text: 'El estatus ha sido actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el estatus.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al realizar la solicitud.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        console.error('Error al actualizar el estatus:', error);
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
            <th>Correo</th>
            <th>Fecha de Envío</th>
            <th>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{`${item.nombre} `}</td>
              <td>{item.correo}</td>
              <td>{item.createdAt}</td>
              <td style={{ display: 'flex', gap: '0.2rem' }}>
                    <button
                className='boton'
                onClick={() => aceptarRechazar(item.id, "Rechazado")}
                >
                Rechazar
                </button>
                <button
                className='boton'
                onClick={() => aceptarRechazar(item.id, "Activo")}
                >
                Aceptar
                </button>
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

export default TablaAlta;
