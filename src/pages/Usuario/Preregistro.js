import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../css/Preregistro.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';
import '../../css/sweetalert_tuneado_veda.min.css'
import Swal from 'sweetalert2'

  
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


  // Estados para almacenar los valores del formulario de preregistro  
  const [ArchivoINE, setArchivoINE] = useState(null);
  const [ArchivoComprobanteDomicilio, setArchivoComprobanteDomicilio] = useState(null);
  const [ArchivoCURP, setArchivoCURP] = useState(null);
  const [ArchivoRFC, setArchivoRFC] = useState(null);
  const [ArchivoAval, setArchivoAval] = useState(null);
  const [ArchivoCredencialNotario, setArchivoCredencialNotario] = useState(null);
  const [isServer, setIsServer] = useState(false);
  const [isNotary, setIsNotary] = useState(false);
  const [isNuevo, setIsNuevo] = useState(false);
  const [isRenovacion, setIsRenovacion] = useState(false);
  const [secretaria, setSecretaria] = useState('');
  const [tipoEntidad, setTipoEntidad] = useState('');
  const [entidad, setEntidad] = useState('');

 
  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [municipio_direccion, setMunicipio_Direccion] = useState('');
  const [estado, setEstado] = useState('');
  const [cp, setcp] = useState('');
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
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
 

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];
    const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
  
    if (selectedVideo.size > fileSizeLimit) {
      setError('El tamaño del video excede el límite permitido (10MB).');
      setVideo(null); // Para eliminar el archivo seleccionado si excede el límite
    } else {
      setVideo(selectedVideo);
      setError('');
    }
  };


  // Funciones para manejar cambios en los inputs
  const handleArchivoINEChange = (e) => {
    setArchivoINE(e.target.files[0]);
  };
  const handleArchivoComprobanteDomicilioChange = (e) => {
    setArchivoComprobanteDomicilio(e.target.files[0]);
  };
  const handleArchivoCURPChange = (e) => {
    setArchivoCURP(e.target.files[0]);
  };
  const handleArchivoRFCChange = (e) => {
    setArchivoRFC(e.target.files[0]);
  };
  const handleArchivoAvalChange = (e) => {
    setArchivoAval(e.target.files[0]);
  };
  const handleArchivoCredencialNotarioChange = (e) => {
    setArchivoCredencialNotario(e.target.files[0]);
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
    Swal.fire({
      title: "Usuario Registrado",
      text: "Revise su bandeja de entrada para terminar de crear su cuenta.",
      icon: "success"
    });
    console.log('Formulario enviado');
  };

  return (
    <div className="contenedor">
      <Heder />
      <div className="titulo_3">
        Ingrese sus Datos
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className="custom-file-label">
        Seleccionar Archivo
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="custom-file-input"
        />
      </label>
      {video && (
        <div style={{ color: error ? 'red' : 'gray', marginLeft: '2%' }}>
          Video seleccionado: {video.name}
        </div>
      )}
      {error && <div style={{ color: 'red', marginLeft: '2%' }}>{error}</div>}
    </div>

        <form onSubmit={handleSubmit}>
        <div className='titulo_formulario'>
          2.- Proporcione los siguientes documentos
        </div>

        <div className='text_formulario'>
        El formato permitido para los archivos es: .pdf (se permite hasta 1MB en total para los archivos).
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Indentificación Oficial con Fotografía</span>
        (INE, pasaporte, cédula profesional)
        </div>
        
        <div className="files">
            <label className="custom-file-label" style={{ marginTop: '6%' }}>
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleArchivoINEChange} 
                className="custom-file-input"
          
                />
            </label>
            {ArchivoINE ? <span className="file-name">{ArchivoINE.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
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
                onChange={handleArchivoComprobanteDomicilioChange} 
                className="custom-file-input"
          
                />
            </label>
            {ArchivoComprobanteDomicilio ? <span className="file-name">{ArchivoComprobanteDomicilio.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
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
                onChange={handleArchivoCURPChange} 
                className="custom-file-input"
          
                />
            </label>
            {ArchivoCURP ? <span className="file-name">{ArchivoCURP.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
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
                onChange={handleArchivoRFCChange} 
                className="custom-file-input"
        
                />
            </label>
            {ArchivoRFC ? <span className="file-name">{ArchivoRFC.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Documento que lo Avala como Servidor Público o Notario Público Vigente</span>
       
        </div>

        <div className="files">
            <label className="custom-file-label">
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleArchivoAvalChange} 
                className="custom-file-input"
            
                />
            </label>
            {ArchivoAval ? <span className="file-name">{ArchivoAval.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
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
                  onChange={handleArchivoCredencialNotarioChange} 
                  className="custom-file-input"
              
                />
              </label>
              {ArchivoCredencialNotario ? <span className="file-name">{ArchivoCredencialNotario.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}   
            </div>
          </div>
        )}
        
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Secretaria</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '96%', marginBottom:'1%' }} type="text" value={secretaria} onChange={(e) => setSecretaria(e.target.value)} placeholder="Secretaria" />
        </div>
      
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Dependencia/Ayuntamiento/Organismo/Notaría Pública</span>  
        </div>
       
        <div className="select">
        <select style={{ marginRight: '2%', width:'48%' }} value={tipoEntidad} onChange={(e) => setTipoEntidad(e.target.value)} >
        <option value="">Seleccione la entidad que le corresponda</option>
        <option value="1">Dependencia</option>
        <option value="2">Ayuntamiento</option>
        <option value="3">Organismo</option>
        <option value="4">Notaría Pública</option>
        {/* Agrega las opciones que necesites */}
      </select>

      <input type="text" value={entidad} onChange={(e) => setEntidad(e.target.value)} placeholder="Escriba el nombre de su entidad" />
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
         <input style={{ width: '29%', marginBottom:'1%', marginRight:'2%' }} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
         <input style={{ width: '29%', marginBottom:'1%', marginRight:'2%' }} type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} placeholder="  Apellido Paterno" />
         <input style={{ width: '29%', marginBottom:'1%' }} type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} placeholder="  Apellido Materno" />
        </div>

        <div className='titulo_formulario'>
          3.- Dirección como aparece en comprobante de domicilio
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Calle, Número Interior o Exterior y Colonia o Barrio</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '96%', marginBottom:'1%' }} type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, Número interior o Exterior y Colonia o Barrio" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Municipio/Estado/Código Postal</span>  
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

         <input style={{ width: '46%' }} type="text" value={cp} onChange={(e) => setcp(e.target.value)} placeholder="Codigo Postal" />
        </div>

        <div className='titulo_formulario'>
          4.- Información Personal
        </div>
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Puesto/Área</span>  
        </div>

        <div className="select">
          <select style={{ marginRight: '2%', width: '48%' }} value={puesto} onChange={(e) => setPuesto(e.target.value)}>
            <option value="">Puesto</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

          <select style={{ width: '48%'  }} value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Área</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Teléfono  </span> 
        (10 digitos)
        <span style={{ fontWeight: 'bold' }}>/Extensión</span> 
        </div>

        <div className="inputs">
          <input style={{ width: '62%', marginRight: '2%' }} type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
          <input style={{ width: '30%' }} type="text" value={extencion} onChange={(e) => setExtencion(e.target.value)} placeholder="Extensión" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Correo Electrónico  </span> 
        (debe ser personal)
        <span style={{ fontWeight: 'bold' }}>/Confirme su Correo Electrónico</span> 
        </div>

        <div className="inputs">
          <input style={{  marginRight: '2%' }} type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder=" Correo" />
          <input type="text" value={confirma_correo} onChange={(e) => setConfirma_Correo(e.target.value)} placeholder="Confirme su correo" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Contraseña/ Confirme su Contraseña  </span> 
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
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atrás</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleSubmit}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>
    </div>
  );
}

export default Preregistro;
