import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
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
//import swal from 'sweetalert';
import WizardStepsInicial from '../Componentes/WizardSteps-Inicial';
import WizardStepsInProgress from '../Componentes/WizardSteps-Progreso';
import Select from 'react-select';


import { cpOptions } from './cp';
const municipios = [
  { value: 'Acatlán', label: 'Acatlán' },
  { value: 'Acaxochitlán', label: 'Acaxochitlán' },
  { value: 'Actopan', label: 'Actopan' },
  { value: 'Agua Blanca de Iturbide', label: 'Agua Blanca de Iturbide' },
  { value: 'Ajacuba', label: 'Ajacuba' },
  { value: 'Alfajayucan', label: 'Alfajayucan' },
  { value: 'Almoloya', label: 'Almoloya' },
  { value: 'Apan', label: 'Apan' },
  { value: 'El Arenal', label: 'El Arenal' },
  { value: 'Atitalaquia', label: 'Atitalaquia' },
  { value: 'Atlapexco', label: 'Atlapexco' },
  { value: 'Atotonilco el Grande', label: 'Atotonilco el Grande' },
  { value: 'Atotonilco de Tula', label: 'Atotonilco de Tula' },
  { value: 'Calnali', label: 'Calnali' },
  { value: 'Cardonal', label: 'Cardonal' },
  { value: 'Cuautepec de Hinojosa', label: 'Cuautepec de Hinojosa' },
  { value: 'Chapantongo', label: 'Chapantongo' },
  { value: 'Chapulhuacán', label: 'Chapulhuacán' },
  { value: 'Chilcuautla', label: 'Chilcuautla' },
  { value: 'Eloxochitlán', label: 'Eloxochitlán' },
  { value: 'Emiliano Zapata', label: 'Emiliano Zapata' },
  { value: 'Epazoyucan', label: 'Epazoyucan' },
  { value: 'Francisco I. Madero', label: 'Francisco I. Madero' },
  { value: 'Huasca de Ocampo', label: 'Huasca de Ocampo' },
  { value: 'Huautla', label: 'Huautla' },
  { value: 'Huazalingo', label: 'Huazalingo' },
  { value: 'Huehuetla', label: 'Huehuetla' },
  { value: 'Huejutla de Reyes', label: 'Huejutla de Reyes' },
  { value: 'Huichapan', label: 'Huichapan' },
  { value: 'Ixmiquilpan', label: 'Ixmiquilpan' },
  { value: 'Jacala de Ledezma', label: 'Jacala de Ledezma' },
  { value: 'Jaltocán', label: 'Jaltocán' },
  { value: 'Juárez Hidalgo', label: 'Juárez Hidalgo' },
  { value: 'Lolotla', label: 'Lolotla' },
  { value: 'Metepec', label: 'Metepec' },
  { value: 'San Agustín Metzquititlán', label: 'San Agustín Metzquititlán' },
  { value: 'Metztitlán', label: 'Metztitlán' },
  { value: 'Mineral del Chico', label: 'Mineral del Chico' },
  { value: 'Mineral del Monte', label: 'Mineral del Monte' },
  { value: 'La Misión', label: 'La Misión' },
  { value: 'Mixquiahuala de Juárez', label: 'Mixquiahuala de Juárez' },
  { value: 'Molango de Escamilla', label: 'Molango de Escamilla' },
  { value: 'Nicolás Flores', label: 'Nicolás Flores' },
  { value: 'Nopala de Villagrán', label: 'Nopala de Villagrán' },
  { value: 'Omitlán de Juárez', label: 'Omitlán de Juárez' },
  { value: 'San Felipe Orizatlán', label: 'San Felipe Orizatlán' },
  { value: 'Pacula', label: 'Pacula' },
  { value: 'Pachuca de Soto', label: 'Pachuca de Soto' },
  { value: 'Pisaflores', label: 'Pisaflores' },
  { value: 'Progreso de Obregón', label: 'Progreso de Obregón' },
  { value: 'Mineral de la Reforma', label: 'Mineral de la Reforma' },
  { value: 'San Agustín Tlaxiaca', label: 'San Agustín Tlaxiaca' },
  { value: 'San Bartolo Tutotepec', label: 'San Bartolo Tutotepec' },
  { value: 'San Salvador', label: 'San Salvador' },
  { value: 'Santiago de Anaya', label: 'Santiago de Anaya' },
  { value: 'Santiago Tulantepec de Lugo Guerrero', label: 'Santiago Tulantepec de Lugo Guerrero' },
  { value: 'Singuilucan', label: 'Singuilucan' },
  { value: 'Tasquillo', label: 'Tasquillo' },
  { value: 'Tecozautla', label: 'Tecozautla' },
  { value: 'Tenango de Doria', label: 'Tenango de Doria' },
  { value: 'Tepeapulco', label: 'Tepeapulco' },
  { value: 'Tepehuacán de Guerrero', label: 'Tepehuacán de Guerrero' },
  { value: 'Tepeji del Río de Ocampo', label: 'Tepeji del Río de Ocampo' },
  { value: 'Tepetitlán', label: 'Tepetitlán' },
  { value: 'Tetepango', label: 'Tetepango' },
  { value: 'Villa de Tezontepec', label: 'Villa de Tezontepec' },
  { value: 'Tezontepec de Aldama', label: 'Tezontepec de Aldama' },
  { value: 'Tianguistengo', label: 'Tianguistengo' },
  { value: 'Tizayuca', label: 'Tizayuca' },
  { value: 'Tlahuelilpan', label: 'Tlahuelilpan' },
  { value: 'Tlahuiltepa', label: 'Tlahuiltepa' },
  { value: 'Tlanalapa', label: 'Tlanalapa' },
  { value: 'Tlanchinol', label: 'Tlanchinol' },
  { value: 'Tlaxcoapan', label: 'Tlaxcoapan' },
  { value: 'Tolcayuca', label: 'Tolcayuca' },
  { value: 'Tula de Allende', label: 'Tula de Allende' },
  { value: 'Tulancingo de Bravo', label: 'Tulancingo de Bravo' },
  { value: 'Xochiatipan', label: 'Xochiatipan' },
  { value: 'Xochicoatlán', label: 'Xochicoatlán' },
  { value: 'Yahualica', label: 'Yahualica' },
  { value: 'Zacualtipán de Ángeles', label: 'Zacualtipán de Ángeles' },
  { value: 'Zapotlán de Juárez', label: 'Zapotlán de Juárez' },
  { value: 'Zempoala', label: 'Zempoala' },
  { value: 'Zimapán', label: 'Zimapán' },
];
function Preregistro() {
  const { idUser } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  console.log(idUser)
  const [data, setData] = useState({
    ArchivoAval: "",
    ArchivoCURP: "",
    ArchivoComprobanteDomicilio: "",
    ArchivoINE: "",
    ArchivoRFC: "",
    ArchivoCredencialNotario: "",
    video: "",
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

  const [showModalTerminos, setShowModalTerminos] = useState(false);
  const handleModalTerminosOpen = () => setShowModalTerminos(true);
  const handleModalTerminosClose = () => setShowModalTerminos(false);

  const [showModalRevovacion, setShowModalRevovacion] = useState(false);
  const handleModalRevovacionOpen = () => setShowModalRevovacion(true);
  const handleModalRevovacionClose = () => setShowModalRevovacion(false);

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
            key === "video" 
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
      doc.text(dataAsync.secretaria !== "" ? dataAsync.secretaria : 'No Aplica', secretariaCoords.x, secretariaCoords.y);



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
      axios.post('${apiUrl}/usuario/enviarSolicitud', formData, {
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
  const [video, setVideo] = useState(null);
  const [valor, setValor] = useState(null);



  const [isResponsavilidadUso, setIsResponsavilidadUso] = useState(false);
  const [isAceptaCorreo, setIsAceptaCorreo] = useState(false);
  const [isPoliticas, setIsPoliticas] = useState(false);
  const [isRevocacion, setIsRevocacion] = useState(false);
  const [confirma_correo, setConfirma_Correo] = useState('');
  const [correosCoinciden, setCorreosCoinciden] = useState(true);
  const [confirma_contrasena, setConfirma_Contrasena] = useState('');
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmaContrasena, setMostrarConfirmaContrasena] = useState(false);

 
  const [error, setError] = useState('');
 
    // Función para verificar si todas las casillas de verificación están marcadas
    const todasSeleccionadas = () => {
      // Verificar el estado de todas las variables de estado y devolver true si todas están marcadas
      return video != null && ArchivoINE != null && ArchivoComprobanteDomicilio != null && ArchivoCURP != null && ArchivoRFC != null && ArchivoAval != null && tipoEntidad != null && entidad != null  && direccion != null && municipio_direccion != null && estado != null && cp != null && puesto != null && area != null && telefono != null && correo != null && confirma_correo != null &&  isResponsavilidadUso != null && isPoliticas != null /* Agregar el resto de tus variables de estado */;
    
  };
  

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

  const handleArchivoCURPChange = async(e) => {
    const formData = new FormData();
    formData.append('pdf', e.target.files[0]);

    try {
      const response = await fetch(`${apiUrl}/extractDataFromPdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Solo es permitido el archivo expedido por la página oficial.",
          icon: "error"
      });
        throw new Error('Error al procesar el archivo PDF');
      }
      else{
        setArchivoCURP(e.target.files[0]);
        const data = await response.json(response.json)
        setNombre(data.Nombre)
        setCurp(data.CURP)
      }
;
      //console.log('Datos extraídos del PDF:', data);
      // Aquí puedes actualizar el estado de tu componente React con los datos extraídos
    } catch (error) {
      console.error('Error al enviar el archivo PDF:', error.message);
      // Manejar el error en tu aplicación React
    }
  };
  const handleArchivoRFCChange = async(e) => {
    const formData = new FormData();
    formData.append('pdf', e.target.files[0]);

    try {
      const response = await fetch(`${apiUrl}/extractRFC`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setArchivoRFC(e.target.files[0]);
      }
      else{
        setArchivoRFC(e.target.files[0]);
        const data = await response.json(response.json)
        setRfc(data.RFC)
      }
;
      //console.log('Datos extraídos del PDF:', data);
      // Aquí puedes actualizar el estado de tu componente React con los datos extraídos
    } catch (error) {
      console.error('Error al enviar el archivo PDF:', error.message);
      // Manejar el error en tu aplicación React
    }
  };
  const handleArchivoAvalChange = (e) => {
    setArchivoAval(e.target.files[0]);
  };
  const handleArchivoCredencialNotarioChange = (e) => {
    setArchivoCredencialNotario(e.target.files[0]);
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

  const curpSubido = () => {
    if (ArchivoCURP) {
      return true;
    } else {
      setError('Debes subir el archivo CURP.');
      return false;
    }
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
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint;
    handleCloseModal();

  if (idUser != null) {
    endpoint = `${apiUrl}/usuario/preregistro/${idUser}`;
  } else {
    endpoint = `${apiUrl}/usuario/preregistro`;
  }

    axios.post(endpoint, Formulario)
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (response.status === 201) {
          sendDocuments(response.data)
        }
        
        
    })
    .catch(error => {
        // Manejar errores
        console.error('Error al enviar el formulario:', error);
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un estado diferente a 2xx
          if (error.response.status === 409) {
              Swal.fire({
                  title: "Error",
                  text: "El correo electrónico ya está en uso.",
                  icon: "error"
              });
            }
          }
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
    documentos.push(video)
    documentos.push(ArchivoINE)
    documentos.push(ArchivoComprobanteDomicilio)
    documentos.push(ArchivoCURP)
    documentos.push(ArchivoRFC)
    documentos.push(ArchivoAval)
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
        const response = await axios.post(`${apiUrl}/upload`, f,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          Swal.fire({
              title: "Solicitud enviada",
              text: "La solicitud ha sido enviada, por favor espere a que sea validada",
              icon: "success",
              allowOutsideClick: false
          }).then(() => {
              // Redirigir a otra página después de que el usuario cierre el alert
              window.location.href = '/'; // Cambia esta ruta por la ruta de redirección deseada
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

  const [correo_place, setCorreo_place] = useState(null)

  const [valorCP, setValorCP] = useState(null);

  const handleChange = (selectedOption) => {
    console.log(selectedOption)
    setMunicipio_Direccion(selectedOption.value);
    setValor(selectedOption);
    console.log(municipio_direccion)
  };

  const handleChangeCP = (selectedOption) => {
    console.log(selectedOption)
    setcp(selectedOption.value);
    setValorCP(selectedOption);
    console.log(municipio_direccion)
  };

  useEffect(() => {
    console.log("Municipio seleccionado:", municipio_direccion);
    console.log("CP seleccionado:", cp);
  }, [municipio_direccion,cp]);

  useEffect(() => {
    if(idUser){
      fetch(`${apiUrl}/usuario/UsuarioExiste/${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setCorreo_place(data.correo)
          setCorreo(data.correo)
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  }, []);

 

  return (
    <div className="contenedor">
      <Heder />
      <WizardStepsInicial />
      <div className="titulo_3">
        Ingrese sus Datos
      </div>

      <div className='formulario'>

        <div className='titulo_formulario'>
          1.- Video de Identificación
        </div>

        <div className='text_formulario is-required' style={{ fontWeight:'bold' }}>
        Video con fondo blanco donde el solicitante establece nombre, cargo, área de adscripción e institución laboral. (Max 10mb)
        </div>

        
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className="custom-file-label">
        Seleccionar Archivo
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="custom-file-input"
          required
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

        <div style={{ fontWeight: 'bold' }} className='text_formulario is-required'>
        El formato permitido para los archivos es .pdf (se permite hasta 1MB en total para todos los archivos).
        </div>

        <div className='text_pdf is-required'>
        <span style={{ fontWeight: 'bold' }}>Indentificación Oficial con Fotografía Vigente</span>
        (INE o Pasaporte o Cédula Profesional)
        </div>
        
        <div className="files">
            <label className="custom-file-label " style={{ marginTop: '6%' }}>
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

        <div className='text_pdf is-required'>
        <span style={{ fontWeight: 'bold', marginBottom:'2%' }}>Comprobante de Domicilio Laboral no mayor a 3 meses</span>
        (Recibo de Teléfono o Agua Potable o Luz)
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

        <div className='text_pdf is-required'>
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

        <div className='text_pdf is-required'>
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

        <div className='text_pdf is-required'>
        <span style={{ fontWeight: 'bold' }}>Documento que lo Avala como Servidor Público o Notario Público </span>Vigente
       
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

        <div className='text_pdf is-required'>
        <span style={{ fontWeight: 'bold' }}>Trámite de Certificación Digital</span>  
        </div>
        
        <div className="checkboxes ">
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
              disabled
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
              <div className="text_formulario is-required">
                <span style={{ fontWeight: 'bold' }}>Causa de Solicitud</span>
              </div>

          
          <div className="select">
          <select style={{ marginRight: '2%' }} value={causa_de_solicitud} onChange={(e) => setcausa_de_solicitud(e.target.value)} requried isSearchable={true}>
          <option value="Sospecha de utilización de la clave privada, contraseña o de la propia firma electrónica avanzada por parte de un tercero no autorizado">Sospecha de utilización de la clave privada, contraseña o de la propia firma electrónica avanzada por parte de un tercero no autorizado</option>
          <option value="A solicitud del titular del certificado, cuando requiera la modificación de alguno de los datos contenidos en el mismo">A solicitud del titular del certificado, cuando requiera la modificación de alguno de los datos contenidos en el mismo</option>
          <option value="Cuando la Autoridad Certificadora lo estime conveniente">Cuando la Autoridad Certificadora lo estime conveniente</option>
          <option value="Fallecimiento del titular o incapacidad jurídica declarada por una Autoridad competente">Fallecimiento del titular o incapacidad jurídica declarada por una Autoridad competente</option>
          <option value="Expiración de su vigencia">Expiración de su vigencia</option>
          <option value="Pérdida, robo o inutilización del certificado de firma electrónica avanzada">Pérdida, robo o inutilización del certificado de firma electrónica avanzada</option>
          <option value="A solicitud del titular del certificado de la firma electrónica avanzada">A solicitud del titular del certificado de la firma electrónica avanzada</option>
          <option value="Terminación del empleo, cargo o comisión del servidor público, por el cual le haya sido concedida el uso de la firma electrónica avanzada.">Terminación del empleo, cargo o comisión del servidor público, por el cual le haya sido concedida el uso de la firma electrónica avanzada.</option>
          <option value="Olvido o pérdida de contraseña.">Olvido o pérdida de contraseña.</option>
          <option value="Cuando se observen inexactitudes en los datos aportados por el firmante para la obtención del certificado de la firma electrónica avanzada">Cuando se observen inexactitudes en los datos aportados por el firmante para la obtención del certificado de la firma electrónica avanzada</option>
          <option value="Por haberse comprobado que al momento de la expedición del certificado de firma electrónica avanzada no cumplió con los requisitos que marca esta Ley">Por haberse comprobado que al momento de la expedición del certificado de firma electrónica avanzada no cumplió con los requisitos que marca esta Ley</option>
          <option value="Uso indebido o ilícito del certificado de firma electrónica o de la firma electrónica avanzada">Uso indebido o ilícito del certificado de firma electrónica o de la firma electrónica avanzada</option>
  
          </select>
               
               </div>
  
             
            </div>
          )}

        <div className='text_formulario is-required is-required'>
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
            <div className="text_pdf is-required">
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
        
        {/*<div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Secretaría</span>  
        </div>

        <div className="inputs">
         <input style={{ width: '96%', marginBottom:'1%' }} type="text" value={secretaria} onChange={(e) => setSecretaria(e.target.value)} placeholder="Secretaría" />
        </div>*/}
      
        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Sector Público</span>  
        </div>
       
        <div className="select">
        <select style={{ marginRight: '2%', width:'48%' }} value={tipoEntidad} onChange={(e) => setTipoEntidad(e.target.value)} isSearchable={true}>
        <option value="">SELECCIONE EL SECTOR QUE LE CORRESPONDA</option>
        <option value="DEPENDENCIA_DEL_GOBIERNO_ESTATAL">DEPENDENCIA DEL GOBIERNO ESTATAL</option>
        <option value="ENTIDAD_PARAESTATAL">ENTIDAD PARAESTATAL</option>
        <option value="ENTIDAD_MUNICIPAL_ESTATAL">ENTIDAD MUNICIPAL ESTATAL</option>
        <option value="H_AYUNTAMIENTO_MUNICIPAL_ESTATAL">H. AYUNTAMIENTO MUNICIPAL ESTATAL</option>
        <option value="NOTARIA_PUBLICA_ESTATAL">NOTARÍA PÚBLICA ESTATAL</option>
        <option value="ORGANISMO_DESCONCENTRADO_ESTATAL">ORGANISMO DESCONCENTRADO ESTATAL</option>
        <option value="ORGANISMO_AUTONOMO">ORGANISMO AUTÓNOMO</option>
        {/* Agrega las opciones que necesites */}
      </select>

      <input className="uppercase-input" type="text" value={secretaria} onChange={(e) => setSecretaria(e.target.value)} placeholder="Escriba el nombre DE SU INSTITUCIÓN" />
        </div>

        
        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Nombre completo</span>  
        </div>

        <div className="inputs">
         <input className="uppercase-input" style={{ width: '95%', marginBottom:'1%', marginRight:'2%' }} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre(s), Apellido paterno y apellido materno" />
         {/*<input style={{ width: '29%', marginBottom:'1%', marginRight:'2%' }} type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} placeholder="  Apellido Paterno" />
         <input style={{ width: '29%', marginBottom:'1%' }} type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} placeholder="  Apellido Materno" />*/}
        </div>

        
        <div style={{ display: 'inline-block', width: '55%', fontWeight: 'bold' }}>
          <span className='text_formulario is-required' style={{ float: 'left' }}>CURP</span>
          <span className='text_formulario is-required' style={{ float: 'right' }}>RFC</span>
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
          placeholder="RFC con homoclave"
        />
        </div>
        
       

        <div className='titulo_formulario'>
          3.- Dirección como aparece en comprobante de domicilio
        </div>

        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Calle, Número Interior o Exterior y Colonia o Barrio</span>  
        </div>

        <div className="inputs">
         <input className="uppercase-input" style={{ width: '96%', marginBottom:'1%' }} type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, Número interior o Exterior y Colonia o Barrio" />
        </div>


        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Estado</span>  
        </div>

          <select style={{ marginRight: '2%', width:'30%'}} value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">ESTADO</option>
            <option value="HIDALGO">HIDALGO</option>
          </select>

         


        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Municipio</span>  
        </div>
       
        <div className="select">
        <Select
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            border: '1px solid #383737',
            borderRadius: '10px',
            padding: '0px',
            fontSize: '16px',
            height: 'px',
            width: '30%',
            fontFamily: "'Montserrat', sans-serif"
          }),
          option: (provided) => ({
            ...provided,
            backgroundColor: '#d9d9d9',
            color: '#383737',
            fontSize: '16px',
            width: '100%',
            fontFamily: "'Montserrat', sans-serif"
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#383737',
            fontSize: '16px',
            fontFamily: "'Montserrat', sans-serif"
          }),
          menu: (provided) => ({
            ...provided,
            width: '30%',
            zIndex: 9999
          })
        }}
        value={valor}
        onChange={handleChange}
        options={municipios}
        isSearchable={true}
        placeholder="SELECCIONA MUNUCIPIO"
      />
            {/* Agrega las opciones que necesites */}
            


        </div>
        <div className='text_formulario is-required'>
        <span style={{ fontWeight: 'bold' }}>Código Postal</span>  
        </div>
          <Select
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: 'white',
          border: '1px solid #383737',
          borderRadius: '10px',
          padding: '0px',
          fontSize: '16px',
          width: '30%',
          fontFamily: "'Montserrat', sans-serif"
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: '#d9d9d9',
          color: '#383737',
          fontSize: '16px',
          width: '100%',
          fontFamily: "'Montserrat', sans-serif"
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#383737',
          fontSize: '16px',
          fontFamily: "'Montserrat', sans-serif"
        }),
        menu: (provided) => ({
          ...provided,
          width: '30%',
          zIndex: 9999
        })
      }}
      value={valorCP}
      onChange={handleChangeCP}
      options={cpOptions} // Aquí es donde deberías tener las opciones para el código postal
      isSearchable={true}
      placeholder="CÓDIGO POSTAL"
    />

        <div className='titulo_formulario'>
          4.- Información Personal
        </div>

        <div style={{ display: 'inline-block', width: '58%', fontWeight: 'bold' }}>
          <span className='text_formulario is-required' style={{ float: 'left' }}>Puesto</span>
          <span className='text_formulario is-required' style={{ float: 'right' }}>Área</span>
        </div> 


        <div className="inputs">
        <input
        className="uppercase-input"
          style={{ marginRight: '2%' }}
          type="text"
          value={puesto}
          onChange={(e) => setPuesto(e.target.value)}
          placeholder="Puesto"
        />
        <input
        className="uppercase-input"
          style={{ marginRight: '1%' }}
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Área de adscripción"
        />
        </div>


        <div style={{ display: 'inline-block', width: '45%', fontWeight: 'bold' }}>
          <span className='text_formulario is-required' style={{ float: 'left' }}>Teléfono (10 dígitos)</span>        
          <span className='text_formulario is-required' style={{ float: 'right' }}>Extensión</span>
        </div> 
        

        <div className="inputs">
          
        <input
          style={{ width: '25%', marginRight: '2%' }}
          type="number"
          value={telefono}
          onChange={(e) => {
            const value = e.target.value.slice(0, 10); // Limita el valor a 18 caracteres
            setTelefono(value);
          }}
          maxLength={10} // Restringe la entrada a 18 caracteres
          placeholder="TELÉFONO"
        />

        <input
          style={{ width: '17%' }}
          type="number"
          value={extencion}
          onChange={(e) => {
            const value = e.target.value.slice(0, 4); // Limita el valor a 18 caracteres
            setExtencion(value);
          }}
          maxLength={4} // Restringe la entrada a 18 caracteres
          placeholder="EXTENSIÓN"
        />
        </div>


        <div style={{ display: 'inline-block', width: '90%', fontWeight: 'bold' }}>
          <span className='text_formulario is-required' style={{ float: 'left' }}>Correo Electrónico </span>        
          {/*<span className='text_formulario is-required' style={{ float: 'right' }}>Confirme su Correo Electrónico</span>*/}
        </div> 

        <div className="inputs">
        <input
          style={{ marginRight: '2%' }}
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
        />

        {/*<input
          type="text"
          value={confirma_correo}
          onChange={(e) => {
            const value = e.target.value;
            setConfirma_Correo(value);
            setCorreosCoinciden(value === correo); // Compara con el primer correo
          }}
          placeholder="Confirme su correo"
          className={!correosCoinciden ? 'rojo' : ''} // Agrega una clase rojo si los correos no coinciden
        />*/}
        </div>

        <div style={{  marginTop: '2%' }} className="checkboxes">
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isAceptaCorreo} onChange={() => setIsAceptaCorreo(!isAceptaCorreo)} />
                <span className="checkbox-text">Acepto que este correo unicamente será el que reciba los mensajes y documentos relacionados con el tramite.</span>

            </label>
        </div>
        <div style={{ /* marginTop: '2%' */}} className="checkboxes">
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isResponsavilidadUso} onChange={() => setIsResponsavilidadUso(!isResponsavilidadUso)} />
                <span className="checkbox-text">Acepto la&nbsp;
                <span
              className="link-text"
              onClick={handleModalTerminosOpen}
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                   Responsabilidad del uso de la Firma Electrónica.</span>
                   </span>

            </label>
        </div>
        <div className="checkboxes">
            <label style={{  fontSize: '0.7em', }} className="checkbox-label">
                <input style={{  width: '10px', height:'10px' }} type="checkbox" checked={isPoliticas} onChange={() => setIsPoliticas(!isPoliticas)} />
                <span className="checkbox-text">
                  He leído y acepto las políticas de&nbsp;
                  <a href="https://gobierno.hidalgo.gob.mx/AvisoPrivacidad" target="_blank" rel="noopener noreferrer">
                    Aviso de Privacidad
                  </a>.
                </span>
            </label>
        </div>
        <div className="checkboxes" style={{ display: 'none' }}>
            <label style={{  fontSize: '0.7em' }} className="checkbox-label">
                <input disabled style={{  width: '10px', height:'10px' }} type="checkbox" checked={isRevocacion} onChange={() => setIsRevocacion(!isRevocacion)} />
                <span className="checkbox-text">He leído y acepto la Responsabilidad de la&nbsp;</span> .
                <span
              className="link-text"
              onClick={handleModalRevovacionOpen}
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                Revocación del Certificado de Firma Electrónica
                </span>
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

<Modal show={showModalRevovacion} onHide={handleModalRevovacionClose} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>Aceptación de Revocación de Certificado Digital de la Firma Electrónica Avanzada</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p className='texto_modal'>Con fundamento en Capítulo V en el artículo 23 fracción II de la Ley Sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de Hidalgo, ante la Dirección General de Innovación Gubernamental, a quien en lo sucesivo se le denominará como “Autoridad Certificadora” (AC), facultado para la emisión, renovación, suspensión y extinción de los Certificados Digitales de Firma Electrónica Avanzada, por lo que el solicitante manifiesta la suspensión o extinción de su certificado digital al agente certificador, dado a que se ha suscitado alguno de los supuestos expresados en el Capítulo IX, artículo 47, Capítulo XI artículo 56 de la Ley Sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de Hidalgo, para que este realice la solicitud a dicha autoridad certificadora de acuerdo Capítulo VIII al artículo 45, Fracción VI de referida ley.
</p>
  </Modal.Body>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleModalRevovacionClose}>Atrás</Button>
  </Modal.Footer>
</Modal>

<Modal show={showModalTerminos} onHide={handleModalTerminosClose} centered backdrop="static">
  <Modal.Header >
    <Modal.Title className='titulo_modal'>Aceptación de Responsabilidad del Uso de la Firma Electrónica Avanzada</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p className='texto_modal'>Con fundamento en el Capítulo V en el artículo 23 fracción II y III de la Ley Sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de Hidalgo, ante la Dirección General de Innovación Gubernamental, a quien en lo sucesivo se le denominará como “Autoridad Certificadora” (AC), facultado para la emisión de Certificados Digitales de Firma Electrónica Avanzada; en el Capítulo II en el artículo 4, 5 y 7, acepta efectuar la solicitud a través de este medio electrónico, en el Capítulo V artículo 24, fracción II, certifica que, usted ha cumplido con la documentación soporte conforme al artículo 12 del Reglamento de la Ley Sobre el Uso De Medios Electrónicos y Firma Electrónica Avanzada para el Estado de Hidalgo para la Expedición del Certificado Digital, el cual lo identifica como FIRMANTE y de igual manera declara:
    <br />a) Ser servidor público activo del Estado de Hidalgo.
    <br />b) Que es su voluntad hacer uso del servicio de Certificación en línea, para obtener ante esta Autoridad Certificadora del Poder Ejecutivo del Estado su archivo de Firma Electrónica Avanzada.
    <br />c) Aceptar plena responsabilidad en caso de que se presente cualquier situación que pudiera implicar la reproducción o el uso indebido de la Firma Electrónica Avanzada, en tanto no se revoque.
    <br />d) Es responsabilidad del Titular de la Firma Electrónica Avanzada, resguardar su Certificado Digital, la clave privada y la selección del medio de almacenamiento de esta.
</p>
  </Modal.Body>

  <Modal.Footer>
    <Button className="boton_modal" variant="secondary" onClick={handleModalTerminosClose}>Atrás</Button>
  </Modal.Footer>
</Modal>
    </div>
    </div>
  );
}

export default Preregistro;
