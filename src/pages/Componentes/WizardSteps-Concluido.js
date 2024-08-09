import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/WizardSteps.css'
import Progreso1 from '../../Images/Progreso4.svg';

const WizardStepsCompleted = () => {
    return (
        <ul className="wizard-steps" style={{ backgroundImage: `url(${Progreso1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <li>
                <h5>Paso 1</h5>
                <span>Ingresar Documentos e Información</span>
            </li>
            <li>
                <h5>Paso 2</h5>
                <span>Carga Solicitud y Requerimiento</span>
            </li>
            <li>
                <h5 >Paso 3</h5>
                <span>Carta de Confidencialidad</span>
            </li>
            <li>
                <h5 style={{ marginLeft: '20%' }}>Concluido</h5>
                <span></span>
            </li>
           
        
        </ul>
    );
}

export default WizardStepsCompleted;


