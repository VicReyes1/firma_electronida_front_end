import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../css/Preregistro.css'; // Verifica la ruta a tu archivo CSS
import Heder from '../heder';
import '../../css/sweetalert_tuneado_veda.min.css'
import Swal from 'sweetalert2'
import axios from 'axios';
import { jsPDF } from 'jspdf';
import montserratRegular from '../../Fonts/Montserrat-Regular.ttf'; // Ruta relativa a la fuente dentro del proyecto
import montserratBold from '../../Fonts/Montserrat-Bold.ttf'; // Ruta relativa a la fuente dentro del proyecto
import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto

function PreregistroPresencial() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [data, setData] = useState({
    ArchivoAval: "",
    ArchivoCURP: "",
    ArchivoComprobanteDomicilio: "",
    ArchivoINE: "",
    ArchivoRFC: "",
    ArchivoCredencialNotario: "",
   
    municipio_direccion: "",
    fecha: "",
    isNotary: "",
    isServer: "",
    secretaria: "",
    entidad: "",
    nombre: "",
    puesto: "",
    rfc: "",
    curp: "",
    correo: "",
    telefono: "",
    extencion: "",
    direccion: "",
    estado: "",
    cp: "",
    ArchivocartaResponsiva:"",
    Archivoreq:"",
    ArchivosolicitudRequerimiento:"",
    // Otros campos que esperas recibir de la API
  });
  

  const [municipio_direccionCoords, setMunicipioCoords] = useState({ x: 112, y: 45 });
  const [fechaCoords, setFechaCoords] = useState({ x: 163, y: 45 });
  const [notarioCoords, setnotarioCoords] = useState({ x: 170, y: 60 });
  const [servidorCoords, setservidorCoords] = useState({ x: 129, y: 60 });
  const [secretariaCoords, setsecretariaCoords] = useState({ x: 20, y: 80 });
  const [entidadCoords, setentidadCoords] = useState({ x: 32, y: 90 });
  const [nombreCoords, setnombreCoords] = useState({ x: 58, y: 100 });
  const [puestoCoords, setpuestoCoords] = useState({ x: 37, y: 110 });
  const [RFCCoords, setRFCCoords] = useState({ x: 30, y: 120 });
  const [CURPCoords, setCURPCoords] = useState({ x: 124, y: 120 });
  const [correoCoords, setcorreoCoords] = useState({ x: 58, y: 130 });
  const [telefonoCoords, settelefonoCoords] = useState({ x: 40, y: 140 });
  const [extencionCoords, setextencionCoords] = useState({ x: 132, y: 140 });
  const [direccionCoords, setdireccionCoords] = useState({ x: 20, y: 160 });
  const [municipio_direccionCoords2, setMunicipioCoords2] = useState({ x: 42, y: 170 });
  const [estadoCoords, setestadoCoords] = useState({ x: 108, y: 170 });
  const [cpCoords, setcpCoords] = useState({ x: 175, y: 170 });
  const [ineCoords, setineCoords] = useState({ x: 175, y: 210 });
  const [ComprobanteDomicilioCoords, setComprobanteDomicilioCoords] = useState({ x: 175, y: 215 });
  const [ArchivoCURPCoords, setArchivoCURPCoords] = useState({ x: 175, y: 220 });
  const [ArchivoRFCCoords, setArchivoRFCCoords] = useState({ x: 175, y: 225 });
  const [ArchivoAvalCoords, setArchivoAvalCoords] = useState({ x: 175, y: 230 });
  const [ArchivoNotarioCoords, setArchivoNotarioCoords] = useState({ x: 175, y: 235 });

  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('es-MX', options);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/usuario/getDataPDF/${id}`);
      
      const responseData = response.data.data;

      // Objeto para almacenar los datos convertidos a string
      const stringifiedData = {};

      // Iterar sobre las propiedades del objeto responseData
      for (const key in responseData) {
        if (Object.hasOwnProperty.call(responseData, key)) {
          // Convertir el valor de la propiedad a string y almacenarlo en el nuevo objeto
          stringifiedData[key] = String(responseData[key]);
          
          // Verificar si el valor es "null" o el texto "null"
          if (
            key === "ArchivoAval" ||
            key === "ArchivoCURP" ||
            key === "ArchivoComprobanteDomicilio" ||
            key === "ArchivoINE" ||
            key === "ArchivoRFC" ||
            key === "ArchivoCredencialNotario" ||
            key === "ArchivocartaResponsiva" || 
            key === "Archivoreq" ||
            key === "ArchivosolicitudRequerimiento"
          ) {
            // Si el valor es "null" o el texto "null", asignar "false" al nuevo objeto
            stringifiedData[key] = (responseData[key] === "null" || responseData[key] === null) ? "false" : "true";
          } 
        }
      }

      return stringifiedData
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  const generatePDF = async (id) => {


      var dataAsync = await fetchData(id);
      
      const doc = new jsPDF();

      // Definir la fuente Montserrat
      doc.addFileToVFS(montserratRegular);
      doc.addFont(montserratRegular, 'Montserrat', 'normal');
      doc.addFont(montserratBold, 'Montserrat-Bold', 'normal');

      // Establecer Montserrat como la fuente predeterminada
      doc.setFont('Montserrat');

      // Agregar imagen como encabezado
      doc.addImage(logo, 'PNG', 180, 5, 20, 25); // Ajusta las coordenadas y el tamaño según tus necesidades

      // Agregar texto adicional al documento
      doc.setTextColor(128, 128, 128); // Establece el color gris (RGB: 128, 128, 128)
      doc.setFontSize(8); // Establece el tamaño de letra más pequeño
      doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
      doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);

      doc.setFont('Montserrat-Bold');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12); // Establece el tamaño de letra más pequeño
      doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
      doc.text('SOLICITUD DE CERTIFICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 22, 35);

      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text('Hidalgo a ', 144, 45);
      doc.text(',', 142, 45);
      doc.text(dataAsync.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
      doc.text(formattedDate, fechaCoords.x, fechaCoords.y);

      
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
      doc.setFontSize(10);
      doc.text('Servidor Público  (   )     Notario Público  (   )', 95, 60);
      doc.text(dataAsync.isNotary === 'true' ? 'X' : '', notarioCoords.x, notarioCoords.y);
      doc.text(dataAsync.isServer === 'true' ? 'X' : '', servidorCoords.x, servidorCoords.y);
      
      doc.text('Razón Social', 20, 70);
      doc.setFont('Montserrat');
      doc.setFontSize(8);
      doc.text('(Dependencia o Entidad Paraestatal o H. Ayuntamiento Entidad Municipal o Notaría Pública u Organismo)', 45, 70);
      doc.setFontSize(10);
      doc.text(dataAsync.secretaria !== "null" ? dataAsync.secretaria : 'No Aplica', secretariaCoords.x, secretariaCoords.y);



      doc.setFont('Montserrat-Bold');
      doc.text('Área:', 20, 90);
      doc.setFont('Montserrat');
      doc.text(dataAsync.entidad, entidadCoords.x, entidadCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Nombre Completo:', 20, 100);
      doc.setFont('Montserrat');
      doc.text(dataAsync.nombre, nombreCoords.x, nombreCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Puesto:', 20, 110);
      doc.setFont('Montserrat');
      doc.text(dataAsync.puesto, puestoCoords.x, puestoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('RFC: ', 20, 120);
     
      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text(dataAsync.rfc, RFCCoords.x, RFCCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('CURP: ', 110, 120);
      doc.setFont('Montserrat');
      doc.text(dataAsync.curp, CURPCoords.x, CURPCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Correo Electrónico:', 20, 130);
      doc.setFont('Montserrat');
      doc.text(dataAsync.correo, correoCoords.x, correoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Teléfono: ', 20, 140);
      doc.setFont('Montserrat');
      doc.setFontSize(10);
      //doc.text(data.telefono, telefonoCoords.x, telefonoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Extensión: ', 110, 140);
      doc.setFont('Montserrat');
      doc.text(dataAsync.extencion, extencionCoords.x, extencionCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('2.  DATOS DEL DOMICILIO DE TRABAJO', 15, 150);
      doc.setFontSize(10);
      doc.setFont('Montserrat');
      doc.text(dataAsync.direccion, direccionCoords.x, direccionCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Municipio: ', 20, 170);
      doc.setFont('Montserrat');
      doc.text(dataAsync.municipio_direccion, municipio_direccionCoords2.x, municipio_direccionCoords2.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Entidad: ', 90, 170);
      doc.setFont('Montserrat');
      doc.text(dataAsync.estado, estadoCoords.x, estadoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Código Postal: ', 145, 170);
      doc.setFont('Montserrat');
      doc.text(dataAsync.cp, cpCoords.x, cpCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('3.  DOCUMENTOS DE IDENTIDAD', 15, 180);
      doc.setFont('Montserrat');
      doc.setFontSize(9.5);
      doc.text('PARA OBTENER EL CERTIFICADO DIGITAL DE LA FIRMA ELECTRÓNICA AVANZADA ES NECESARIO QUE ', 20, 190);
      doc.text('ENTREGUE,  JUNTO CON ESTA SOLICITUD,  LOS DOCUMENTOS QUE A CONTINUACIÓN SE INDICAN EN ', 20, 195);
      doc.text('ORIGINAL, ', 20, 200);
      doc.setFont('Montserrat-Bold');
      doc.text('MARCANDO CON UNA "X"  ', 39, 200);
      doc.setFont('Montserrat');
      doc.text('EN LA DOCUMENTACIÓN PROPORCIONADA.', 86, 200);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('a) IDENTIFICACIÓN OFICIAL CON FOTOGRAFÍA                                                                 [       ]', 20, 210);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoINE === 'true' ? 'X' : '', ineCoords.x, ineCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('b) COMPROBANTE DE DOMICILIO                                                                                         [       ]', 20, 215);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoComprobanteDomicilio === 'true' ? 'X' : '', ComprobanteDomicilioCoords.x, ComprobanteDomicilioCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('c) CLAVE ÚNICA DE REGISTRO DE POBLACIÓN                                                                 [       ]', 20, 220);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoCURP === 'true' ? 'X' : '', ArchivoCURPCoords.x, ArchivoCURPCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('d) REGISTRO FEDERAL DE CONTRIBUYENTES                                                                    [       ]', 20, 225);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoRFC === 'true' ? 'X' : '', ArchivoRFCCoords.x, ArchivoRFCCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('e) DOCUMENTO QUE LO AVALA COMO SERVIDOR O NOTARIO PÚBLICO                   [       ]', 20, 230);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoAval === 'true' ? 'X' : '', ArchivoAvalCoords.x, ArchivoAvalCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('f) CREDENCIAL DE NOTARIO PÚBLICO                                                                                 [       ]', 20, 235);
      doc.setFont('Montserrat');
      doc.text(dataAsync.ArchivoCredencialNotario === 'true' ? 'X' : '', ArchivoNotarioCoords.x, ArchivoNotarioCoords.y);
      
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.text('DECLARO BAJO PROTESTA DE DECIR VERDAD QUE LOS DATOS ', 45, 250);
      doc.text('CONTENIDOS EN ESTA SOLICITUD SON CIERTOS ', 59, 255);
      doc.setFont('Montserrat');
      doc.text('______________________________________________________________________________ ', 35, 270);
      doc.setTextColor(128, 128, 128);
      doc.text('FIRMA ', 100, 275);

      doc.setFontSize(8);
      doc.text('Palacio de Gobierno 1er Piso, Plaza Juárez s/n, Col. Centro, Pachuca de Soto, Hidalgo, México, C.P. 42000 ', 32, 285);
      doc.text('Tel.: (800) 623 47 62         http://firmaelectronica.hidalgo.gob.mx', 60, 290);
      
      const pdfBlob = doc.output('blob');

      // Crear un objeto FormData para enviar el archivo adjunto
      const formData = new FormData();
      formData.append('archivo', pdfBlob, 'Solicitud de firma electronica avanzada.pdf');
      formData.append("id",id);
      

      // Configurar la solicitud POST utilizando Axios
      axios.post(`${apiUrl}/usuario/enviarSolicitud`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // Verificar si la respuesta es exitosa
        if (response.status === 200) {
          // La solicitud fue exitosa
          console.log('Archivo PDF enviado correctamente a la API');
        } else {
          // Hubo un error en la solicitud
          console.error('Error al enviar el archivo PDF a la API');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });

  };

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
  const [ArchivocartaResponsiva, setArchivocartaResponsiva] = useState(null);
  const [Archivoreq, setArchivoreq] = useState(null);
  const [ArchivosolicitudRequerimiento, setArchivosolicitudRequerimiento] = useState(null);

  const [isServer, setIsServer] = useState(false);
  const [isNotary, setIsNotary] = useState(false);
  const [isNuevo, setIsNuevo] = useState(false);
  const [isRenovacion, setIsRenovacion] = useState(false);
  const [causa_de_solicitud, setcausa_de_solicitud] = useState('');
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
  const [contrasena, setContrasena] = useState('');



  const [isResponsavilidadUso, setIsResponsavilidadUso] = useState(false);
  const [isPoliticas, setIsPoliticas] = useState(false);
  const [isRevocacion, setIsRevocacion] = useState(false);
  const [confirma_correo, setConfirma_Correo] = useState('');
  const [correosCoinciden, setCorreosCoinciden] = useState(true);
  const [confirma_contrasena, setConfirma_Contrasena] = useState('');
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmaContrasena, setMostrarConfirmaContrasena] = useState(false);
  const [presencial, setPresencial] = useState(true);

 
  const [error, setError] = useState('');
 
    // Función para verificar si todas las casillas de verificación están marcadas
    const todasSeleccionadas = () => {
      // Verificar el estado de todas las variables de estado y devolver true si todas están marcadas
      return ArchivoINE && ArchivoComprobanteDomicilio && ArchivoCURP && ArchivoRFC && ArchivoAval
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
  const handleArchivocartaResponsivaChange = (e) => {
    setArchivocartaResponsiva(e.target.files[0]);
  };
  const handleArchivoreqChange = (e) => {
    setArchivoreq(e.target.files[0]);
  };
  const handleArchivosolicitudRequerimientoChange = (e) => {
    setArchivosolicitudRequerimiento(e.target.files[0]);
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

  const Formulario = {
    isServer,
    isNotary,
    isNuevo,
    isRenovacion,
    secretaria,
    tipoEntidad,
    entidad,
    nombre,
    paterno,
    materno,
    curp,
    rfc,
    direccion,
    municipio_direccion,
    estado,
    cp,
    puesto,
    area,
    telefono,
    extencion,
    correo,
    confirma_correo,
    contrasena,
    confirma_contrasena,
    isPoliticas,
    isRevocacion,
    causa_de_solicitud,
    presencial
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/usuario/preregistro`, Formulario)
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (response.status === 201) {
          sendDocuments(response.data)
        }
        
        
    })
    .catch(error => {
        // Manejar errores
        console.error('Error al enviar el formulario:', error);
        Swal.fire({
            title: "Error",
            text: "Hubo un error al enviar el formulario.",
            icon: "error"
        });
    });
  };

  const sendDocuments = async (id) => {
    console.log(id)
    
    const documentos = [];

    console.log(documentos)
    documentos.push(ArchivoINE)
    documentos.push(ArchivoComprobanteDomicilio)
    documentos.push(ArchivoCURP)
    documentos.push(ArchivoRFC)
    documentos.push(ArchivoAval)
    documentos.push(ArchivocartaResponsiva)
    documentos.push(Archivoreq)
    documentos.push(ArchivosolicitudRequerimiento)
    if (ArchivoCredencialNotario !== null) {
      documentos.push(ArchivoCredencialNotario)
    }
    console.log(documentos)

    if (documentos.length >= 1) {
      const f = new FormData()
      for (let i = 0; i < documentos.length; i++) {
        f.append("files",documentos[i])
      }
      f.append("id",id)

      try {
        const response = await axios.post(`${apiUrl}/admin/upload`, f,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          Swal.fire({
              title: "Registro completado",
              text: "El expediente estará diponible para el administrador",
              icon: "success",
              allowOutsideClick: false
          }).then(() => {
              // Redirigir a otra página después de que el usuario cierre el alert
              window.location.href = '/admin&solicitudes'; // Cambia esta ruta por la ruta de redirección deseada
            });
        } else {
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
          Swal.fire({
              title: "Error",
              text: "Hubo un error al enviar el formulario.",
              icon: "error"
          });
      }
      
    }
  
  }

  const [showPwd, setShowPwd] = useState(false)


  
 

  return (
    <div className="contenedor">
      <Heder />
      <div className="titulo_3">
        Ingrese sus Datos
      </div>

      <div className='formulario'>

        <form onSubmit={handleSubmit}>
        <div className='titulo_formulario'>
          1.- Proporcione los siguientes documentos
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
                accept="application/pdf" // Solo permite archivos PDF
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
                accept="application/pdf" // Solo permite archivos PDF
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
                accept="application/pdf" // Solo permite archivos PDF
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
                accept="application/pdf" // Solo permite archivos PDF
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
                accept="application/pdf" // Solo permite archivos PDF
                />
            </label>
            {ArchivoAval ? <span className="file-name">{ArchivoAval.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Trámite de Certificación Digital</span>  
        </div>
        
        <div className="checkboxes">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={isNuevo} 
              onChange={() => {
                setIsNuevo(true);
                setIsRenovacion(false);
              }} 
            />
            <span className="checkbox-text">Nuevo</span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={isRenovacion} 
              onChange={() => {
                setIsRenovacion(true);
                setIsNuevo(false);
              }} 
            />
            <span className="checkbox-text">Renovación</span>
          </label>
        </div>
        {isRenovacion && (
              <div>
              <div className="text_formulario">
                <span style={{ fontWeight: 'bold' }}>Causa de Solicitud</span>
              </div>

              <div className="inputs">
                <input type="text" value={causa_de_solicitud} onChange={(e) => setcausa_de_solicitud(e.target.value)} placeholder="Causa" required/>
               
               </div>
  
             
            </div>
          )}

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Persona</span>  
        </div>
        
        <div className="checkboxes">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={isServer} 
                onChange={() => {
                  setIsServer(true);
                  setIsNotary(false);
                }} 
              />
              <span className="checkbox-text">Servidor Público</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={isNotary} 
                onChange={() => {
                  setIsNotary(true);
                  setIsServer(false);
                }} 
              />
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
        <option value="Dependencia">Dependencia</option>
        <option value="Ayuntamiento">Ayuntamiento</option>
        <option value="Organismo">Organismo</option>
        <option value="Notaria Publica">Notaría Pública</option>
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
          style={{ marginRight: '1%' }}
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
          2.- Dirección como aparece en comprobante de domicilio
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
          <option value="1">Acatlán</option>
          <option value="2">Acaxochitlán</option>
          <option value="3">Actopan</option>
          <option value="4">Agua Blanca de Iturbide</option>
          <option value="5">Ajacuba</option>
          <option value="6">Alfajayucan</option>
          <option value="7">Almoloya</option>
          <option value="8">Apan</option>
          <option value="9">El Arenal</option>
          <option value="10">Atitalaquia</option>
          <option value="11">Atlapexco</option>
          <option value="12">Atotonilco el Grande</option>
          <option value="13">Atotonilco de Tula</option>
          <option value="14">Calnali</option>
          <option value="15">Cardonal</option>
          <option value="16">Cuautepec de Hinojosa</option>
          <option value="17">Chapantongo</option>
          <option value="18">Chapulhuacán</option>
          <option value="19">Chilcuautla</option>
          <option value="20">Eloxochitlán</option>
          <option value="21">Emiliano Zapata</option>
          <option value="22">Epazoyucan</option>
          <option value="23">Francisco I. Madero</option>
          <option value="24">Huasca de Ocampo</option>
          <option value="25">Huautla</option>
          <option value="26">Huazalingo</option>
          <option value="27">Huehuetla</option>
          <option value="28">Huejutla de Reyes</option>
          <option value="29">Huichapan</option>
          <option value="30">Ixmiquilpan</option>
          <option value="31">Jacala de Ledezma</option>
          <option value="32">Jaltocán</option>
          <option value="33">Juárez Hidalgo</option>
          <option value="34">Lolotla</option>
          <option value="35">Metepec</option>
          <option value="36">San Agustín Metzquititlán</option>
          <option value="37">Metztitlán</option>
          <option value="38">Mineral del Chico</option>
          <option value="39">Mineral del Monte</option>
          <option value="40">La Misión</option>
          <option value="41">Mixquiahuala de Juárez</option>
          <option value="42">Molango de Escamilla</option>
          <option value="43">Nicolás Flores</option>
          <option value="44">Nopala de Villagrán</option>
          <option value="45">Omitlán de Juárez</option>
          <option value="46">San Felipe Orizatlán</option>
          <option value="47">Pacula</option>
          <option value="48">Pachuca de Soto</option>
          <option value="49">Pisaflores</option>
          <option value="50">Progreso de Obregón</option>
          <option value="51">Mineral de la Reforma</option>
          <option value="52">San Agustín Tlaxiaca</option>
          <option value="53">San Bartolo Tutotepec</option>
          <option value="54">San Salvador</option>
          <option value="55">Santiago de Anaya</option>
          <option value="56">Santiago Tulantepec de Lugo Guerrero</option>
          <option value="57">Singuilucan</option>
          <option value="58">Tasquillo</option>
          <option value="59">Tecozautla</option>
          <option value="60">Tenango de Doria</option>
          <option value="61">Tepeapulco</option>
          <option value="62">Tepehuacán de Guerrero</option>
          <option value="63">Tepeji del Río de Ocampo</option>
          <option value="64">Tepetitlán</option>
          <option value="65">Tetepango</option>
          <option value="66">Villa de Tezontepec</option>
          <option value="67">Tezontepec de Aldama</option>
          <option value="68">Tianguistengo</option>
          <option value="69">Tizayuca</option>
          <option value="70">Tlahuelilpan</option>
          <option value="71">Tlahuiltepa</option>
          <option value="72">Tlanalapa</option>
          <option value="73">Tlanchinol</option>
          <option value="74">Tlaxcoapan</option>
          <option value="75">Tolcayuca</option>
          <option value="76">Tula de Allende</option>
          <option value="77">Tulancingo de Bravo</option>
          <option value="78">Xochiatipan</option>
          <option value="79">Xochicoatlán</option>
          <option value="80">Yahualica</option>
          <option value="81">Zacualtipán de Ángeles</option>
          <option value="82">Zapotlán de Juárez</option>
          <option value="83">Zempoala</option>
          <option value="84">Zimapán</option>

            {/* Agrega las opciones que necesites */}
          </select>

          <select style={{ marginRight: '2%' }} value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Estado</option>
            <option value="Hidalgo">Hidalgo</option>
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
          3.- Información Personal
        </div>
        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Puesto/Área</span>  
        </div>

        <div className="inputs">
        <input
          style={{ marginRight: '2%' }}
          type="text"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
          placeholder="Puesto"
        />
        <input
          style={{ marginRight: '1%' }}
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Área"
        />
        </div>

        <div className='text_formulario'>
        <span style={{ fontWeight: 'bold' }}>Teléfono  </span> 
        (10 dígitos)
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

        <div className='titulo_formulario'>
          6.- Subir Archivos
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Carta Responsiva</span>
        (Subir carta responsiva firmada)
        </div>
        
        <div className="files">
            <label className="custom-file-label" style={{ marginTop: '6%' }}>
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleArchivocartaResponsivaChange} 
                className="custom-file-input"
                accept="application/pdf" // Solo permite archivos PDF
                />
            </label>
            {ArchivocartaResponsiva ? <span className="file-name">{ArchivocartaResponsiva.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Archivo Revocación</span>
        (Subir documento de revocación o suspención)
        </div>
        
        <div className="files">
            <label className="custom-file-label" style={{ marginTop: '6%' }}>
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleArchivoreqChange} 
                className="custom-file-input"
                //accept="application/pdf" // Solo permite archivos PDF
                />
            </label>
            {Archivoreq ? <span className="file-name">{Archivoreq.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>

        <div className='text_pdf'>
        <span style={{ fontWeight: 'bold' }}>Archivo Solicitud de Requerimiento</span>
        (Subir solicitud de requerimiento)
        </div>
        
        <div className="files">
            <label className="custom-file-label" style={{ marginTop: '6%' }}>
                Seleccionar Archivo
                <input 
                type="file" 
                onChange={handleArchivosolicitudRequerimientoChange} 
                className="custom-file-input"
                accept="application/pdf" // Solo permite archivos PDF
                />
            </label>
            {ArchivosolicitudRequerimiento ? <span className="file-name">{ArchivosolicitudRequerimiento.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
        </div>



        <div style={{  marginTop: '2%' }} className="checkboxes">
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isResponsavilidadUso} onChange={() => setIsResponsavilidadUso(!isResponsavilidadUso)} />
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
        

        <Button className="boton_envio" onClick={todasSeleccionadas() ? handleShowModal1 : handleShowModal2}>
          Siguiente
        </Button>
         </form>
        
       

      
      </div>
    
     
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
  <Modal show={showModal1} onHide={handleCloseModal} centered backdrop="static">
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

<Modal show={showModal2} onHide={handleCloseModal} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>Formulario Incompleto</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p className='texto_modal'>Parece que algunos campos del formulario no han sido completados. Por favor, revisa nuevamente y asegúrate de llenar todos los campos antes de enviarlo. </p>
  </Modal.Body>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atrás</Button>
  </Modal.Footer>
</Modal>

    </div>
    </div>
  );
}

export default PreregistroPresencial;
