import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import '../../css/tabla.css'; // Importa tus estilos CSS personalizados aquí

function Tabla_Solicitudes_Usuario() {
  const [data, setData] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedId2, setSelectedId2] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [idd, setIdd] = useState('');
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
          // Verifica la estructura de los datos
          console.log('Datos recibidos del API:', data);
          if (Array.isArray(data)) {
            setData(data); // Asigna los datos al estado si es un array
          } else {
            console.error('La respuesta no es un array:', data);
          }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    } else {
      console.error('No token found');
      // Aquí puedes manejar el caso en que no se encuentre el token en el localStorage
    }
  }, [apiUrl]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Cambia este número para ajustar los elementos por página

  const handleShowModal = (id) => {
    setSelectedId(id);
    setIdd(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId('');
  };
  
  const handleShowModal2 = (id) => {
    setSelectedId2(id);
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
    setSelectedId2('');
  };

  const handleContinue = () => {
    const token = localStorage.getItem('token');
    fetch(`${apiUrl}/usuario/borrarPreregistro/${idd}`, {
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
      .then(datos =>{
        window.location.href = `/preregistro/${data[0].idUser}`;
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  };

  // Filtra los datos según el término de búsqueda
  const filteredData = data.filter(item => {
    const normalizeDate = (dateString) => {
      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const [day, month, year] = dateString.split('/');
      const monthIndex = months.indexOf(month);
      return new Date(year, monthIndex, day);
    };

    // Normaliza el término de búsqueda como fecha
    const normalizedSearchTerm = normalizeDate(searchTerm);

    // Verifica si el término de búsqueda coincide con el formato de fecha DD/Mes/YYYY
    if (!isNaN(normalizedSearchTerm.getTime())) {
      const normalizedLastUpdate = normalizeDate(item.lastUpdate);
      const normalizedSendDate = normalizeDate(item.sendDate);
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (normalizedLastUpdate.getTime() === normalizedSearchTerm.getTime()) ||
        (normalizedSendDate.getTime() === normalizedSearchTerm.getTime())
      );
    } else {
      return item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Paginación
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
    switch (status) {
      case 2:
        window.location.href = `/continuar_solicitud1/${id}`;
        break;
      case 3:
        window.location.href = `/continuar_solicitud2/${id}`;
        break;
      case 5:
        window.location.href = `/solicitud-concluida-usuario/${id}`;
        break;
      default:
        break;
    }
  };

  const renderButton = (id, estatusTramite) => {
    if (estatusTramite === 1) {
      return (
        <button
          className='boton2'
        >
          Sin acciones
        </button>
      );
    } else {
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
          placeholder="Buscar..."
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
            <th>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
                <td>{item.status}</td>
                <td>{item.createdAt}</td>
                <td>{renderButton(item.id, item.estatusTramite)}</td>
                <td>
                  <Button
                    className='boton-tabla'
                    variant="primary"
                    onClick={() => handleShowModal(item.id)}
                    disabled={item.estatusTramite > 1}  // Deshabilitar botón si estatusTramite > 1
                  >
                    {item.estatusTramite > 1 ? 'No disponible' : 'Actualizar'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron registros</td>
            </tr>
          )}
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: '3em' }}>¿Seguro que quiere actualizar esta solicitud?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Se tendrán que introducir nuevamente todos los datos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Atrás
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal2 */}
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: '3em' }}>¿Seguro que quiere eliminar esta solicitud?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Atrás
          </Button>
          <Button variant="primary">
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tabla_Solicitudes_Usuario;
