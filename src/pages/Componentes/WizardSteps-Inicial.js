import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/WizardSteps.css'
import Progreso1 from '../../Images/Progreso1.svg';

const WizardStepsInicial = () => {
    return (
        <ul className="wizard-steps" style={{ backgroundImage: `url(${Progreso1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <li>
                <h5>Paso 1</h5>
                <span>Preregistro</span>
            </li>
            <li>
                <h5 style={{ color: 'black' }} >Paso 2</h5>
                <span style={{ color: 'black' }}>Carga de documentos</span>
            </li>
            <li>
                <h5 style={{ color: 'black' }}>Paso 3</h5>
                <span style={{ color: 'black' }}>Carta responsiva</span>
            </li>
           
        </ul>
    );
}

export default WizardStepsInicial;



