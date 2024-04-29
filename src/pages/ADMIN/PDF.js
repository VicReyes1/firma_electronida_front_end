import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import montserratRegular from '../../fonts/Montserrat-Regular.ttf'; // Ruta relativa a la fuente dentro del proyecto
import montserratBold from '../../fonts/Montserrat-Bold.ttf'; // Ruta relativa a la fuente dentro del proyecto
import '../../css/pdf.css'; // Asegúrate de tener la ruta correcta al archivo CSS
import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto

const PDFGenerator = () => {
  const [data, setData] = useState({
    municipio: 'Pachuca de Soto',
    fecha: '17 de julio de 2024',
    notario:'true',
    servidor:'true',
    dependencia:'Secretaría del Despacho de la Persona Titular del Poder Ejecutivo',
    organismo:'Dirección General de Innovación Gubernamental',
    nombre:'Jesús Adolfo Márquez Trejo',
    puesto:'Agente Certificador',
    RFC:'MATJ010717D40',
    CURP:'MATJ010717HPLRRSA3',
    correo:'jesus.marquez@hidalgo.gob.mx',
    telefono:'797-140-58-61',
    extencion:'6453',
    direccion:'Plaza Juárez Colonia Centro', 

    // Agrega más datos de muestra según sea necesario
  });

  // Estados para controlar las coordenadas de cada dato
  const [municipioCoords, setMunicipioCoords] = useState({ x: 112, y: 45 });
  const [fechaCoords, setFechaCoords] = useState({ x: 163, y: 45 });
  const [notarioCoords, setnotarioCoords] = useState({ x: 170, y: 60 });
  const [servidorCoords, setservidorCoords] = useState({ x: 129, y: 60 });
  const [dependenciaCoords, setdependenciaCoords] = useState({ x: 20, y: 80 });
  const [organismoCoords, setorganismoCoords] = useState({ x: 32, y: 90 });
  const [nombreCoords, setnombreCoords] = useState({ x: 58, y: 100 });
  const [puestoCoords, setpuestoCoords] = useState({ x: 37, y: 110 });
  const [RFCCoords, setRFCCoords] = useState({ x: 57, y: 120 });
  const [CURPCoords, setCURPCoords] = useState({ x: 124, y: 120 });
  const [correoCoords, setcorreoCoords] = useState({ x: 58, y: 130 });
  const [telefonoCoords, settelefonoCoords] = useState({ x: 57, y: 140 });
  const [extencionCoords, setextencionCoords] = useState({ x: 132, y: 140 });

  const fetchData = async () => {
    try {
      const response = await axios.get('URL_DE_TU_API');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    if (data) {
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
      doc.text('SOLICITUD DE CERTIDICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 22, 35);

      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text('Hidalgo a ', 144, 45);
      doc.text(data.municipio, municipioCoords.x, municipioCoords.y);
      doc.text(data.fecha, fechaCoords.x, fechaCoords.y);

      
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(12);
      doc.text('1.  DATOS DEL SOLICITANTE', 15, 60);
      doc.setFontSize(10);
      doc.text('Servidor Público  (   )     Notario Público  (   )', 95, 60);
      doc.text(data.notario === 'true' ? 'X' : '', notarioCoords.x, notarioCoords.y);
      doc.text(data.servidor === 'true' ? 'X' : '', servidorCoords.x, servidorCoords.y);
      
      doc.text('Razón Social', 20, 70);
      doc.setFont('Montserrat');
      doc.setFontSize(8);
      doc.text('(Dependencia o Entidad Paraestatal o H. Ayuntamiento Entidad Municipal o Notaría Pública u Organismo)', 45, 70);
      doc.setFontSize(10);
      doc.text(data.dependencia, dependenciaCoords.x, dependenciaCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Área:', 20, 90);
      doc.setFont('Montserrat');
      doc.text(data.organismo, organismoCoords.x, organismoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Nombre Completo:', 20, 100);
      doc.setFont('Montserrat');
      doc.text(data.nombre, nombreCoords.x, nombreCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Puesto:', 20, 110);
      doc.setFont('Montserrat');
      doc.text(data.puesto, puestoCoords.x, puestoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('RFC ', 20, 120);
      doc.setFontSize(8);
      doc.text('(con Homoclave): ', 29, 120);
      doc.setFont('Montserrat');
      doc.setFontSize(10);
      doc.text(data.RFC, RFCCoords.x, RFCCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('CURP: ', 110, 120);
      doc.setFont('Montserrat');
      doc.text(data.CURP, CURPCoords.x, CURPCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Correo Electrónico:', 20, 130);
      doc.setFont('Montserrat');
      doc.text(data.correo, correoCoords.x, correoCoords.y);

      doc.setFont('Montserrat-Bold');
      doc.text('Telefono ', 20, 140);
      doc.setFontSize(8);
      doc.text('(10 digitos): ', 37, 140);
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

   

      // Obtener el PDF como Data URI
      const pdfDataUri = doc.output('datauristring');

      // Abrir una nueva ventana y mostrar el PDF
      const newWindow = window.open();
      newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
    } else {
      console.error('No data available.');
    }
  };

  return (
    <div className="button-container">
      <button className="salmon-button" onClick={fetchData}>Obtener datos</button>
      <button className="vegetable-button" onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default PDFGenerator;
