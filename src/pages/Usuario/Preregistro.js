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
  const [correosCoinciden, setCorreosCoinciden] = useState(true);

  const [contrasena, setContrasena] = useState('');
  const [confirma_contrasena, setConfirma_Contrasena] = useState('');
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmaContrasena, setMostrarConfirmaContrasena] = useState(false);

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

  const [showPwd, setShowPwd] = useState(false)

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

        <div className='text_formulario' style={{ fontWeight:'bold' }}>
          Video con fondo blanco donde el solicitante establece nombre, posición y dependencia.
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
        El formato permitido para los archivos es .pdf (se permite hasta 1MB en total para todos los archivos).
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Indentificación Oficial con Fotografía</span>
        (INE, Pasaporte, Cédula Profesional)
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
        <span style={{ fontWeight: 'bold' }}>Secretaría</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '96%', marginBottom:'1%' }} type="text" value={secretaria} onChange={(e) => setSecretaria(e.target.value)} placeholder="Secretaría" />
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
        <span style={{ fontWeight: 'bold' }}>Nombre</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '29%', marginBottom:'1%', marginRight:'2%' }} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
         <input style={{ width: '29%', marginBottom:'1%', marginRight:'2%' }} type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} placeholder="  Apellido Paterno" />
         <input style={{ width: '29%', marginBottom:'1%' }} type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} placeholder="  Apellido Materno" />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>CURP/RFC</span>  
        </div>

        <div className="inputs">
        <input
          style={{ marginRight: '2%' }}
          type="text"
          value={curp}
          onChange={(e) => {
            const value = e.target.value.slice(0, 18).toUpperCase(); // Limita el valor a 18 caracteres y convierte a mayúsculas
            setCurp(value);
          }}
          maxLength={18} // Restringe la entrada a 18 caracteres
          placeholder="CURP"
        />
        <input
          style={{ marginRight: '2%' }}
          type="text"
          value={rfc}
          onChange={(e) => {
            const value = e.target.value.slice(0, 13).toUpperCase(); // Limita el valor a 18 caracteres y convierte a mayúsculas
            setRfc(value);
          }}
          maxLength={18} // Restringe la entrada a 18 caracteres
          placeholder="RFC"
        />
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
            <option value="">Acatl\u00e1n</option>
            <option value="">Selecciona una opción</option>
            <option value="">Selecciona una opción</option>
            {/* Agrega las opciones que necesites */}
          </select>

          <select style={{ marginRight: '2%' }} value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Estado</option>
            <option value="1">Hidalgo</option>
          </select>

        <input
          style={{ width: '46%' }}
          type="number"
          value={cp}
          onChange={(e) => {
            const value = e.target.value.slice(0, 5); // Limita el valor a 18 caracteres
            setcp(value);
          }}
          maxLength={5} // Restringe la entrada a 18 caracteres
          placeholder="Código Postal"
        />
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
          
        <input
          style={{ width: '62%', marginRight: '2%' }}
          type="number"
          value={telefono}
          onChange={(e) => {
            const value = e.target.value.slice(0, 10); // Limita el valor a 18 caracteres
            setTelefono(value);
          }}
          maxLength={10} // Restringe la entrada a 18 caracteres
          placeholder="Teléfono"
        />

        <input
          style={{ width: '30%' }}
          type="number"
          value={extencion}
          onChange={(e) => {
            const value = e.target.value.slice(0, 4); // Limita el valor a 18 caracteres
            setExtencion(value);
          }}
          maxLength={4} // Restringe la entrada a 18 caracteres
          placeholder="Extensión"
        />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Correo Electrónico  </span> 
        (debe ser personal)
        <span style={{ fontWeight: 'bold' }}>/Confirme su Correo Electrónico</span> 
        </div>

        <div className="inputs">
        <input
          style={{ marginRight: '2%' }}
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
        />

        <input
          type="text"
          value={confirma_correo}
          onChange={(e) => {
            const value = e.target.value;
            setConfirma_Correo(value);
            setCorreosCoinciden(value === correo); // Compara con el primer correo
          }}
          placeholder="Confirme su correo"
          className={!correosCoinciden ? 'rojo' : ''} // Agrega una clase rojo si los correos no coinciden
        />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Contraseña/ Confirme su Contraseña  </span> 
        </div>

        <div className="custom-inputs">
          <div className="input-container">
            <input
              type={mostrarContrasena ? "text" : "password"}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
              minLength={8}
              maxLength={15}
              className="custom-input"
            />
            <label htmlFor="password"></label>
            <div className="eye-icon" onClick={() => setMostrarContrasena(!mostrarContrasena)}>
              {mostrarContrasena ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </div>
          </div>
          <div className="input-container">
            <input
              type={mostrarConfirmaContrasena ? 'text' : 'password'}
              value={confirma_contrasena}
              onChange={(e) => {
                const value = e.target.value;
                setConfirma_Contrasena(value);
                setContrasenasCoinciden(value === contrasena);
              }}
              placeholder="Confirma tu contraseña"
              minLength={8}
              maxLength={15}
              className={`custom-input ${!contrasenasCoinciden ? 'rojo' : ''}`}
            />
            <label htmlFor="password"></label>
            <div className="eye-icon" onClick={() => setMostrarConfirmaContrasena(!mostrarConfirmaContrasena)}>
              {mostrarConfirmaContrasena ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </div>
          </div>
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
