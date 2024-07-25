import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../css/Continuar_soli.css';
import Heder from '../heder';
import Swal from 'sweetalert2';
import axios from 'axios';
import WizardStepsInProgress2 from '../Componentes/WizardSteps-Progreso2';

function Continuar_solicitud2() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { id } = useParams();
    const [file1, setFile1] = useState(null);
    const [preregistroId, setPreregistroId] = useState(id); // Asume que tienes el ID del preregistro

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
            const response = await axios.post(`${apiUrl}/usuario/subirCarta`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: "Proceso Concluido",
                text: "Su solicitud será guardada en este sitio.",
                icon: "success"
            }).then(() => {
                // Redireccionar después de cerrar el SweetAlert
                window.location.href = '/admin&solicitudes'; // Reemplaza '/nueva-ruta' con la ruta deseada
              })
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
            <WizardStepsInProgress2 />
            <div className='continuar_soli'>
                <div className='titulo-container'>
                    <div className='titulo_2'>
                        Continuar Solicitud
                    </div>
                </div>
                <div className='textito'>
                Carga el siguiente documento digital.
                </div>
                <div className='textito2'>
                    En caso de no proporcionar los documentos su solicitud se eliminará después de 3 días.
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
