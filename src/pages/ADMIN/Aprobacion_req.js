import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import axios from 'axios';
import '../../css/Aprobacion_Req.css';
import generatePDF from './generaCarta'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function Aprobacion_Req() {

  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

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

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
};
  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };
  const handleFile3Change = (e) => {
    setFile3(e.target.files[0]);
  };
  const handleFile4Change = (e) => {
    setFile4(e.target.files[0]);
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
        console.log(id);
        const pdfCarta = await generatePDF(id);
        const documentos = [];
        documentos[0]=(file1)
        documentos[1]=(file2)
        documentos[2]=(file3)
        documentos[3]=(file4)
        documentos[4]=(pdfCarta)
        //documentos.push(ArchivoAval)
        console.log(documentos)
        console.log('Formulario enviado', response.data);
        const f = new FormData()
        
        documentos.forEach((documento, index) => {
          if (documento) {
            f.append(`file${index}`, documento); // Nombres de campo únicos
          } else {
            f.append(`file${index}`, new Blob(), { type: 'application/pdf' }); // Enviar un Blob vacío si no hay archivo
          }
        });
        
        f.append("id",id)

        const response2 = await axios.post(`${apiUrl}/admin/subirCertificados/${id}`, f,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Formulario2 enviado', response2.data);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Carta de Responsabilidad enviada al solicitantee',
      }).then(() => {
          // Redirige a la página de solicitudes después de mostrar la alerta de éxito
          window.location.href = '/admin&solicitudes';
      });
        //handleCloseModal();
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

fetch(`${apiUrl}/admin/enviaComentarioReq/${id}`, {
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
          Aprobación de Solicitud
de Certificado digital y .Req
          </div>
          <div className='text_2'>
          Verifique la identidad del solicitante del trámite; la solicitud que
contenga la firma (autógrafa) y lo más parecida a su documento de
identificación oficial, que el archivo .req contenga los datos correctos,
apegados a los campos de los documentos recibidos.<br></br>
Si los archivos son correctos, seleccione el campo de aprobar y se
enviarán carta de confidencialidad y responsabilidad, manuales y
certificados digitales..
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

        <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>Certificado Digital de la Autoridad Certificadora de Firma Electrónica Avanzada</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile1Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file1 ? <span className="file-name">{file1.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
          </div>

          <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>Certificado Digital de Firma Electrónica Avanzada Personal</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile2Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file2 ? <span className="file-name">{file2.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
          </div>

          <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>Archivo PKCS12 (*.pfx o *.p12)</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile3Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file3 ? <span className="file-name">{file3.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
          </div>

          <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>Archivo *.KEY</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile4Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file4 ? <span className="file-name">{file4.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
          </div>
        <br/>
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
