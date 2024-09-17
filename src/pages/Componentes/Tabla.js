import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí
import Swal from 'sweetalert2';


function Tabla_Solicitudes_Admin({ tab }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to adjust items per page
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Define la URL de tu API
    const url = `${apiUrl}/admin/getAll`; // Reemplaza con la URL de tu API
    
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

  const handleRedirection = (id, status) => {
    if (status === 1) {
      window.location.href = `/admin&verificar_datos/${id}`;
    }
    if (status === 2) {
      window.location.href = `/admin&Aprobacion_Req/${id}`;
    }
    if (status === 3) {
      window.location.href = `/admin&Aprobacion_Carta/${id}`;
    }
    if (status === 5) {
      window.location.href = `/admin&Solicitud_Concluida/${id}`;
    }
  };

  const renderButton = (id, estatusTramite) => {
    if (estatusTramite === 1) {
      return (
        <button
          className='boton'
          onClick={() => handleRedirection(id, estatusTramite)}
        >
          Ver datos
        </button>
      );
    } else if (estatusTramite === 2 || estatusTramite === 3 || estatusTramite === 4) {
      return (
        <button
          className='boton2'
          onClick={() => handleRedirection(id, estatusTramite)}
        >
          Continuar Solicitud
        </button>
      );
    } else if (estatusTramite === 5) {
      return (
        <button
          className='boton2'
          onClick={() => handleRedirection(id, estatusTramite)}
        >
          Solicitud Terminada
        </button>
      );
    }
  };

  const handleElimination = (id) => {
    const token = localStorage.getItem('token');
    // Mostrar swal para confirmar antes de hacer el fetch
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, hace el fetch
        fetch(`${apiUrl}/admin/borrarRegistro/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${token}`, // Añade el token de autorización
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la eliminación');
          }
          return response.json();
        })
        .then((data) => {
          // Muestra swal de éxito si se elimina correctamente
          Swal.fire(
            '¡Eliminado!',
            'El registro ha sido eliminado correctamente.',
            'success'
          ).then(() => {
            // Recarga la página después de que el usuario cierre el Swal
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error('Error en la eliminación:', error);
          // Muestra swal de error si la eliminación falla
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el registro.',
            'error'
          );
        });
      }
    });
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
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className={item.editable ? '' : 'blue-circle'}></td>
              <td>{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
              <td>{item.correo}</td>
              <td>{item.telefono}</td>
              <td>{item.actualizacion}</td>
              <td>{item.createdAt}</td>
              <td>
                {renderButton(item.id, item.estatusTramite)}
              </td>
              <td>
                {item.estatusTramite === 5 ? (
                  <button
                    className='boton3'
                    disabled={true}
                  >
                    No disponible
                  </button>
                ) : (
                  <button
                    className='boton3'
                    onClick={() => handleElimination(item.id)}
                  >
                    Eliminar
                  </button>
                )}
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
