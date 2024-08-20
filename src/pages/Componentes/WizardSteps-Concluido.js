import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/WizardSteps.css'
import Progreso1 from '../../Images/Concluido.svg';

const WizardStepsCompleted = () => {
    return (
        <ul className="wizard-steps" style={{ backgroundImage: `url(${Progreso1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
           {/* <li>
                <h5 style={{ color: 'grey' }}>Paso 1 </h5>
                <span style={{ color: 'grey' }}>Ingresar Documentos e Información</span>
            </li>
            <li>
                <h5 style={{ color: 'grey' }}>Paso 2</h5>
                <span style={{ color: 'grey' }}>Carga Solicitud y Requerimiento</span>
            </li>
            <li>
                <h5 style={{ color: 'grey' }}>Paso 3</h5>
                <span style={{ color: 'grey' }}>Carta de Confidencialidad</span>
            </li>
            <li>
                <h5 style={{ marginLeft: '20%' }}>Concluido</h5>
                <span></span>
            </li>*/}
           
        
        </ul>
    );
}

export default WizardStepsCompleted;


