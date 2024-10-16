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
import logo from '../../Images/logo333.png'; // Ruta relativa a la imagen dentro del proyecto
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
  const [isFisico, setIsFisico] = useState(false);
  const [tipoArchivo, settipoArchivo] = useState('pdf');

  const [municipio_direccionCoords, setMunicipioCoords] = useState({ x: 112, y: 45 });
  const [fechaCoords, setFechaCoords] = useState({ x: 163, y: 45 });
  const [notarioCoords, setnotarioCoords] = useState({ x: 170, y: 60 });
  const [servidorCoords, setservidorCoords] = useState({ x: 129, y: 60 });
  const [fisicoCoords, setfisicoCoords] = useState({ x: 129, y: 60 });
  
  
  const [secretariaCoords, setsecretariaCoords] = useState({ x: 20, y: 80 });
  const [entidadCoords, setentidadCoords] = useState({ x: 32, y: 90 });
  const [nombreCoords, setnombreCoords] = useState({ x: 58, y: 100 });
  const [puestoCoords, setpuestoCoords] = useState({ x: 37, y: 110 });
  const [RFCCoords, setRFCCoords] = useState({ x: 65, y: 120 });
  const [CURPCoords, setCURPCoords] = useState({ x: 124, y: 120 });
  const [correoCoords, setcorreoCoords] = useState({ x: 58, y: 130 });
  const [telefonoCoords, settelefonoCoords] = useState({ x: 40, y: 140 });
  const [extencionCoords, setextencionCoords] = useState({ x: 132, y: 140 });
  const [direccionCoords, setdireccionCoords] = useState({ x: 20, y: 160 });
  const [municipio_direccionCoords2, setMunicipioCoords2] = useState({ x: 42, y: 170 });
  const [estadoCoords, setestadoCoords] = useState({ x: 135, y: 170 });
  const [cpCoords, setcpCoords] = useState({ x: 188, y: 170 });
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

    console.log(isFisico)
    var data = convertObjectToString()
    const doc = new jsPDF();

    if (isFisico === false) {
      doc.addFileToVFS(montserratRegular);
      doc.addFont(montserratRegular, 'Montserrat', 'normal');
      doc.addFont(montserratBold, 'Montserrat-Bold', 'normal');

      // Establecer Montserrat como la fuente predeterminada
      doc.setFont('Montserrat');

      // Agregar imagen como encabezado
      doc.addImage(logo, 'PNG', 150, 10, 45, 10); // Ajusta las coordenadas y el tamaño según tus necesidades

      // Agregar texto adicional al documento
      doc.setTextColor(128, 128, 128); // Establece el color gris (RGB: 128, 128, 128)
      doc.setFontSize(8); // Establece el tamaño de letra más pequeño
      doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
      doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);
      doc.text('AC_FREQ01', 178, 25);

      doc.setFont('Montserrat-Bold');
      doc.setTextColor(105, 27, 49);
      doc.setFontSize(12); // Establece el tamaño de letra más pequeño
      doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
      doc.setTextColor(188, 149, 91);
      doc.text('SOLICITUD DE CERTIFICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 22, 35);

      doc.setTextColor(0, 0, 0);
      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text('________________________________________ Hidalgo a ________ de __________________ de __________', 22, 45);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Municipio', 50, 48);
      doc.text('dd', 116, 48);
      doc.text('mes', 145, 48);
      doc.text('aaaa', 175, 48);
      // doc.text(data.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
      // doc.text(formattedDate, fechaCoords.x, fechaCoords.y);

      doc.setTextColor(105, 27, 49);
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
      doc.setTextColor(0, 0, 0);
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
      doc.text('RFC (con Homoclave): ', 20, 120);
    
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
      doc.setTextColor(105, 27, 49);
      doc.text('2.  DATOS DEL DOMICILIO', 15, 150);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('Montserrat');
      doc.text(data.direccion, direccionCoords.x, direccionCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Municipio: ', 20, 170);
      doc.setFont('Montserrat');
      doc.text(data.municipio_direccion, municipio_direccionCoords2.x, municipio_direccionCoords2.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Entidad: ', 118, 170);
      doc.setFont('Montserrat');
      doc.text(data.estado, estadoCoords.x, estadoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Código Postal: ', 159, 170);
      doc.setFont('Montserrat');
      doc.text(data.cp, cpCoords.x, cpCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.setTextColor(105, 27, 49);
      doc.text('3.  DOCUMENTOS DE IDENTIDAD', 15, 180);
      doc.setTextColor(0, 0, 0);
      doc.setFont('Montserrat');
      doc.setFontSize(9.5);
      doc.text('PARA OBTENER EL CERTIFICADO DIGITAL DE LA FIRMA ELECTRÓNICA AVANZADA ES NECESARIO QUE ', 20, 190);
      doc.text('ENTREGUE,  JUNTO CON ESTA SOLICITUD,  LOS DOCUMENTOS QUE A CONTINUACIÓN SE INDICAN EN ', 20, 195);
      doc.text('ORIGINAL, ', 20, 200);
      doc.setFont('Montserrat-Bold');
      doc.setTextColor(105, 27, 49);
      doc.text('MARCANDO CON UNA "X"  ', 39, 200);
      doc.setTextColor(0, 0, 0);
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
      doc.setTextColor(105, 27, 49);
      doc.text('DECLARO BAJO PROTESTA DE DECIR VERDAD QUE LOS DATOS ', 45, 250);
      doc.text('CONTENIDOS EN ESTA SOLICITUD SON CIERTOS ', 59, 255);
      doc.setFont('Montserrat');
      doc.setTextColor(0, 0, 0);
      doc.text('______________________________________________________________________________ ', 35, 270);
      doc.setTextColor(128, 128, 128);
      doc.text('FIRMA ', 100, 275);

      doc.setFontSize(8);
      doc.text('Palacio de Gobierno 1er Piso, Plaza Juárez s/n, Col. Centro, Pachuca de Soto, Hidalgo, México, C.P. 42000 ', 32, 285);
      doc.text('Tel.: (800) 623 47 62         http://firmaelectronica.hidalgo.gob.mx', 60, 290);
    }else{
      doc.addFileToVFS(montserratRegular);
      doc.addFont(montserratRegular, 'Montserrat', 'normal');
      doc.addFont(montserratBold, 'Montserrat-Bold', 'normal');

      // Establecer Montserrat como la fuente predeterminada
      doc.setFont('Montserrat');

      // Agregar imagen como encabezado
      doc.addImage(logo, 'PNG', 150, 10, 45, 10); // Ajusta las coordenadas y el tamaño según tus necesidades

      // Agregar texto adicional al documento
      doc.setTextColor(128, 128, 128); // Establece el color gris (RGB: 128, 128, 128)
      doc.setFontSize(8); // Establece el tamaño de letra más pequeño
      doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
      doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);
      doc.text('AC_FREQ01', 178, 25);

      doc.setFont('Montserrat-Bold');
      doc.setTextColor(105, 27, 49);
      doc.setFontSize(12); // Establece el tamaño de letra más pequeño
      doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
      doc.setTextColor(188, 149, 91);
      doc.text('SOLICITUD DE CERTIFICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 22, 35);

      doc.setTextColor(0, 0, 0);
      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text('________________________________________ Hidalgo a ________ de __________________ de __________', 22, 45);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Municipio', 50, 48);
      doc.text('dd', 116, 48);
      doc.text('mes', 145, 48);
      doc.text('aaaa', 175, 48);
      // doc.text(data.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
      // doc.text(formattedDate, fechaCoords.x, fechaCoords.y);

      doc.setTextColor(105, 27, 49);
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('Persona Fisica  (   )     ', 99, 60);
      doc.text(data.isPhysic === 'true' ? 'X' : '', fisicoCoords.x, fisicoCoords.y);
      
      doc.text('Razón Social', 20, 70);
      doc.setFont('Montserrat');
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
      doc.text('RFC (con Homoclave): ', 20, 120);
    
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
      doc.setTextColor(105, 27, 49);
      doc.text('2.  DATOS DEL DOMICILIO', 15, 150);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('Montserrat');
      doc.text(data.direccion, direccionCoords.x, direccionCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Municipio: ', 20, 170);
      doc.setFont('Montserrat');
      doc.text(data.municipio_direccion, municipio_direccionCoords2.x, municipio_direccionCoords2.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Entidad: ', 118, 170);
      doc.setFont('Montserrat');
      doc.text(data.estado, estadoCoords.x, estadoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Código Postal: ', 159, 170);
      doc.setFont('Montserrat');
      doc.text(data.cp, cpCoords.x, cpCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.setTextColor(105, 27, 49);
      doc.text('3.  DOCUMENTOS DE IDENTIDAD', 15, 180);
      doc.setTextColor(0, 0, 0);
      doc.setFont('Montserrat');
      doc.setFontSize(9.5);
      doc.text('PARA OBTENER EL CERTIFICADO DIGITAL DE LA FIRMA ELECTRÓNICA AVANZADA ES NECESARIO QUE ', 20, 190);
      doc.text('ENTREGUE,  JUNTO CON ESTA SOLICITUD,  LOS DOCUMENTOS QUE A CONTINUACIÓN SE INDICAN EN ', 20, 195);
      doc.text('ORIGINAL, ', 20, 200);
      doc.setFont('Montserrat-Bold');
      doc.setTextColor(105, 27, 49);
      doc.text('MARCANDO CON UNA "X"  ', 39, 200);
      doc.setTextColor(0, 0, 0);
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
      doc.text('e) DOCUMENTO QUE LO AVALA COMO PERSONAL DE LA EMPRESA                           [       ]', 20, 230);
      doc.setFont('Montserrat');
      doc.text(data.ArchivoAval === 'true' ? 'X' : '', ArchivoAvalCoords.x, ArchivoAvalCoords.y);
      
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(10);
      doc.setTextColor(105, 27, 49);
      doc.text('DECLARO BAJO PROTESTA DE DECIR VERDAD QUE LOS DATOS ', 45, 250);
      doc.text('CONTENIDOS EN ESTA SOLICITUD SON CIERTOS ', 59, 255);
      doc.setFont('Montserrat');
      doc.setTextColor(0, 0, 0);
      doc.text('______________________________________________________________________________ ', 35, 270);
      doc.setTextColor(128, 128, 128);
      doc.text('FIRMA ', 100, 275);

      doc.setFontSize(8);
      doc.text('Palacio de Gobierno 1er Piso, Plaza Juárez s/n, Col. Centro, Pachuca de Soto, Hidalgo, México, C.P. 42000 ', 32, 285);
      doc.text('Tel.: (800) 623 47 62         http://firmaelectronica.hidalgo.gob.mx', 60, 290);
    }
    
    
    const pdfBlob = doc.output('blob');
    //console.log(pdfBlob)
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
    fetch(`${apiUrl}/admin/returnFile/${id}/${archivoSeleccionado}`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}` // Aquí se añade el token de autenticación
        }
    })
    .then(response => response.blob())
    .then(blob => {
        setPdfBlob(URL.createObjectURL(blob));
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
};



  useEffect(() => {
    
    fetch(`${apiUrl}/admin/getData/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}` // Se suele usar el prefijo 'Bearer' para tokens de autenticación
      }
  })
    
      .then(response => response.json())
      .then(data => {
        setData(data.registroExistente);
        console.log(data.registroExistente)
        setIsFisico(data.registroExistente.isPhysic)
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
    return isSP && isRS && isRFC && isdireccion && ism && isCP && isP && isA && isT && isExt && isEmail && isIde && isCD && isCURP && isDRFC && isAval;
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
      <Heder />
      <div className="container2">
        <div className='titulo-container'>
          <div className='titulo_2'>
            Verifique Datos
          </div>
          <div className='text_2'>
          Seleccione los campos que sean correctos. Si es aprobado, se enviará la solicitud de requerimiento y recursos necesarios para generar el .req al usuario.
          </div>
        </div>
      </div>

      <div className="container44">
        <div className="content1">

          <div className='titulo_formulario2'>
            Solicitud #{data.id}
          </div>

          <div className='text_formulario2'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Nombre:</span>
            {`${data.nombre} ${data.paterno} ${data.materno}`}
          </div>

          <div className='text_formulario2'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>CURP:</span>
            {data.curp}
          </div>

          <div className='titulo_formulario2'>
        Documentos de Identidad
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isIde} onChange={() => setIsIde(!isIde)} />
                <span className="checkbox-text2">{nombre}Identificación</span>
            </label>    
        </div>
        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isCD} onChange={() => setIsCD(!isCD)} />
                <span className="checkbox-text2">{nombre}Comprobante de Domicilio</span>
            </label>    
        </div>
        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isCURP} onChange={() => setIsCURP(!isCURP)} />
                <span className="checkbox-text2">{nombre}CURP</span>
            </label>    
        </div>
        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isDRFC} onChange={() => setIsDRFC(!isDRFC)} />
                <span className="checkbox-text2">{nombre}RFC</span>
            </label>    
        </div>
        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isAval} onChange={() => setIsAval(!isAval)} />
                <span className="checkbox-text2">{nombre}Avala como Servidor
                Público o Notario
                Público</span>
            </label>    
        </div>

        <div className='titulo_formulario2'>
        Datos del Solicitante
        </div>

          <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isRFC} onChange={() => setIsRFC(!isRFC)} />
                <span className="checkbox-text2" >RFC:</span>
                {data.rfc}
            </label>    
        </div>

          <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isSP} onChange={() => setIsSP(!isSP)} />
                <span className="checkbox-text2">{nombre}Servidor Público</span>
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isRS} onChange={() => setIsRS(!isRS)} />
                <span style={{fontSize:'1em' }}className="checkbox-text2" >Sector Público:&nbsp;</span>
                {data.secretaria}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isP} onChange={() => setIsP(!isP)} />
                <span className="checkbox-text2" >Puesto:&nbsp;</span>
                {data.puesto}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isA} onChange={() => setIsA(!isA)} />
                <span className="checkbox-text2" >Área:&nbsp;</span>
                {data.area}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isT} onChange={() => setIsT(!isT)} />
                <span className="checkbox-text2" >Teléfono:&nbsp; </span>
                {data.telefono} 
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isExt} onChange={() => setIsExt(!isExt)} />
                <span className="checkbox-text2" >Extensión:&nbsp;</span>
                {data.extencion}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isEmail} onChange={() => setIsEmail(!isEmail)} />
                <span className="checkbox-text2" >Correo:&nbsp;</span>
                {data.correo}
            </label>    
        </div>
        
        <div className='titulo_formulario2'>
        Domicilio laboral
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isdireccion} onChange={() => setIsDireccion(!isdireccion)} />
                <span className="checkbox-text2" >Domicilio:&nbsp;</span>
                {data.direccion}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={ism} onChange={() => setIsM(!ism)} />
                <span className="checkbox-text2" >Municipio:&nbsp;</span>
                {data.municipio_direccion}
            </label>    
        </div>

        <div className="checkboxes2">
            <label className="checkbox-label2">
                <input type="checkbox" checked={isCP} onChange={() => setIsCP(!isCP)} />
                <span className="checkbox-text2" >C.P.:&nbsp;</span>
                {data.cp}
            </label>    
        </div>

        

        

        </div>


        <div className="content2">
           
        <select className='select2' style={{ marginRight: '2%' }} onChange={handleChangeSelect}>
          <option value="ArchivoINE">INE</option>
          <option value="ArchivoComprobanteDomicilio">Comprobante de domicilio</option>
          <option value="ArchivoCURP">CURP</option>
          <option value="ArchivoRFC">RFC</option>
          <option value="ArchivoAval">Aval como Servidor Público o Notario Público</option>
          <option value="video">Video</option>
        </select>

          <div className='pdf_contenedor'>
            {/* Mostrar el PDF si hay un Blob */}
            {tipoArchivo != 'video' && <embed src={pdfBlob} type="application/pdf" width="100%" height="100%" />}
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
    <Button className="boton_modal" variant="secondary" onClick={handleCloseModal}>Atrás</Button>
    <Button  className="boton_modal" variant="primary" onClick={handleSubmit2}>Enviar</Button>
  </Modal.Footer>
</Modal>
    </div>


    </div>
  );
}

export default Verificar_Datos;
