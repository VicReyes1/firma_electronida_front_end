import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import '../../css/Verificar_Datos.css';

function Verificar_Datos() {
  const [nombre, setNombre] = useState('');
  const [isSP, setIsSP] = useState(false);
  const [isRS, setIsRS] = useState(false);
  const [isRFC, setIsRFC] = useState(false);
  const [isdireccion, setIsDireccion] = useState(false);
  const [ism, setIsM] = useState(false);
  const [isCP, setIsCP] = useState(false);
  const [isP, setIsP] = useState(false);
  const [isA, setIsA] = useState(false);
  const [isT, setIsT] = useState(false);
  const [isExt, setIsExt] = useState(false);
  const [isIde, setIsIde] = useState(false);
  const [isCD, setIsCD] = useState(false);
  const [isCURP, setIsCURP] = useState(false);
  const [isDRFC, setIsDRFC] = useState(false);
  const [isAval, setIsAval] = useState(false);

  const [archivo, setArchivo] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);


  useEffect(() => {
    // Aquí realizas la petición a tu API
    // Supongamos que la API devuelve un objeto con un campo "nombre"
    // Puedes reemplazar la URL de la petición con la correspondiente a tu API
    fetch('URL_DE_TU_API')
      .then(response => response.json())
      .then(data => {
        // Actualizamos el estado con el nombre obtenido de la API
        setNombre(data.nombre);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente


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
    return isSP && isRS /* Agregar el resto de tus variables de estado */;
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
            Verifica Datos
          </div>
          <div className='text_2'>
            Seleccione los campos que no requieran corrección. Si es aprobado, se enviará la carta de solicitud al usuario.
          </div>
        </div>
      </div>

      <div className="container44">
        <div className="content1">

          <div className='titulo_formulario'>
            Solicitud #12345
          </div>

          <div className='text_formulario'>
            <span style={{ fontWeight: 'bold' }}>Nombre:</span>
            {nombre} Victor Serrano{/* Borrar texto nombre cuando ya se conecte */}
          </div>

          <div className='text_formulario'>
            <span style={{ fontWeight: 'bold' }}>CURP:</span>
            {nombre} MATJ010717HPLRRSA3{/* Borrar texto nombre cuando ya se conecte */}
          </div>

          <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isSP} onChange={() => setIsSP(!isSP)} />
                <span className="checkbox-text">{nombre}Servidor Público</span>
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isRS} onChange={() => setIsRS(!isRS)} />
                <span className="checkbox-text2" >Razón Social:  </span>
                {nombre}Oficialia mayor
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isRFC} onChange={() => setIsRFC(!isRFC)} />
                <span className="checkbox-text2" >RFC:  </span>
                {nombre}YEDO028495ST5
            </label>    
        </div>

        <div className='titulo_formulario'>
                 Dirección
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isdireccion} onChange={() => setIsDireccion(!isdireccion)} />
                <span className="checkbox-text2" >Dirección:  </span>
                {nombre}Av. Madero S/N Col. Centro
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={ism} onChange={() => setIsM(!ism)} />
                <span className="checkbox-text2" >Municipio:  </span>
                {nombre}Pachuca
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isCP} onChange={() => setIsCP(!isCP)} />
                <span className="checkbox-text2" >Código Postal:  </span>
                {nombre}42000
            </label>    
        </div>


        <div className='titulo_formulario'>
             Información Personal
        </div>
       
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isP} onChange={() => setIsP(!isP)} />
                <span className="checkbox-text2" >Puesto:  </span>
                {nombre}Subdirector
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isA} onChange={() => setIsA(!isA)} />
                <span className="checkbox-text2" >Área  </span>
                {nombre}Firma Electrónica
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isT} onChange={() => setIsT(!isT)} />
                <span className="checkbox-text2" >Teléfono:  </span>
                {nombre} 771 234 5678
            </label>    
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isExt} onChange={() => setIsExt(!isExt)} />
                <span className="checkbox-text2" >Extensión:  </span>
                {nombre}  3498
            </label>    
        </div>

        <div className='titulo_formulario'>
            Documentos
        </div>

        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isIde} onChange={() => setIsIde(!isIde)} />
                <span className="checkbox-text2">{nombre}Identificación</span>
            </label>    
        </div>
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isCD} onChange={() => setIsCD(!isCD)} />
                <span className="checkbox-text2">{nombre}Comprobante de Domicilio</span>
            </label>    
        </div>
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isCURP} onChange={() => setIsCURP(!isCURP)} />
                <span className="checkbox-text2">{nombre}CURP</span>
            </label>    
        </div>
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isDRFC} onChange={() => setIsDRFC(!isDRFC)} />
                <span className="checkbox-text2">{nombre}RFC</span>
            </label>    
        </div>
        <div className="checkboxes">
            <label className="checkbox-label">
                <input type="checkbox" checked={isAval} onChange={() => setIsAval(!isAval)} />
                <span className="checkbox-text2">{nombre}Aval</span>
            </label>    
        </div>

        </div>


        <div className="content2">
           
          <select className='select2' style={{ marginRight: '2%' }} value={archivo} onChange={handleChangeSelect}>
            <option value="">INE</option>
            <option value="">Comprobante de domicilio</option>
            <option value="">CURP</option>
            <option value="">RFC</option>
            <option value="">Aval como Servidor Público o Notario Público</option>
          </select>

          <div className='pdf_contenedor'>
            {/* Mostrar el PDF si hay un Blob */}
            {pdfBlob && <embed src={URL.createObjectURL(pdfBlob)} type="application/pdf" width="100%" height="600px" />}
          </div>

          <div className="inputs">
            <textarea className='comentarios' value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Comentarios" />
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
    <Modal.Title className='titulo_modal'>¿Seguro que quiere enviar la solicitud al usuario?</Modal.Title>
  </Modal.Header>

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

export default Verificar_Datos;