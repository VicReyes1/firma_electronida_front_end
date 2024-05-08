import React from 'react';
import { jsPDF } from 'jspdf';
import PDFMerger from 'pdf-merger-js';

const PDFViewer = () => {
  const mergeAndShowPDFs = async () => {
    try {
      const merger = new PDFMerger();

      // Agregar el primer PDF
      merger.add('pdf1.pdf');

      // Crear el segundo PDF
      const doc = new jsPDF();
      doc.text('Hello, World!', 10, 10); // Ejemplo de contenido para el segundo PDF
      const secondPDF = doc.output('blob');

      // Agregar el segundo PDF
      merger.add(secondPDF);

      // Guardar el PDF fusionado
      await merger.saveAs('merged.pdf');

      // Mostrar el PDF fusionado en una nueva ventana del navegador
      window.open('merged.pdf');
    } catch (error) {
      console.error('Error al combinar los PDFs:', error);
    }
  };

  return (
    <div className="pdf-viewer">
      <button onClick={mergeAndShowPDFs}>Mostrar PDF Fusionado</button>
    </div>
  );
};

export default PDFViewer;
