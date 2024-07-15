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
          console.log(data);
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

  const handleShowModal = (id) => {
    setSelectedId(id);
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
    window.location.href = `/preregistro22`;
  };

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
    if (status === 3) {
      window.location.href = `/continuar_solicitud2/${id}`;
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
            <th>Actualizar</th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
              <td>{item.status}</td>
              <td>{item.createdAt}</td>
              <td>
                {renderButton(item.id, item.estatusTramite)}
              </td>
              <td>
                <Button className='boton-tabla' variant="primary" onClick={() => handleShowModal(item.id)}>Actualizar</Button>
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
          <Button variant="primary" >
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tabla_Solicitudes_Usuario;
