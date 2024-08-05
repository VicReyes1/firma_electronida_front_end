import React, { useState, useEffect } from 'react';
import Heder from '../heder';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../../css/Solicitud_Concluida.css';
import { useParams } from 'react-router-dom';
import WizardStepsCompleted from '../Componentes/WizardSteps-Concluido';


function Solicitud_ConcluidaUsuario() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { id } = useParams();
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        registro_id: '',
        nombre: '',
        CURP: '',
        notario: '',
        servidor: '',
        secretaria: '',
        RFC: '',
        direccion: '',
        municipio_direccion: '',
        cp: '',
        puesto: '',
        entidad: '',
        telefono: '',
        extencion: '',
        identificacionBlob: null
    });

      useEffect(() => {
        // Simulando la obtención del blob de un archivo PDF 
        const fetchidentificacionBlob = async () => {
            try {
                // Simulando la obtención del blob de un archivo PDF
                const identificacionBlob = await fetch(`${apiUrl}/admin/returnFile/${id}/solicitudRequerimiento`).then(response => response.blob());
                setData(prevData => ({
                    ...prevData,
                    identificacionBlob: identificacionBlob // Almacenamos el blob en el estado
                }));
            } catch (error) {
                console.error('Error fetching PDF blob:', error);
            }
        };

        fetchidentificacionBlob();
        fetchData();
    }, []);


    const handleOpenIdentificacionBlob = () => {
        if (data.identificacionBlob) {
            const url = URL.createObjectURL(data.identificacionBlob);
            window.open(url, '_blank');
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/getDatos/${id}`);
            const registro = response.data;
            setData({
                registro_id: registro.id,
                nombre: `${registro.nombre} ${registro.paterno} ${registro.materno}`,
                CURP: registro.curp,
                notario: registro.isNotary ? 'true' : 'false',
                servidor: registro.isServer ? 'true' : 'false',
                secretaria: registro.secretaria,
                RFC: registro.rfc,
                direccion: registro.direccion,
                municipio_direccion: registro.municipio_direccion,
                cp: registro.cp,
                puesto: registro.puesto,
                entidad: registro.entidad,
                telefono: registro.telefono,
                extencion: registro.extencion,
                identificacionBlob: null // Este campo se manejará después
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const descargaIne = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaIne/${id}`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ArchivoINE.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaDomicilio = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaDomicilio/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'domicilio.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaAval = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaServidor/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'aval.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaCurp = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaCurp/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'curp.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaRFC = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaRFC/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'RFC.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaRequerimiento = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaRequerimiento/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'carta_responsiva.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const descargaResponsiva = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaResponsiva/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'carta_responsiva.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    const handleDownloadReq = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargarReq/${id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'archivo.req');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error al descargar el archivo .req:', error);
        }
      };

      const descargaCertificado = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaResponsiva/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'carta_responsiva.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };
    const descargaManual = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/descargaResponsiva/${id}/`, {
                responseType: 'blob' // Muy importante para manejar la respuesta como un Blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'carta_responsiva.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

  return (
    <div>
      <Heder />
      <WizardStepsCompleted />
      <div className="container2">
        <div className='titulo-container'>
          <div className='titulo_2'>
            Solicitud Concluida
          </div>
        </div>
      </div>

      <div className="container17">
        <div className="content17">

          <div className='titulo_formulario17'>
            Solicitud #{data.registro_id}
          </div>

          <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold',marginRight:'2%' }}>Nombre:</span>
            {data.nombre}
          </div>

        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>CURP:</span>
            {data.CURP}
        </div>
        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold' }}></span>
            {data.notario === 'true' ? 'Notario Público':''}{data.servidor === 'true' ? 'Servidor Público':''}
        </div>
        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Razón Social:</span>
            {data.secretaria}
        </div>
        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>RFC:</span>
            {data.RFC}
        </div>

        <div className='titulo_formulario17'>
            Dirección 
        </div>

          <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Dirección:</span>
            {data.direccion}
        </div>

        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Municipo:</span>
            {data.municipio_direccion}
        </div>
        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Código Postal:</span>
            {data.cp}
        </div>

        <div className='titulo_formulario17'>
            Información Personal 
        </div>

        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Puesto:</span>
            {data.puesto}
        </div>

        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Área:</span>
            {data.entidad}
        </div>
        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Telefono:</span>
            {data.telefono}
        </div>

        <div className='text_formulario17'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Extensión:</span>
            {data.extencion}
        </div>
       

        </div>


        <div className="content18">
        <div className='titulo_formulario17'>
            Documentos
        </div>
        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Identificación Oficial con Fotografía</span> 
        </div>
        <div>
           <button onClick={descargaIne} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Comprobante de Domicilio</span> 
        </div>
        <div>
           <button onClick={descargaDomicilio} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Clave Única de Registro de Población</span> 
        </div>
        <div>
           <button onClick={descargaCurp} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Registro Federal de Contribuyentes</span> 
        </div>
        <div>
           <button onClick={descargaRFC} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Documento que lo Avala como Servidor Público</span> 
        </div>
        <div>
           <button onClick={descargaAval} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Solicitud</span> 
        </div>
        <div>
           <button onClick={descargaRequerimiento} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Carta Responsiva</span> 
        </div>
        <div>
           <button onClick={descargaResponsiva} className="boton-blob">Abrir archivo</button>
        </div>

        
 
            
        </div>



        </div>

    </div>
  );
}

export default Solicitud_ConcluidaUsuario;
