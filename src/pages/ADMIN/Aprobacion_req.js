import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import axios from 'axios';
import '../../css/Aprobacion_Req.css';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function Aprobacion_Req() {

  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const [isReq, setIsReq] = useState(false);
  const [archivo, setArchivo] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [NSCertificado, setNSCertificado] = useState('');
  const [Vigencia_Inicio, setVigencia_Inicio] = useState('');
  const [Vigencia_Fin, setVigencia_Fin] = useState('');
  const [isCertificado_Autoridad, setIsCertificado_Autoridad] = useState(false);
  const [isCertificado_Personal, setIsCertificado_Personal] = useState(false);
  const [isArchivo_p12, setIsArchivo_p12] = useState(false);
  const [isArchivo_key, setIsArchivo_key] = useState(false);
  const [preregistroId, setPreregistroId] = useState(id);


   // Función para cargar el PDF correspondiente desde la API
   const cargarPDF = (archivoSeleccionado) => {
    // Aquí realizas la petición a tu API para obtener el PDF
    // Reemplaza 'URL_DE_TU_API' por la URL correspondiente a tu API
    fetch(`${apiUrl}/admin/returnFile/${id}/${archivoSeleccionado}`)
      .then(response => response.blob())
      .then(blob => {
        // Establece el Blob del PDF en el estado
        setPdfBlob(blob);
      })
      .catch(error => console.error('Error al obtener el PDF:', error));
  };

  // Cargar el PDF inicialmente según la opción seleccionada
  useEffect(() => {
    cargarPDF('solicitud_requerimiento')
  }, [archivo]);

  // Función para manejar el cambio de opción en el select
  const handleChangeSelect = (e) => {
    setArchivo(e.target.value);
  };

  // Función para verificar si todas las casillas de verificación están marcadas
  const todasSeleccionadas = () => {
    // Verificar el estado de todas las variables de estado y devolver true si todas están marcadas
    return isReq /* Agregar el resto de tus variables de estado */;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        id: preregistroId,
        comentarios,
        NSCertificado,
        Vigencia_Inicio,
        Vigencia_Fin,
        isReq,
        isCertificado_Autoridad,
        isCertificado_Personal,
        isArchivo_p12,
        isArchivo_key,
    };

    try {
        const response = await axios.post(`${apiUrl}/admin/actualizarReq`, data);
        console.log('Formulario enviado', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Formulario enviado correctamente',
      }).then(() => {
          // Redirige a la página de solicitudes después de mostrar la alerta de éxito
          window.location.href = '/admin&solicitudes';
      });
        handleCloseModal();
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.',
      });
    }
};

const handleDownloadReq = async () => {
  try {
      const response = await axios.get(`${apiUrl}/admin/descargarReq/${preregistroId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivo.req');
      document.body.appendChild(link);
      link.click();
  } catch (error) {
      console.error('Error al descargar el archivo .req:', error);
  }
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
  window.location.href = '/admin&solicitudes'; 
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
            Aprobación .Req
          </div>
          <div className='text_2'>
          Verifique que el archivo .req contenga los datos correctos, apegados a los campos de los documentos recibidos.<br></br>
          Si el archivo es correcto, seleccione el campo de aprobar y se enviarán carta responsiva, manuales y llaves.
          </div>
        </div>
      </div>

      <div className="container444">
        
        <div className="content22">
        
        <div style={{ display: 'flex' }}>
        <Button className="boton-req" variant="primary" onClick={handleDownloadReq}>Descargar .req</Button>         
        </div>

          <div className='pdf_contenedor22'>
            {/* Mostrar el PDF si hay un Blob */}
            {pdfBlob && <embed src={URL.createObjectURL(pdfBlob)} type="application/pdf" width="100%" height="120%" />}
          </div>

          <div className="inputs">
            <textarea className='comentarios' value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Comentarios" />
          </div>

        <div className='text_formulario9'>
        <span style={{ fontWeight: 'bold' }}>Vigencia Inicio</span>  
        </div>

          <div className="inputs" style={{ display: 'flex' }} >
          <input style={{ width: '35%', marginRight:'11%' }} type="date" value={Vigencia_Inicio} onChange={(e) => setVigencia_Inicio(e.target.value)} placeholder="De:" />
          <input style={{ width: '35%' }} type="text" value={NSCertificado} onChange={(e) => setNSCertificado(e.target.value)} placeholder="Número de Serie del Certificado" />
        </div>

        <div className='text_formulario9'>
        <span style={{ fontWeight: 'bold' }}>Vigencia Fin</span>
        </div>

        <div className="inputs" style={{ display: 'flex', marginBottom:'2%' }} >
          <input style={{ width: '35%', marginRight:'11%' }} type="date" value={Vigencia_Fin} onChange={(e) => setVigencia_Fin(e.target.value)} placeholder="A:" />
        
          <div className="checkboxes">
              <label className="checkbox-label">
                  <input type="checkbox" checked={isReq} onChange={() => setIsReq(!isReq)} />
                  <span className="checkbox-text" >Aprobar archivo.</span>
              </label>    
          </div>
        </div>


        <div className="checkboxes">
              <label className="checkbox-label">
                  <input type="checkbox" checked={isCertificado_Autoridad} onChange={() => setIsCertificado_Autoridad(!isCertificado_Autoridad)} />
                  <span className="checkbox-text" >Certificado Digital de la Autoridad Certificadora de Firma Electrónica Avanzada</span>
              </label>    
          </div>
          <div className="checkboxes">
              <label className="checkbox-label">
                  <input type="checkbox" checked={isCertificado_Personal} onChange={() => setIsCertificado_Personal(!isCertificado_Personal)} />
                  <span className="checkbox-text" >Certificado Digital de Firma Electrónica Avanzada Personal</span>
              </label>    
          </div>
          <div className="checkboxes">
              <label className="checkbox-label">
                  <input type="checkbox" checked={isArchivo_p12} onChange={() => setIsArchivo_p12(!isArchivo_p12)} />
                  <span className="checkbox-text" >Archivo PKCS12 (*.pfx o *.p12)</span>
              </label>    
          </div>
          <div className="checkboxes">
              <label className="checkbox-label">
                  <input type="checkbox" checked={isArchivo_key} onChange={() => setIsArchivo_key(!isArchivo_key)} />
                  <span className="checkbox-text" >Archivo *.KEY</span>
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
    <Modal.Title className='titulo_modal'>¿Seguro que quiere enviar carpeta al usuario?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className='texto_modal'>Incluye carta responsiva, manuales y .cer</p>
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
    <Button  className="boton_modal" variant="primary" onClick={handleNoSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>


    </div>
  );
}

export default Aprobacion_Req;
