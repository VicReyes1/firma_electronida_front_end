import axios from 'axios';
import { jsPDF } from 'jspdf';
import montserratRegular from '../../Fonts/Montserrat-Regular.ttf';
import montserratBold from '../../Fonts/Montserrat-Bold.ttf';
import logo from '../../Images/Escudoo_color.png';
const apiUrl = process.env.REACT_APP_API_URL;
const fetchData = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/usuario/getDataPDF/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

const generatePDFBlob = async (data) => {
  if (!data) {
    console.error('No data available.');
    return null;
  }

  try{
  const doc = new jsPDF();

  doc.addFileToVFS(montserratRegular);
  doc.addFont(montserratRegular, 'Montserrat', 'normal');
  doc.addFont(montserratBold, 'Montserrat-Bold', 'normal');
  doc.setFont('Montserrat');

  doc.addImage(logo, 'PNG', 180, 5, 20, 25);

  doc.setTextColor(128, 128, 128);
  doc.setFontSize(8);
  doc.text('AC_RESPONSIVA', 173, 33);
  doc.text('AUTORIDAD CERTIFICADORA DE FIRMA ELECTRÓNICA AVANZADA', 15, 15);
  doc.text('PARA EL ESTADO DE HIDALGO', 15, 20);

  doc.setFont('Montserrat-Bold');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('GOBIERNO DEL ESTADO DE HIDALGO', 65, 30);
  doc.text('CARTA DE CONFIDENCIALIDAD Y RESPONSABILIDAD', 50, 35);

  doc.setFont('Montserrat');
  doc.setFontSize(8);
  doc.text('Hidalgo a ', 152, 45);
  doc.text(',', 150, 45);
  doc.text(data.municipio_direccion || '', 125, 45);
  doc.text(data.updatedAt|| '', 168, 45);

  doc.setFont('Montserrat-Bold');
  doc.setFontSize(8);
  doc.text('Gobierno del Estado de Hidalgo', 15, 50);
  doc.text('Presente', 15, 55);

  doc.setFont('Montserrat');
  doc.text('El que suscribe', 15, 60);
  doc.text(data.nombre || '', 40, 60);
  doc.text('____________________________', 40, 60.5);
  doc.text('adscrito(a) a (l) (la)', 15, 65);
  doc.text(data.area || '', 45, 65);
  doc.text('_______________________________________________________________________________________________________', 45, 65.5);
  doc.text('y deacuerdo a los términos de la Ley Sobre el Uso de Medios Electrónicos y Firma Electrónica Avanzada para el Estado de', 15, 70);
  doc.text('Hidalgo, bajo protesta de decir verdad expongo lo siguiente:', 15, 75);

  doc.text('Reconozco desde el día de hoy que la ', 15, 85);
  doc.setFont('Montserrat-Bold');
  doc.text('Autoridad Certificadora de Firma Electrónica Avanzada para el Estado de Hidalgo', 70, 85);
  doc.setFont('Montserrat');
  doc.text('por conducto de la ', 15, 90);
  doc.setFont('Montserrat-Bold');
  doc.text('Dirección General de Innovación Gubernamental,', 43, 90);
  doc.setFont('Montserrat');
  doc.text('generó el', 118, 90);
  doc.setFont('Montserrat-Bold');
  doc.text('Certificado Digital de Firma Electrónica', 134, 90);
  doc.text('Avanzada solicitado, con numero de serie', 15, 95);
  doc.setFont('Montserrat');
  doc.text(data.serie || '', 79, 95);
  doc.text('_____________', 78, 95.5);
  doc.text('y periodo de vigencia del', 100, 95);
  doc.text(data.vigencia_inicio || '', 138, 95);
  doc.text('___________________________', 137, 95.5);
  doc.text('al', 178, 95);
  doc.text(data.vigencia_fin || '', 16, 100);
  doc.text('___________________________', 15, 100.5);
  doc.text('Notificaré a la Dirección General de Innovación Gubernamental en su calidad de Autoridad Certificadora de Firma Electrónica', 15, 110);
  doc.text('Avanzada para el Estado de Hidalgo, la suspensión o extinción del Certificado Digital de Firma Electrónica Avanzada a la que', 15, 115);
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
  doc.text(data.fea_autoridad === 'true' ? 'X' : '', 172, 225);

  doc.setFont('Montserrat');
  doc.text('* Certificado Digital de Firma Electrónica Avanzada', 35, 230);
  doc.setFont('Montserrat-Bold');
  doc.text('Personal', 100, 230);
  doc.text('[      ]', 170, 230);
  doc.text(data.fea_personal === 'true' ? 'X' : '', 172, 230);

  doc.setFont('Montserrat');
  doc.text('* Archivo', 35, 235);
  doc.setFont('Montserrat-Bold');
  doc.text('PKCS12 (*.pfx o *.p12)', 48, 235);
  doc.text('[      ]', 170, 235);
  doc.text(data.PKCS12 === 'true' ? 'X' : '', 172, 235);

  doc.setFont('Montserrat');
  doc.text('* Archivo', 35, 240);
  doc.setFont('Montserrat-Bold');
  doc.text('*.KEY', 48, 240);
  doc.text('[      ]', 170, 240);
  doc.text(data.key === 'true' ? 'X' : '', 172, 240);

  doc.setFont('Montserrat');
  doc.setFontSize(8);
  doc.text('- De conformidad -', 90, 250);

  doc.setFont('Montserrat');
  doc.text('_____________________________________________________________________ ', 55, 270);
  doc.setTextColor(128, 128, 128);
  doc.text('FIRMA DEL RESPONSABLE', 90, 275);

  const pdfBlob = doc.output('blob');
  console.log('Blob size:', pdfBlob.size);

    // Convertir Blob a File
    const file = new File([pdfBlob], 'generated.pdf', { type: 'application/pdf' });

    return file;
  }
  catch(error){
    console.error('Error generating PDF:'+ error);
    return null;
  }
};

const generatePDF = async (id) => {
  try {
    const data = await fetchData(id);
    const pdf = generatePDFBlob(data);
    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};

export default generatePDF;
