import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import '../../css/Aprobacion_Req.css';

function Aprobacion_Carta() {
  const [isCartaAprobacion, setIsCartaAprobacion] = useState(false);
 
  const [archivo, setArchivo] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);


   // Función para cargar el PDF correspondiente desde la API
   const cargarPDF = (archivoSeleccionado) => {
    // Aquí realizas la petición a tu API para obtener el PDF
    // Reemplaza 'URL_DE_TU_API' por la URL correspondiente a tu API
    fetch(`URL_DE_TU_API?archivo=${archivoSeleccionado}`)
      .then(response => response.blob())
      .then(blob => {
        // Establece el Blob del PDF en el estado
        setPdfBlob(blob);
      })
      .catch(error => console.error('Error al obtener el PDF:', error));
  };

  // Cargar el PDF inicialmente según la opción seleccionada
  useEffect(() => {
    if (archivo) {
      cargarPDF(archivo);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario
    console.log('Formulario enviado');
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
          Verifique que el archivo .req contenga los datos correctos, apegados a los campos de los documentos recibidos.<br></br>
          Si el archivo es correcto, seleccione el campo de aprobar y se dará por terminado el proceso.
          </div>
        </div>
      </div>

      <div className="container444">
        
        <div className="content22">
           
          <select className='select2' style={{ marginRight: '2%' }} value={archivo} onChange={handleChangeSelect}>
            <option value="">INE</option>
            <option value="">Comprobante de domicilio</option>
            <option value="">CURP</option>
            <option value="">RFC</option>
            <option value="">Aval como Servidor Público o Notario Público</option>
          </select>


          <div className='pdf_contenedor22'>
            {/* Mostrar el PDF si hay un Blob */}
            {pdfBlob && <embed src={URL.createObjectURL(pdfBlob)} type="application/pdf" width="100%" height="600px" />}
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
    <Modal.Title className='titulo_modal'>¿Seguro que quiere regresar el formulario al usuario?</Modal.Title>
  </Modal.Header>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atras</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>


    </div>
  );
}

export default Aprobacion_Carta;
