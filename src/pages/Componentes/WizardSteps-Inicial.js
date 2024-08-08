import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/WizardSteps.css'
import Progreso1 from '../../Images/Progreso1.svg';

const WizardStepsInicial = () => {
    return (
        <ul className="wizard-steps" style={{ backgroundImage: `url(${Progreso1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <li>
                <h5>Paso 1: Ingresar Documentos e Información</h5>
                <span>Proceso de Revisión y Validación de documentos e Identidad</span>
            </li>
            <li>
                <h5 style={{ color: 'black' }} >Paso 2: Carga Solicitud y Requerimiento</h5>
                <span style={{ color: 'black' }}>Proceso de Validación </span>
            </li>
            <li>
                <h5 style={{ color: 'black' }}>Paso 3: Carta de Confidencialidad y Responsabilida</h5>
                <span style={{ color: 'black' }}>Proceso de Terminación
                </span>
            </li>
           
        </ul>
    );
}

export default WizardStepsInicial;



