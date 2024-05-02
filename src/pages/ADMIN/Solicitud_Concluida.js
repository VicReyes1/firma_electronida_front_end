import React, { useState, useEffect } from 'react';
import Heder from '../heder';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../../css/Solicitud_Concluida.css';


function Solicitud_Concluida() {

    const [data, setData] = useState({
        registro_id:'1245456',
        nombre:'Jesús Adolfo Márquez Trejo',
        CURP:'MATJ010717HPLRRSA3',
        notario:'false',
        servidor:'true',
        secretaria:'Secretaría del Despacho de la Persona Titular del Poder Ejecutivo',
        RFC:'MATJ010717D40',
        direccion:'Blvd. Felipe Angeles, Km. 93.50, Centro Minero, Edificio 1B, Col, Venta Prieta',
        municipio_direccion: 'Pachuca de Soto',
        cp:'42000',
        puesto:'Agente Certificador',
        entidad:'Dirección General de Innovación Gubernamental',
        telefono:'797-140-58-61',
        extencion:'6453',
        identificacionBlob: null 
      });

      useEffect(() => {
        // Simulando la obtención del blob de un archivo PDF
        const fetchidentificacionBlob = async () => {
            try {
                // Simulando la obtención del blob de un archivo PDF
                const identificacionBlob = await fetch('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf').then(response => response.blob());
                setData(prevData => ({
                    ...prevData,
                    identificacionBlob: identificacionBlob // Almacenamos el blob en el estado
                }));
            } catch (error) {
                console.error('Error fetching PDF blob:', error);
            }
        };

        fetchidentificacionBlob();
    }, []);


    const handleOpenIdentificacionBlob = () => {
        if (data.identificacionBlob) {
            const url = URL.createObjectURL(data.identificacionBlob);
            window.open(url, '_blank');
        }
    };

    const fetchData = async () => {
        try {
          const response = await axios.get('URL_DE_TU_API');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


  return (
    <div>
      <Heder />
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
            {data.municipio}
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
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Comprobante de Domicilio</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Clave Única de Registro de Población</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Registro Federal de Contribuyentes</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Documento que lo Avala como Servidor Público</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Solicitud</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>.Req</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        <div className='text_formulario177'>
            <span style={{ fontWeight: 'bold', marginRight:'2%' }}>Carta Responsiva</span> 
        </div>
        <div>
           <button onClick={handleOpenIdentificacionBlob} className="boton-blob">Abrir archivo</button>
        </div>

        
 
            
        </div>







        </div>

    </div>
  );
}

export default Solicitud_Concluida;
