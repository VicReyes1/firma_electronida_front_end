import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
  const [file6, setFile6] = useState(null);
  const [isServer, setIsServer] = useState(false);
  const [isNotary, setIsNotary] = useState(false);
  const [isNuevo, setIsNuevo] = useState(false);
  const [isRenovacion, setIsRenovacion] = useState(false);
  const [dependencia, setDependencia] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [notaria, setNotaria] = useState('');
  const [organismo, setOrganismo] = useState('');
  const [nombre, setNombre] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [municipio_direccion, setMunicipio_Direccion] = useState('');
  const [estado, setEstado] = useState('');
  const [codigoP, setCodigoP] = useState('');
  const [puesto, setPuesto] = useState('');
  const [area, setArea] = useState('');
  const [telefono, setTelefono] = useState('');
  const [extencion, setExtencion] = useState('');
  const [correo, setCorreo] = useState('');
  const [confirma_correo, setConfirma_Correo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirma_contrasena, setConfirma_Contrasena] = useState('');
  const [isUso, setIsUso] = useState(false);
  const [isPoliticas, setIsPoliticas] = useState(false);
  const [isRevocacion, setIsRevocacion] = useState(false);
 

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
    setFile6(e.target.files[0]);
  };

  const [organismosDisponibles, setOrganismosDisponibles] = useState([]);
  const handleDependenciaChange = (e) => {
    const selectedDependencia = e.target.value;
    setDependencia(selectedDependencia);
    // Aquí puedes definir la lógica para cargar los organismos disponibles según la dependencia seleccionada
    if (selectedDependencia === '1') {
      setOrganismosDisponibles(['Innovación Gubernamental', 'Contraloria', 'Prensa']);
    } else if (selectedDependencia === '2') {
      setOrganismosDisponibles(['organismo4', 'organismo5', 'organismo6']);
    } else {
      setOrganismosDisponibles([]);
    }
    // Resetear el valor seleccionado del organismo
    setOrganismo('');
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario
    console.log('Formulario enviado');
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

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Video.</span>
        </div>
        <button className="botonn" onClick={handleOpenModal}>Abrir Cámara</button>

        <form onSubmit={handleSubmit}>
        <div className='titulo_formulario'>
          2.- Proporcione los siguientes documentos
        </div>

        <div className='text_formulario'>
        El formato permitido para los archivos es: .pdf (se permiten hasta 1MB en total para los archivos).
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Indentidicación Oficial con fotografía</span>
        (INE, pasaporte, cédula profesional)
        </div>
        
        <div className="files">
            <label className="custom-file-label" style={{ marginTop: '6%' }}>
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleFile1Change} 
                className="custom-file-input"
          
                />
            </label>
             {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold', marginBottom:'2%' }}>Comprobante de Domicilio Laboral no mayor a 3 meses</span>
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

        <div className='text_pdf'>
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

        <div className='text_pdf'>
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

        <div className='text_pdf'>
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

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Trámite de Certificación Digital</span>  
        </div>
        
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isNuevo} onChange={() => setIsNuevo(!isNuevo)} />
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
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Causa" required/>
               
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
            <div className="text_pdf">
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
        
      
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Dependencia/Municipio/Organismo/Notaría Pública</span>  
        </div>
       
        <div className="select">
        <select style={{ marginRight: '2%' }} value={dependencia} onChange={handleDependenciaChange} >
        <option value="">Dependencia</option>
        <option value="1">Oficialia Mayor</option>
        <option value="2">Secretaría de Educación</option>
        {/* Agrega las opciones que necesites */}
      </select>

      <select style={{ marginRight: '2%' }} value={organismo} onChange={(e) => setOrganismo(e.target.value)} >
        <option value="">Organismo</option>
        {organismosDisponibles.map((organismo, index) => (
          <option key={index} value={organismo}>
            {organismo}
          </option>
        ))}
      </select>

          <select style={{ marginRight: '2%' }} value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
            <option value="">Prersidencia Municipal</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

          <select value={notaria} onChange={(e) => setNotaria(e.target.value)}>
            <option value="">Notaría Pública</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>
        </div>

        
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>CURP/RFC</span>  
        </div>

        <div className="inputs">
          <input style={{ marginRight: '2%' }} type="text" value={curp} onChange={(e) => setCurp(e.target.value)} placeholder="CURP" />
          <input type="text" value={rfc} onChange={(e) => setRfc(e.target.value)} placeholder="RFC" />
        </div>
        
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Nombre</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '98%', marginBottom:'1%' }} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        </div>

        <div className='titulo_formulario'>
          3.- Dirección como aparece en comprobante de domicilio
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Calle, Número interior o Exterior y Colonia o Barrio</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '98%', marginBottom:'1%' }} type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, Número interior o Exterior y Colonia o Barrio" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Municipio/Estado/Codigo Postal</span>  
        </div>
       
        <div className="select">
          <select style={{ marginRight: '2%' }} value={municipio_direccion} onChange={(e) => setMunicipio_Direccion(e.target.value)}>
            <option value="">Municipio</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

          <select style={{ marginRight: '2%' }} value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Estado</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

         <input style={{ width: '47%' }} type="text" value={codigoP} onChange={(e) => setCodigoP(e.target.value)} placeholder="Codigo Postal" />
        </div>

        <div className='titulo_formulario'>
          4.- Información Personal
        </div>
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Puesto/Área</span>  
        </div>

        <div className="select">
          <select style={{ marginRight: '2%', width: '49%' }} value={puesto} onChange={(e) => setPuesto(e.target.value)}>
            <option value="">Puesto</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

          <select style={{ width: '49%'  }} value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Área</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Telefono  </span> 
        (10 digitos)
        <span style={{ fontWeight: 'bold' }}>/Extensión</span> 
        </div>

        <div className="inputs">
          <input style={{ width: '62%', marginRight: '2%' }} type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" />
          <input style={{ width: '32%' }} type="text" value={extencion} onChange={(e) => setExtencion(e.target.value)} placeholder="Extensión" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Correo Electrónico  </span> 
        (debe ser personal)
        <span style={{ fontWeight: 'bold' }}>/Confirma tu Correo Electrónico</span> 
        </div>

        <div className="inputs">
          <input style={{  marginRight: '2%' }} type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder=" Email" />
          <input type="text" value={confirma_correo} onChange={(e) => setConfirma_Correo(e.target.value)} placeholder="Confirma tu correo" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Crea Tu Contraseña/ Confirma tu Contraseña  </span> 
        </div>

        <div className="inputs">
          <input style={{  marginRight: '2%' }} type="text" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder=" Contraseña" />
          <input type="text" value={confirma_contrasena} onChange={(e) => setConfirma_Contrasena(e.target.value)} placeholder="Confirma tu contraseña" />
        </div>

        <div className='text_advertencia'>
        <span>La contraseña deberá contener un mínimo de 8 y un máximo de 15 caracteres.</span> 
        </div>

        <div className='text_advertencia2'>
        <span>Utilizar letras y números, no debe usar caracteres especiales.</span> 
        </div>

        <div style={{  marginTop: '2%' }} className="checkboxes">
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isUso} onChange={() => setIsUso(!isUso)} />
                <span className="checkbox-text">He leído y acepto la Responsabilidad del uso de la Firma Electrónica.</span>
            </label>
        </div>
        <div className="checkboxes">
            <label style={{  fontSize: '0.7em', }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isPoliticas} onChange={() => setIsPoliticas(!isPoliticas)} />
                <span className="checkbox-text">He leído y acepto las políticas de Aviso de Privacidad.</span>
            </label>
        </div>
        <div className="checkboxes">
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isRevocacion} onChange={() => setIsRevocacion(!isRevocacion)} />
                <span className="checkbox-text">He leído y acepto la Responsabilidad de la Revocación del Certificado de Firma Electrónica.</span>
            </label>
        </div>
        

        <Button className="boton_envio" onClick={handleShowModal}>
          Siguiente
        </Button>
         </form>
        
       

      
      </div>
      {modalOpen && <CameraModal onClose={handleModalClose} />}
     
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
  <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>¿Seguro que quiere enviar el formulario?</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p className='texto_modal'>Asegúrese de que sus datos estén correctos.</p>
  </Modal.Body>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atras</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>
    </div>
  );
}

export default Preregistro;
