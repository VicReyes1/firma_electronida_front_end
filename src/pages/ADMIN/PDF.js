import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import '../../css/pdf.css'; // Asegúrate de tener la ruta correcta al archivo CSS
import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto

const PDFGenerator = () => {
  const [data, setData] = useState({
    municipio: 'Pachuca de Soto',
    fecha: '17 de julio de 2024',
    // Agrega más datos de muestra según sea necesario
  });

  // Estados para controlar las coordenadas de cada dato
  const [municipioCoords, setMunicipioCoords] = useState({ x: 15, y: 45 });
  const [fechaCoords, setFechaCoords] = useState({ x: 160, y: 45 });

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

      // Agregar imagen como encabezado
      doc.addImage(logo, 'PNG', 180, 5, 20, 25); // Ajusta las coordenadas y el tamaño según tus necesidades

      // Agregar texto adicional al documento
      doc.setTextColor(128, 128, 128); // Establece el color gris (RGB: 128, 128, 128)
      doc.setFontSize(8); // Establece el tamaño de letra más pequeño
      doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
      doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12); // Establece el tamaño de letra más pequeño
      doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
      doc.text('SOLICITUD DE CERTIDICADO DIGITAL DE FIRMA ELECTRÓNICA AVANZADA', 25, 35);
      doc.text('Hidalgo a ', 145, 45);
     

      // Agregar municipio con coordenadas personalizadas
      doc.text(data.municipio, municipioCoords.x, municipioCoords.y);
      // Agregar fecha con coordenadas personalizadas
      doc.text(data.fecha, fechaCoords.x, fechaCoords.y);

   

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
