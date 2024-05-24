import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../css/Continuar_soli.css';
import Heder from '../heder';
import Swal from 'sweetalert2';
import axios from 'axios';

function Continuar_solicitud2() {
    const [file1, setFile1] = useState(null);
    const [preregistroId, setPreregistroId] = useState('1'); // Asume que tienes el ID del preregistro

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file1) {
            Swal.fire({
                title: "Error",
                text: "Por favor, selecciona un archivo.",
                icon: "error"
            });
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', file1);
        formData.append('preregistroId', preregistroId); // Adjunta el ID del preregistro

        try {
            const response = await axios.post('http://localhost:3001/usuario/subirCarta', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: "Proceso Concluido",
                text: "Su solicitud será guardada en este sitio.",
                icon: "success"
            });
            console.log('Formulario enviado', response.data);
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
                    <span style={{ fontWeight: 'bold' }}>Carta Responsiva</span>
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
                    {file1 ? null : <span className="no-file-message">Ningún archivo seleccionado</span>}
                </div>
                <div className='textito3'>
                    Documentos enviados por correo o descárguelos <Link to="/liga que nos pasa aide" style={{ textDecoration: 'underline' }}>aquí</Link>.
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/mi_solicitud">
                        <Button style={{ marginRight: '65%' }} className='boton333' variant="primary" type="submit">
                            Atrás
                        </Button>
                    </Link>
                    <Button className='boton3334' variant="primary" type="submit" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Continuar_solicitud2;
