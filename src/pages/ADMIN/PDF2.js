import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import montserratRegular from '../../Fonts/Montserrat-Regular.ttf'; // Ruta relativa a la fuente dentro del proyecto
import montserratBold from '../../Fonts/Montserrat-Bold.ttf'; // Ruta relativa a la fuente dentro del proyecto
import '../../css/pdf.css'; // Asegúrate de tener la ruta correcta al archivo CSS
import logo from '../../Images/Escudoo_color.png'; // Ruta relativa a la imagen dentro del proyecto

const PDFCarta = () => {

  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('es-MX', options);

  const [data, setData] = useState({
    municipio_direccion: 'Pachuca de Soto',
    fecha: formattedDate,
    secretaria:'Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado de Hidalgo',
    entidad:'Dirección General de Innovación Gubernamental',
    nombre:'Jesús Adolfo Márquez Trejo',

    NSCertificado:'0123456789',
    vigenciaInicio:'17 de Noviembre de 2024',
    vigenciaFin:'18 de Noviembre de 2025',

    Certificado_Digital_Autoridad:'false',
    Certificado_Digital_Personal:'true',
    Archivo_p12:'true',
    Archivo_key:'true',

    // Agrega más datos de muestra según sea necesario
  });

  // Estados para controlar las coordenadas de cada dato
  const [municipio_direccionCoords, setMunicipioCoords] = useState({ x: 125, y: 45 });
  const [fechaCoords, setFechaCoords] = useState({ x: 168, y: 45 });
  
  const [secretariaCoords, setsecretariaCoords] = useState({ x: 20, y: 80 });
  const [entidadCoords, setentidadCoords] = useState({ x: 45, y: 65 });
  const [nombreCoords, setnombreCoords] = useState({ x: 40, y: 60 });
  const [NSCertificadoCoords, setNSCertificadoCoords] = useState({ x: 79, y: 95 });

  const [vigenciaInicioCoords, setvigenciaInicioCoords] = useState({ x: 138, y: 95 });
  const [vigenciaFinCoords, setvigenciaFinCoords] = useState({ x: 16, y: 100 });

  const [Certificado_Digital_AutoridadCoords, setCertificado_Digital_AutoridadCoords] = useState({ x: 172, y: 225 });
  const [Certificado_Digital_PersonalCoords, setCertificado_Digital_PersonalCoords] = useState({ x: 172, y: 230 });
  const [Archivo_p12Coords, setArchivo_p12Coords] = useState({ x: 172, y: 235 });
  const [Archivo_keyCoords, setArchivo_keyCoords] = useState({ x: 172, y: 240 });


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
      doc.setFontSize(10); // Establece el tamaño de letra más pequeño
      doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
      doc.text('CARTA DE CONFIDENCIALIDAD Y RESPONSABILIDAD', 50, 35);

      doc.setFont('Montserrat');
      doc.setFontSize(8);
      doc.text('Hidalgo a ', 152, 45);
      doc.text(',', 150, 45);
      doc.text(data.municipio_direccion, municipio_direccionCoords.x, municipio_direccionCoords.y);
      doc.text(data.fecha, fechaCoords.x, fechaCoords.y);

      
      doc.setFont('Montserrat-Bold');
      doc.setFontSize(8);
      doc.text('Gobierno del Estado de Hidalgo', 15, 50);
      doc.text('Presente', 15, 55);

      doc.setFont('Montserrat');
      doc.text('El que suscribe', 15, 60);
      doc.text(data.nombre, nombreCoords.x, nombreCoords.y);
      doc.text('____________________________', 40, 60.5);
      doc.text('adscrito(a) a (l) (la)', 15, 65);
      doc.text(data.entidad, entidadCoords.x, entidadCoords.y);
      doc.text('__________________________________________________', 45, 65.5);
      doc.text('y deacuerdo a los términos de la Ley Sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de', 15, 70);
      doc.text('Hidalgo, bajo protesta de decir verdad expongo lo siguiente:', 15, 75);

      doc.text('Reconozco desde el día de hoy que la ', 15, 85);
      doc.setFont('Montserrat-Bold');
      doc.text('Autoridad Certificadora de Firma Electrónica Avanzada para el Estado de Hidalgo', 70, 85);
      doc.setFont('Montserrat');
      doc.text('por conducto de la ', 15, 90);
      doc.setFont('Montserrat-Bold');
      doc.text('Dirección General de Innovación Gubernamental,', 43, 90, );
      doc.setFont('Montserrat')
      doc.text('generó el', 118, 90, );
      doc.setFont('Montserrat-Bold');
      doc.text('Certificado Digital de Firma Electrónica', 134, 90, );
      doc.text('Avanzada solicitado, con numero de serie', 15, 95, );
      doc.setFont('Montserrat')
      doc.text(data.NSCertificado, NSCertificadoCoords.x, NSCertificadoCoords.y);
      doc.text('_____________', 78, 95.5);
      doc.text('y periodo de vigencia del', 100, 95);
      doc.text(data.vigenciaInicio, vigenciaInicioCoords.x, vigenciaInicioCoords.y);
      doc.text('___________________________', 137, 95.5);
      doc.text('al', 178, 95);
      doc.text(data.vigenciaFin, vigenciaFinCoords.x, vigenciaFinCoords.y);
      doc.text('___________________________', 15, 100.5);
      doc.text('Notificaré a la Dirección General de Innovación Gubernamental en su calidad de Autoridad Certificadora de Firma Electrónica', 15, 110);
      doc.text('Avanzada para el Estado de Hidalgo, la suspensión o extinción del Certificado Digital de Firma Electrónica  Avanzada a la que', 15, 115);
      doc.text('se refiere la presente carta; la pérdida o cualquier otra situación que pudiera implicar la reproducción o uso indebido de los', 15, 120);
      doc.text('datos de creación del Certificado Digital de Firma Electrónica Avanzada por medio electrónico o por escrito.', 15, 125);
      
      doc.text('Acepto que el uso de datos de creación del Certificado Digital de Firma Electrónica Avanzada, quedará bajo mi exclusiva', 15, 135);  
      doc.text('responsabilidad, que por lo tanto soy responsable de su resguardo y seguridad, asimismo, que en el caso de revelarlos en', 15, 140);
      doc.text('cualquiera de sus formas acepto como propia la información que sea enviada.', 15, 145);
      
      doc.text('Asumo cualquier tipo de responsabilidad derivada del mal uso que haga del Certificado Digital de Firma Electrónica Avanzada.', 15, 155);
      doc.text('Que los datos de creación del Certificado Digital de Firma Electrónica Avanzada sólo los utilizaré para los efectos que marca el', 15, 165);
      doc.text('capítulo I, su artículo 2, de la Ley sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de Hidalgo.', 15, 170);

      doc.text('Estoy de acuerdo en ser requerido y/o notificado para cualquier información adicional respecto del Certificado Digital de Firma', 15, 180);
      doc.text('Electrónica Avanzada.', 15, 185);

      doc.text('Acepto que, en caso de incumplir con lo estipulado en la presente carta, la Autoridad Certificadora de Firma Electrónica', 15, 195);
      doc.text('Avanzada para el Estado de Hidalgo podrá revocar en cualquier momento el Certificado Digital de Firma Electrónica Avanzada,', 15, 200);
      doc.text('sin perjuicio de las demás responsabilidades en las que pueda incurrir o que correspondan, sometiéndome al procedimiento', 15, 205);
      doc.text('jurídico o administrativo a que haya lugar.', 15, 210);
      
      doc.setFont('Montserrat-Bold');
      doc.text('Recibí en medio electrónico, digital:', 15, 220);

      doc.setFont('Montserrat');
      doc.setFontSize(7);
      doc.text('* Certificado Digital de la ', 35, 225);
      doc.setFont('Montserrat-Bold'); 
      doc.text('Autoridad Certificadora de Firma Electrónica Avanzada', 67, 225);
      doc.text('[      ]', 170, 225);
      doc.text(data.Certificado_Digital_Autoridad === 'true' ? 'X' : '', Certificado_Digital_AutoridadCoords.x, Certificado_Digital_AutoridadCoords.y);

      doc.setFont('Montserrat');
      doc.text('* Certificado Digital de Firma Electrónica Avanzada', 35, 230);
      doc.setFont('Montserrat-Bold'); 
      doc.text('Personal', 100, 230);
      doc.text('[      ]', 170, 230);
      doc.text(data.Certificado_Digital_Personal === 'true' ? 'X' : '', Certificado_Digital_PersonalCoords.x, Certificado_Digital_PersonalCoords.y);

      doc.setFont('Montserrat');
      doc.text('* Archivo', 35, 235);
      doc.setFont('Montserrat-Bold'); 
      doc.text('PKCS12 (*.pfx o *.p12)', 48, 235);
      doc.text('[      ]', 170, 235);
      doc.text(data.Archivo_p12 === 'true' ? 'X' : '', Archivo_p12Coords.x, Archivo_p12Coords.y);

      doc.setFont('Montserrat');
      doc.text('* Archivo', 35, 240);
      doc.setFont('Montserrat-Bold'); 
      doc.text('*.KEY', 48, 240);
      doc.text('[      ]', 170, 240);
      doc.text(data.Archivo_key === 'true' ? 'X' : '', Archivo_keyCoords.x, Archivo_keyCoords.y);

      doc.setFont('Montserrat');
      doc.setFontSize(8);
      doc.text('- De conformidad -', 90, 250);

      doc.setFont('Montserrat');
      doc.text('_____________________________________________________________________ ', 55, 270);
      doc.setTextColor(128, 128, 128);
      doc.text('FIRMA ', 100, 275);

      doc.setFontSize(8);
      doc.text('Palacio de Gobierno 1er Piso, Plaza Juárez s/n, Col. Centro, Pachuca de Soto, Hidalgo, México, C.P. 42000 ', 32, 285);
      doc.text('Tel.: (800) 623 47 62         http://firmaelectronica.hidalgo.gob.mx', 60, 290);
      

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

export default PDFCarta;
