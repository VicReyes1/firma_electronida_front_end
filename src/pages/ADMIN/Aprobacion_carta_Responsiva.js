import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import '../../css/Aprobacion_Req.css';
import { Link, useParams } from 'react-router-dom'; 
import Swal from 'sweetalert2';

function Aprobacion_Carta() {
  const [isCartaAprobacion, setIsCartaAprobacion] = useState(false);
 
  const [archivo, setArchivo] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');


   // Función para cargar el PDF correspondiente desde la API
   const cargarPDF = () => {
    // Aquí realizas la petición a tu API para obtener el PDF
    // Reemplaza 'URL_DE_TU_API' por la URL correspondiente a tu API
    fetch(`${apiUrl}/admin/returnFile/${id}/carta_responsiva`)
        .then(response => response.blob())
        .then(blob => {
          setPdfBlob(URL.createObjectURL(blob));
        }).catch(error => console.error('Error al cargar el archivo:', error));
  };

  // Cargar el PDF inicialmente según la opción seleccionada
  useEffect(() => {
    cargarPDF();
  }, [archivo]);

  // Función para manejar el cambio de opción en el select
  const handleChangeSelect = (e) => {
    setArchivo(e.target.value);
  };

   // Función para verificar si todas las casillas de verificación están marcadas
   const todasSeleccionadas = () => {
    // Verificar el estado de todas las variables de estado y devolver true si todas están marcadas
    return isCartaAprobacion  /* Agregar el resto de tus variables de estado */;
  };

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal = () => {
    setShowModal1(false);
    setShowModal2(false);
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/admin/apruebaCarta/${id}`;

    const body = JSON.stringify({
        aceptado: true,
        comentarios: comentarios
    });
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body
      });

      if (!response.ok) {
          const errorData = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error.',
        });
          console.error('Error en la solicitud:', errorData);
      } else {
          const data = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.message,
        }).then(() => {
            window.location.href = '/admin&solicitudes';
        });
          console.log('Solicitud exitosa:', data);
      }
  } catch (error) {
      console.error('Error al aprobar la carta:', error);
  }

    // Aquí puedes enviar el formulario
    console.log('Formulario enviado');
  };
  const handleNoSubmit = (e) => {
    e.preventDefault();
    
    console.log('Formulario no enviado');
    const json = {
      comentario: comentarios,
      id: id
  };

  fetch(`${apiUrl}/admin/enviaComentario/${id}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
      },
      body: JSON.stringify(json)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      Swal.fire({
          title: "Formulario Enviado",
          text: "Se han enviado las correcciones al usuario",
          icon: "success"
      });
      console.log('Formulario enviado', data);
  }).then(() => {
    // Redireccionar después de cerrar el SweetAlert
    window.location.href = '/admin&solicitudes'; // Reemplaza '/nueva-ruta' con la ruta deseada
  })
  .catch(error => {
      Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el formulario",
          icon: "error"
      });
      console.error('Error fetching data:', error);
  });
  };

  return (
    <div>
      <Heder />
      <div className="container2">
        <div className='titulo-container'>
          <div className='titulo_2'>
          Aprobación Carta Responsiva
          </div>
          <div className='text_2'>
          Verifique que la carta responsiva se encuentre firmada<br></br>
          Si el archivo es correcto, seleccione el campo de aprobar y se dará por terminado el proceso.
          </div>
        </div>
      </div>

      <div className="container444">
        
        <div className="content22">
           
          {/*<select className='select2' style={{ marginRight: '2%' }} value={archivo} onChange={handleChangeSelect}>
            <option value="">INE</option>
            <option value="">Comprobante de domicilio</option>
            <option value="">CURP</option>
            <option value="">RFC</option>
            <option value="">Aval como Servidor Público o Notario Público</option>
          </select>*/}


          <div className='pdf_contenedor22'>
            {/* Mostrar el PDF si hay un Blob */}
            {pdfBlob && <embed src={pdfBlob} type="application/pdf" width="100%" height="600px" />}
          </div>

          <div className="inputs" style= {{marginBottom: '2%'}}>
            <textarea className='comentarios' value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Comentarios" />
          </div>

          <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isCartaAprobacion} onChange={() => setIsCartaAprobacion(!isCartaAprobacion)} />
                <span className="checkbox-text">Carta Responsiva</span>
            </label>    
          </div>

          <Button className="boton_envio2" onClick={todasSeleccionadas() ? handleShowModal1 : handleShowModal2}>
          Siguiente
        </Button>

        </div>
      </div>

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
    <Modal show={showModal1} onHide={handleCloseModal} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>¿Seguro que quiere finalizar proceso?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className='texto_modal'>Todos los archivos serán guardados en la base de datos.</p>
  </Modal.Body>
  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atras</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>

    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
    <Modal show={showModal2} onHide={handleCloseModal} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>Se notificará al solicitante que la Carta de Confidencialidad y Responsabilidad es incorrecta</Modal.Title>
  </Modal.Header>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atras</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleNoSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>


    </div>
  );
}

export default Aprobacion_Carta;
