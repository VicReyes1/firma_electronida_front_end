import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import '../../css/Continuar_soli.css';

import Heder from '../heder';
import Swal from 'sweetalert2';

function Continuar_solicitud1() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const { id } = useParams();

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleFile2Change = (e) => {
        const file = e.target.files[0];
        // Verificar si el archivo tiene la extensión .req
        if (file.name.endsWith('.req')) {
            setFile2(file);
        } else {
            alert('El archivo debe tener la extensión .req');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file2) {
            alert('Por favor, selecciona un archivo .req');
            return;
        }

        const formData = new FormData();
        formData.append('file2', file2);
        formData.append('pdfFile', file1);
        formData.append('preregistroId', id); // Adjunta el ID del preregistro

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/usuario/subir-archivo-req', formData, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            Swal.fire({
                title: "Documentos Enviados",
                text: "El usuario recibió manuales y .req",
                icon: "success"
            }).then(() => {
                // Redireccionar después de cerrar el SweetAlert
                window.location.href = '/mi_solicitud'; // Reemplaza '/nueva-ruta' con la ruta deseada
            });
             
            
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al subir los archivos.",
                icon: "error"
            });
            console.error('Error al enviar el formulario', error);
        }
    };

    return (
        <div>
            <Heder />
            <div className='continuar_soli'>
                <div className='titulo-container'>
                    <div className='titulo_2'>
                        Continuar Solicitud
                    </div>
                </div>
                <div className='textito'>
                    Suba las copias firmadas de los siguientes documentos. 
                </div>
                <div className='textito2'>
                    En caso de no proporcionar los documentos su solicitud se eliminará después de 7 días. 
                </div>
                <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>Solicitud de Requerimiento</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile1Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file1 ? <span className="file-name">{file1.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
                </div>
                <div className='text_formulario'>
                    <span style={{ fontWeight: 'bold' }}>.req</span>
                </div>
                <div className="files">
                    <label className="custom-file-label">
                        Seleccionar Archivo
                        <input 
                            type="file" 
                            onChange={handleFile2Change} 
                            className="custom-file-input"
                        />
                    </label>
                    {file2 ? <span className="file-name">{file2.name}</span> : <span className="no-file-message">Ningún archivo seleccionado</span>}
                </div>
                <div className='textito33'>
                    Documentos enviados por correo o descárguelos <Link to="/liga que nos pasa aide" style={{textDecoration: 'underline'}}>aquí</Link>. 
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/mi_solicitud" >
                        <Button style={{  marginRight: '65%' }} className='boton333' variant="primary" type="submit" >
                            Atrás
                        </Button>
                    </Link>
                    <Button  className='boton3334' variant="primary" type="submit" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Continuar_solicitud1;
