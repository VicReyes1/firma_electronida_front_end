

import React, { useState, useRef } from 'react';
import '../../css/Preregistro.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';

function CameraModal({ onClose }) {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const videoRef = useRef(null);
  
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const recorder = new MediaRecorder(stream);
  
        recorder.ondataavailable = (e) => {
          // Handle data available event
        };
  
        recorder.onstop = () => {
          // Handle recorder stop event
          onClose();
        };
  
        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error al acceder a la cámara: ', error);
      }
    };
  
    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setRecording(false);
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  
    return (
      <div className="camera-modal">
        <div className="camera-preview">
          <video ref={videoRef} autoPlay muted playsInline />
        </div>
        <div className="controls">
          {!recording ? (
            <button onClick={startRecording}>Iniciar Grabación</button>
          ) : (
            <button onClick={stopRecording}>Detener Grabación</button>
          )}
        </div>
      </div>
    );
  }

  
function Preregistro() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {
        setModalOpen(false);
      };
    
      const handleOpenModal = () => {
        setModalOpen(true);
      };

   
    const [showNotaryCredentials, setShowNotaryCredentials] = useState(false);
    const [showRenovacionCredentials, setShowRenovacionCredentials] = useState(false);

    const handleNotaryCheckboxChange = (e) => {
      const isChecked = e.target.checked;
      setIsNotary(isChecked);
      setShowNotaryCredentials(isChecked);
    };
    const handleNotaryCheckboxChange2 = (e) => {
        const isChecked = e.target.checked;
        setIsRenovacion(isChecked);
        setShowRenovacionCredentials(isChecked);
      };


  // Estados para almacenar los valores de los inputs
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [isServer, setIsServer] = useState(false);
  const [isNotary, setIsNotary] = useState(false);
  const [isNuevo, setIsNuevo] = useState(false);
  const [isRenovacion, setIsRenovacion] = useState(false);
  const [razonSocial, setRazonSocial] = useState('');
  const [nombre, setNombre] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');

  // Funciones para manejar cambios en los inputs
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
  const handleFile5Change = (e) => {
    setFile5(e.target.files[0]);
  };
  const handleFile6Change = (e) => {
    setFile5(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el video grabado al servidor
    console.log('Video grabado');
  };

  return (
    <div className="contenedor">
      <Heder />
      <div className="titulo_3">
        Ingresa tus Datos
      </div>

      <div className='formulario'>

        <div className='titulo_formulario'>
          1.- Video de Identificación
        </div>

        <div className='text_formulario'>
          Video con fondo blanco donde el solicitante establece nombre, posición y dependencia.
        </div>

        <div className='text_inputs'>
          Video.
          <button className="botonn" onClick={handleOpenModal}>Abrir Cámara</button>
        </div>

        <form onSubmit={handleSubmit}>
        <div className='titulo_formulario'>
          2.- Proporcione los siguientes documentos
        </div>

        <div className='text_formulario'>
        El formato permitido para los archivos es: .pdf (se permiten hasta 1MB en total para los archivos).
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Indentidicación Oficial con fotografía</span>
        (INE, pasaporte, cédula profesional)
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
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Comprobante de Domicilio Laboral no mayor a 3 meses</span>
        (Recibo de Teléfono, Agua Potable o Luz)
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
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Clave Única de Registro de Población</span>
        (CURP) Vigente
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
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Registro Federal de Contribuyentes expedido por el SAT</span>
        (RFC)
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
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Documento que lo Avala como Servidor Público o Notario Público Vigente</span>
       
        </div>

        <div className="files">
            <label className="custom-file-label">
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleFile5Change} 
                className="custom-file-input"
                />
            </label>
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Trámite de Certificación Digital</span>  
        </div>
        
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isNuevo} onChange={() => setIsServer(!isNuevo)} />
                <span className="checkbox-text">Nuevo</span>
            </label>
            <label className="checkbox-label">
                <input type="checkbox" checked={isRenovacion} onChange={handleNotaryCheckboxChange2} />
                <span className="checkbox-text">Renovación</span>
            </label>
        </div>
        {isRenovacion && (
              <div>
              <div className="text_formulario">
                <span style={{ fontWeight: 'bold' }}>Causa de Solicitud</span>
              </div>

              <div className="inputs">
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Causa" />
               
               </div>
  
             
            </div>
          )}

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Persona</span>  
        </div>
        
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isServer} onChange={() => setIsServer(!isServer)} />
                <span className="checkbox-text">Servidor Público</span>
            </label>
         
          <label className="checkbox-label">
            <input type="checkbox" checked={isNotary} onChange={handleNotaryCheckboxChange} />
            <span className="checkbox-text">Notario Público</span>
          </label>
        </div>

        {isNotary && (
          <div>
            <div className="text_formulario">
              <span style={{ fontWeight: 'bold' }}>Credencial de Notario Público</span>
            </div>

            <div className="files">
              <label className="custom-file-label">
                Seleccionar Archivo
                <input 
                  type="file" 
                  onChange={handleFile6Change} 
                  className="custom-file-input"
                />
              </label>
              {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
            </div>
          </div>
        )}
        
      

       
        <div className="select">
          <select value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>
        </div>

        <div className="inputs">
          <input style={{ marginRight: '2%' }} type="text" value={curp} onChange={(e) => setCurp(e.target.value)} placeholder="CURP" />
          <input type="text" value={rfc} onChange={(e) => setRfc(e.target.value)} placeholder="RFC" />
        </div>
        <div className="inputs">
         <input style={{ width: '100%' }} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />

          
        </div>

        <button type="submit">Enviar</button>
         </form>
      </div>
      {modalOpen && <CameraModal onClose={handleModalClose} />}
      
    </div>
  );
}

export default Preregistro;
