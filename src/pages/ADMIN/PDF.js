// import React, { useState } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import montserratRegular from '../../Fonts/Montserrat-Regular.ttf'; // Ruta relativa a la fuente dentro del proyecto
// import montserratBold from '../../Fonts/Montserrat-Bold.ttf'; // Ruta relativa a la fuente dentro del proyecto
// import '../../css/pdf.css'; // Asegúrate de tener la ruta correcta al archivo CSS
// import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto

// const PDFGenerator = () => {

//   const currentDate = new Date();
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   const formattedDate = currentDate.toLocaleDateString('es-MX', options);
//   const apiUrl = process.env.REACT_APP_API_URL;


//   /*const [data, setData] = useState({
//     municipio_direccion: 'Pachuca de Soto',
//     fecha: formattedDate,
//     notario:'true',
//     servidor:'true',
//     secretaria:'Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado de Hidalgo',
//     entidad:'Dirección General de Innovación Gubernamental',
//     nombre:'Jesús Adolfo Márquez Trejo',
//     puesto:'Agente Certificador',
//     RFC:'MATJ010717D40',
//     CURP:'MATJ010717HPLRRSA3',
//     correo:'jesus.marquez@hidalgo.gob.mx',
//     telefono:'797-140-58-61',
//     extencion:'6453',
//     direccion:'Blvd. Felipe Angeles, Km. 93.50, Centro Minero, Edificio 1B, Col, Venta Prieta', 
//     estado:'HIDALGO',
//     cp:'42000',
//     ine:'true',
//     ComprobanteDomicilio:'true',
//     ArchivoCURP:'true', 
//     ArchivoRFC:'true',
//     ArchivoAval:'true',
//     ArchivoNotario:'false',

//     // Agrega más datos de muestra según sea necesario
//   });*/

//   const [data, setData] = useState({})

//   // Estados para controlar las coordenadas de cada dato
//   const [municipio_direccionCoords, setMunicipioCoords] = useState({ x: 112, y: 45 });
//   const [fechaCoords, setFechaCoords] = useState({ x: 163, y: 45 });
//   const [notarioCoords, setnotarioCoords] = useState({ x: 170, y: 60 });
//   const [servidorCoords, setservidorCoords] = useState({ x: 129, y: 60 });
//   const [secretariaCoords, setsecretariaCoords] = useState({ x: 20, y: 80 });
//   const [entidadCoords, setentidadCoords] = useState({ x: 32, y: 90 });
//   const [nombreCoords, setnombreCoords] = useState({ x: 58, y: 100 });
//   const [puestoCoords, setpuestoCoords] = useState({ x: 37, y: 110 });
//   const [RFCCoords, setRFCCoords] = useState({ x: 30, y: 120 });
//   const [CURPCoords, setCURPCoords] = useState({ x: 124, y: 120 });
//   const [correoCoords, setcorreoCoords] = useState({ x: 58, y: 130 });
//   const [telefonoCoords, settelefonoCoords] = useState({ x: 40, y: 140 });
//   const [extencionCoords, setextencionCoords] = useState({ x: 132, y: 140 });
//   const [direccionCoords, setdireccionCoords] = useState({ x: 20, y: 160 });
//   const [municipio_direccionCoords2, setMunicipioCoords2] = useState({ x: 42, y: 170 });
//   const [estadoCoords, setestadoCoords] = useState({ x: 108, y: 170 });
//   const [cpCoords, setcpCoords] = useState({ x: 175, y: 170 });
//   const [ineCoords, setineCoords] = useState({ x: 175, y: 210 });
//   const [ComprobanteDomicilioCoords, setComprobanteDomicilioCoords] = useState({ x: 175, y: 215 });
//   const [ArchivoCURPCoords, setArchivoCURPCoords] = useState({ x: 175, y: 220 });
//   const [ArchivoRFCCoords, setArchivoRFCCoords] = useState({ x: 175, y: 225 });
//   const [ArchivoAvalCoords, setArchivoAvalCoords] = useState({ x: 175, y: 230 });
//   const [ArchivoNotarioCoords, setArchivoNotarioCoords] = useState({ x: 175, y: 235 });

//   const fetchData = async (id) => {
//     try {
//       const response = await axios.get(`${apiUrl}/usuario/getDataPDF/3`);
      
//       const responseData = response.data.data;

//       // Objeto para almacenar los datos convertidos a string
//       const stringifiedData = {};

//       // Iterar sobre las propiedades del objeto responseData
//       for (const key in responseData) {
//         if (Object.hasOwnProperty.call(responseData, key)) {
//           // Convertir el valor de la propiedad a string y almacenarlo en el nuevo objeto
//           stringifiedData[key] = String(responseData[key]);
          
//           // Verificar si el valor es "null" o el texto "null"
//           if (
//             key === "ArchivoAval" ||
//             key === "ArchivoCURP" ||
//             key === "ArchivoComprobanteDomicilio" ||
//             key === "ArchivoINE" ||
//             key === "ArchivoRFC" ||
//             key === "ArchivoCredencialNotario" ||
//             key === "video" 
//           ) {
//             // Si el valor es "null" o el texto "null", asignar "false" al nuevo objeto
//             stringifiedData[key] = (responseData[key] === "null" || responseData[key] === null) ? "false" : "true";
//           } 
//         }
//       }

//       setData(stringifiedData)
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const generatePDF = async () => {
//     if (data) {
//       console.log(data)
//       const doc = new jsPDF();

//       // Definir la fuente Montserrat
//       doc.addFileToVFS(montserratRegular);
//       doc.addFont(montserratRegular, 'Montserrat', 'normal');
//       doc.addFont(montserratBold, 'Montserrat-Bold', 'normal');

//       // Establecer Montserrat como la fuente predeterminada
//       doc.setFont('Montserrat');

//       // Agregar imagen como encabezado
//       doc.addImage(logo, 'PNG', 180, 5, 20, 25); // Ajusta las coordenadas y el tamaño según tus necesidades

//       // Agregar texto adicional al documento
//       doc.setTextColor(128, 128, 128); // Establece el color gris (RGB: 128, 128, 128)
//       doc.setFontSize(8); // Establece el tamaño de letra más pequeño
//       doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
//       doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);

//       doc.setFont('Montserrat-Bold');
//       doc.setTextColor(0, 0, 0);
//       doc.setFontSize(12); // Establece el tamaño de letra más pequeño
//       doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
//       doc.text('SOLICITUD DE CERTIFICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 22, 35);

//       doc.setFont('Montserrat');
//       doc.setFontSize(10);
//       doc.text('Hidalgo a ', 144, 45);
//       doc.text(',', 142, 45);
//       doc.text(data.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
//       doc.text(formattedDate, fechaCoords.x, fechaCoords.y);

      
//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(12);
//       doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
//       doc.setFontSize(10);
//       doc.text('Servidor Público  (   )     Notario Público  (   )', 95, 60);
//       doc.text(data.isNotary === 'true' ? 'X' : '', notarioCoords.x, notarioCoords.y);
//       doc.text(data.isServer === 'true' ? 'X' : '', servidorCoords.x, servidorCoords.y);
      
//       doc.text('Razón Social', 20, 70);
//       doc.setFont('Montserrat');
//       doc.setFontSize(8);
//       doc.text('(Dependencia o Entidad Paraestatal o H. Ayuntamiento Entidad Municipal o Notaría Pública u Organismo)', 45, 70);
//       doc.setFontSize(10);
//       doc.text(data.secretaria !== "null" ? data.secretaria : 'No Aplica', secretariaCoords.x, secretariaCoords.y);



//       doc.setFont('Montserrat-Bold');
//       doc.text('Área:', 20, 90);
//       doc.setFont('Montserrat');
//       doc.text(data.entidad, entidadCoords.x, entidadCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Nombre Completo:', 20, 100);
//       doc.setFont('Montserrat');
//       doc.text(data.nombre, nombreCoords.x, nombreCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Puesto:', 20, 110);
//       doc.setFont('Montserrat');
//       doc.text(data.puesto, puestoCoords.x, puestoCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('RFC: ', 20, 120);
     
//       doc.setFont('Montserrat');
//       doc.setFontSize(10);
//       doc.text(data.rfc, RFCCoords.x, RFCCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('CURP: ', 110, 120);
//       doc.setFont('Montserrat');
//       doc.text(data.curp, CURPCoords.x, CURPCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Correo Electrónico:', 20, 130);
//       doc.setFont('Montserrat');
//       doc.text(data.correo, correoCoords.x, correoCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Teléfono: ', 20, 140);
//       doc.setFont('Montserrat');
//       doc.setFontSize(10);
//       //doc.text(data.telefono, telefonoCoords.x, telefonoCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Extensión: ', 110, 140);
//       doc.setFont('Montserrat');
//       doc.text(data.extencion, extencionCoords.x, extencionCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(12);
//       doc.text('2.  DATOS DEL DOMICILIO DE TRABAJO', 15, 150);
//       doc.setFontSize(10);
//       doc.setFont('Montserrat');
//       doc.text(data.direccion, direccionCoords.x, direccionCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Municipio: ', 20, 170);
//       doc.setFont('Montserrat');
//       doc.text(data.municipio_direccion, municipio_direccionCoords2.x, municipio_direccionCoords2.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Entidad: ', 90, 170);
//       doc.setFont('Montserrat');
//       doc.text(data.estado, estadoCoords.x, estadoCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.text('Código Postal: ', 145, 170);
//       doc.setFont('Montserrat');
//       doc.text(data.cp, cpCoords.x, cpCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(12);
//       doc.text('3.  DOCUMENTOS DE IDENTIDAD', 15, 180);
//       doc.setFont('Montserrat');
//       doc.setFontSize(9.5);
//       doc.text('PARA OBTENER EL CERTIFICADO DIGITAL DE LA FIRMA ELECTRÓNICA AVANZADA ES NECESARIO QUE ', 20, 190);
//       doc.text('ENTREGUE,  JUNTO CON ESTA SOLICITUD,  LOS DOCUMENTOS QUE A CONTINUACIÓN SE INDICAN EN ', 20, 195);
//       doc.text('ORIGINAL, ', 20, 200);
//       doc.setFont('Montserrat-Bold');
//       doc.text('MARCANDO CON UNA "X"  ', 39, 200);
//       doc.setFont('Montserrat');
//       doc.text('EN LA DOCUMENTACIÓN PROPORCIONADA.', 86, 200);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('a) IDENTIFICACIÓN OFICIAL CON FOTOGRAFÍA                                                                 [       ]', 20, 210);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoINE === 'true' ? 'X' : '', ineCoords.x, ineCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('b) COMPROBANTE DE DOMICILIO                                                                                         [       ]', 20, 215);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoComprobanteDomicilio === 'true' ? 'X' : '', ComprobanteDomicilioCoords.x, ComprobanteDomicilioCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('c) CLAVE ÚNICA DE REGISTRO DE POBLACIÓN                                                                 [       ]', 20, 220);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoCURP === 'true' ? 'X' : '', ArchivoCURPCoords.x, ArchivoCURPCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('d) REGISTRO FEDERAL DE CONTRIBUYENTES                                                                    [       ]', 20, 225);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoRFC === 'true' ? 'X' : '', ArchivoRFCCoords.x, ArchivoRFCCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('e) DOCUMENTO QUE LO AVALA COMO SERVIDOR O NOTARIO PÚBLICO                   [       ]', 20, 230);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoAval === 'true' ? 'X' : '', ArchivoAvalCoords.x, ArchivoAvalCoords.y);

//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('f) CREDENCIAL DE NOTARIO PÚBLICO                                                                                 [       ]', 20, 235);
//       doc.setFont('Montserrat');
//       doc.text(data.ArchivoCredencialNotario === 'true' ? 'X' : '', ArchivoNotarioCoords.x, ArchivoNotarioCoords.y);
      
//       doc.setFont('Montserrat-Bold');
//       doc.setFontSize(10);
//       doc.text('DECLARO BAJO PROTESTA DE DECIR VERDAD QUE LOS DATOS ', 45, 250);
//       doc.text('CONTENIDOS EN ESTA SOLICITUD SON CIERTOS ', 59, 255);
//       doc.setFont('Montserrat');
//       doc.text('______________________________________________________________________________ ', 35, 270);
//       doc.setTextColor(128, 128, 128);
//       doc.text('FIRMA ', 100, 275);

//       doc.setFontSize(8);
//       doc.text('Palacio de Gobierno 1er Piso, Plaza Juárez s/n, Col. Centro, Pachuca de Soto, Hidalgo, México, C.P. 42000 ', 32, 285);
//       doc.text('Tel.: (800) 623 47 62         http://firmaelectronica.hidalgo.gob.mx', 60, 290);
      



//       // Obtener el PDF como Data URI
//       const pdfDataUri = doc.output('datauristring');


//       // Abrir una nueva ventana y mostrar el PDF
//       const newWindow = window.open();
//       newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
//     } else {
//       console.error('No data available.');
//     }
//   };

//   return (
//     <div className="button-container">
//       <button className="salmon-button" onClick={fetchData}>Obtener datos</button>
//       <button className="vegetable-button" onClick={generatePDF}>Generar PDF</button>
//     </div>
//   );
// };

// export default PDFGenerator;


// PDF NUEVO HJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Heder from '../heder';
import '../../css/Verificar_Datos.css';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import montserratRegular from '../../Fonts/Montserrat-Regular.ttf'; // Ruta relativa a la fuente dentro del proyecto
import montserratBold from '../../Fonts/Montserrat-Bold.ttf'; // Ruta relativa a la fuente dentro del proyecto
import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto
import axios from 'axios';


function Verificar_Datos() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('es-MX', options);
  const apiUrl = process.env.REACT_APP_API_URL;



  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]); 

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
  const [isEmail, setIsEmail] = useState(false);
  const [isIde, setIsIde] = useState(false);
  const [isCD, setIsCD] = useState(false);
  const [isCURP, setIsCURP] = useState(false);
  const [isDRFC, setIsDRFC] = useState(false);
  const [isAval, setIsAval] = useState(false);
  const [comentarios, setComentarios] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [tipoArchivo, settipoArchivo] = useState('pdf');

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

  const convertObjectToString = () => {

    const stringifiedData = {};

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        // Convertir el valor de la propiedad a string y almacenarlo en el nuevo objeto
        stringifiedData[key] = String(data[key]);
        
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
          stringifiedData[key] = (data[key] === "null" || data[key] === null) ? "false" : "true";
        } 
      }
    }

    return stringifiedData
  }

  const generatePDF = async () => {

    var data = convertObjectToString()
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
    doc.text(data.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
    doc.text(formattedDate, fechaCoords.x, fechaCoords.y);

    
    doc.setFont('Montserrat-Bold');
    doc.setFontSize(12);
    doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
    doc.setFontSize(10);
    doc.text('Servidor Público  (   )     Notario Público  (   )', 95, 60);
    doc.text(data.isNotary === 'true' ? 'X' : '', notarioCoords.x, notarioCoords.y);
    doc.text(data.isServer === 'true' ? 'X' : '', servidorCoords.x, servidorCoords.y);
    
    doc.text('Razón Social', 20, 70);
    doc.setFont('Montserrat');
    doc.setFontSize(8);
    doc.text('(Dependencia o Entidad Paraestatal o H. Ayuntamiento Entidad Municipal o Notaría Pública u Organismo)', 45, 70);
    doc.setFontSize(10);
    doc.text(data.secretaria !== "null" ? data.secretaria : 'No Aplica', secretariaCoords.x, secretariaCoords.y);



    doc.setFont('Montserrat-Bold');
    doc.text('Área:', 20, 90);
    doc.setFont('Montserrat');
    doc.text(data.area, entidadCoords.x, entidadCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Nombre Completo:', 20, 100);
    doc.setFont('Montserrat');
    doc.text(data.nombre, nombreCoords.x, nombreCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Puesto:', 20, 110);
    doc.setFont('Montserrat');
    doc.text(data.puesto, puestoCoords.x, puestoCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('RFC: ', 20, 120);
   
    doc.setFont('Montserrat');
    doc.setFontSize(10);
    doc.text(data.rfc, RFCCoords.x, RFCCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('CURP: ', 110, 120);
    doc.setFont('Montserrat');
    doc.text(data.curp, CURPCoords.x, CURPCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Correo Electrónico:', 20, 130);
    doc.setFont('Montserrat');
    doc.text(data.correo, correoCoords.x, correoCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Teléfono: ', 20, 140);
    doc.setFont('Montserrat');
    doc.setFontSize(10);
    doc.text(data.telefono, telefonoCoords.x, telefonoCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Extensión: ', 110, 140);
    doc.setFont('Montserrat');
    doc.text(data.extencion, extencionCoords.x, extencionCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(12);
    doc.text('2.  DATOS DEL DOMICILIO DE TRABAJO', 15, 150);
    doc.setFontSize(10);
    doc.setFont('Montserrat');
    doc.text(data.direccion, direccionCoords.x, direccionCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Municipio: ', 20, 170);
    doc.setFont('Montserrat');
    doc.text(data.municipio_direccion, municipio_direccionCoords2.x, municipio_direccionCoords2.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Entidad: ', 90, 170);
    doc.setFont('Montserrat');
    doc.text(data.estado, estadoCoords.x, estadoCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.text('Código Postal: ', 145, 170);
    doc.setFont('Montserrat');
    doc.text(data.cp, cpCoords.x, cpCoords.y);

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
    doc.text(data.ArchivoINE === 'true' ? 'X' : '', ineCoords.x, ineCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(10);
    doc.text('b) COMPROBANTE DE DOMICILIO                                                                                         [       ]', 20, 215);
    doc.setFont('Montserrat');
    doc.text(data.ArchivoComprobanteDomicilio === 'true' ? 'X' : '', ComprobanteDomicilioCoords.x, ComprobanteDomicilioCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(10);
    doc.text('c) CLAVE ÚNICA DE REGISTRO DE POBLACIÓN                                                                 [       ]', 20, 220);
    doc.setFont('Montserrat');
    doc.text(data.ArchivoCURP === 'true' ? 'X' : '', ArchivoCURPCoords.x, ArchivoCURPCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(10);
    doc.text('d) REGISTRO FEDERAL DE CONTRIBUYENTES                                                                    [       ]', 20, 225);
    doc.setFont('Montserrat');
    doc.text(data.ArchivoRFC === 'true' ? 'X' : '', ArchivoRFCCoords.x, ArchivoRFCCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(10);
    doc.text('e) DOCUMENTO QUE LO AVALA COMO SERVIDOR O NOTARIO PÚBLICO                   [       ]', 20, 230);
    doc.setFont('Montserrat');
    doc.text(data.ArchivoAval === 'true' ? 'X' : '', ArchivoAvalCoords.x, ArchivoAvalCoords.y);

    doc.setFont('Montserrat-Bold');
    doc.setFontSize(10);
    doc.text('f) CREDENCIAL DE NOTARIO PÚBLICO                                                                                 [       ]', 20, 235);
    doc.setFont('Montserrat');
    doc.text(data.ArchivoCredencialNotario === 'true' ? 'X' : '', ArchivoNotarioCoords.x, ArchivoNotarioCoords.y);
    
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
    axios.post(`${apiUrl}/admin/enviarSolicitud`, formData, {
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

  const cargarPDF = (archivoSeleccionado) => {
    
    fetch(`${apiUrl}/admin/returnFile/${id}/${archivoSeleccionado}`)
        .then(response => response.blob())
        .then(blob => {
          setPdfBlob(URL.createObjectURL(blob));
        }).catch(error => console.error('Error al cargar el archivo:', error));
  };


  useEffect(() => {
    
    fetch(`${apiUrl}/admin/getData/${id}`)
      .then(response => response.json())
      .then(data => {
        setData(data.registroExistente);
        console.log(data.registroExistente)
        cargarPDF("ArchivoINE")
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []); 

  // Función para manejar el cambio de opción en el select
  const handleChangeSelect = (e) => {
    const selectedValue = e.target.value;
    cargarPDF(selectedValue)
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
    generatePDF()
      .then(() => {
        Swal.fire({
          title: "Documentos Enviados",
          text: "El usuario recibió solicitud, manual y .req",
          icon: "success"
        }).then(() => {
          // Redireccionar después de cerrar el SweetAlert
          window.location.href = '/admin&solicitudes'; // Reemplaza '/nueva-ruta' con la ruta deseada
        });
      })
      .catch(error => {
        console.error('Error al generar el PDF:', error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al enviar los documentos.",
          icon: "error"
        });
      });
    console.log('Formulario enviado');
  };


  const handleSubmit2 = (e) => {
    e.preventDefault();

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
      window.location.href = '/admin&solicitudes'; // Reemplaza '/nueva-ruta' con la ruta deseada
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
  window.location.href = '/admin&solicitudes'; // Reemplaza '/nueva-ruta' con la ruta deseada
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
     
    <Button className="boton_obtener" variant="secondary" onClick={handleCloseModal}>Atrás</Button>
    <Button  className="boton_generar" variant="primary" onClick={handleSubmit2}>Enviar</Button>

    <button className="salmon-button" onClick={data}>Obtener datos</button>
    <button className="vegetable-button" onClick={generatePDF}>Generar PDF</button>
    </div>

  );
}

export default Verificar_Datos;
