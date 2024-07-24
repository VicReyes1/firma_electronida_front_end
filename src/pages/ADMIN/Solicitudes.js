import React, { useState } from 'react';
import Heder from '../heder';
import Tabla_Solicitudes_Admin from '../Componentes/Tabla';
import '../../css/Admin_Solicitudes.css'; // Asegúrate de importar el archivo CSS
import Tabla_Solicitudes_concluidas_Admin from '../Componentes/Tabla_concluidas';
import Tabla_Solicitudes_Nuevas_Admin from '../Componentes/Tabla_nuevas';
import Tabla_Solicitudes_Suspendidas_Admin from '../Componentes/Tabla_suspendidas';
import Estadisticas from '../Componentes/Estadisticas';

function Admin_Solicitudes() {
  const token = localStorage.getItem('token');
  const [activeTab, setActiveTab] = useState('solicitudesEnCurso');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Heder />

      <div className="custom-tabs">
        <div className="nav-tabs">
          <div
            className={`nav-link ${activeTab === 'solicitudesEnCurso' ? 'active' : ''}`}
            onClick={() => handleTabClick('solicitudesEnCurso')}
          >
            Solicitudes en Curso
          </div>
          <div
            className={`nav-link ${activeTab === 'solicitudesNuevas' ? 'active' : ''}`}
            onClick={() => handleTabClick('solicitudesNuevas')}
          >
            Solicitudes Nuevas
          </div>
          <div
            className={`nav-link ${activeTab === 'solicitudesConcluidas' ? 'active' : ''}`}
            onClick={() => handleTabClick('solicitudesConcluidas')}
          >
            Solicitudes Concluidas
          </div>
          <div
            className={`nav-link ${activeTab === 'solicitudesSuspendidas' ? 'active' : ''}`}
            onClick={() => handleTabClick('solicitudesSuspendidas')}
          >
            Solicitudes Supendidas
          </div>
          <div
            className={`nav-link ${activeTab === 'estadisticas' ? 'active' : ''}`}
            onClick={() => handleTabClick('estadisticas')}
          >
            Estadísticas
          </div>
        </div>

        <div className="tab-content">
          <div className={`tab-pane ${activeTab === 'solicitudesEnCurso' ? 'active' : ''}`}>
            
            <div className="container2">
              <div className='titulo-container'>
                <div className='titulo_2'>
                  Solicitudes en Curso
                </div>
              </div>
            </div>

            <Tabla_Solicitudes_Admin tab={activeTab}/>
          </div>

          <div className={`tab-pane ${activeTab === 'solicitudesNuevas' ? 'active' : ''}`}>
            
            <div className="container2">
              <div className='titulo-container'>
                <div className='titulo_2'>
                  Solicitudes Nuevas
                </div>
              </div>
            </div>

            <Tabla_Solicitudes_Admin tab={activeTab}/>
          </div>

          <div className={`tab-pane ${activeTab === 'solicitudesConcluidas' ? 'active' : ''}`}>
            <div className="container2">
              <div className='titulo-container'>
                <div className='titulo_2'>
                  Solicitudes Concluidas
                </div>
              </div>
            </div>
            <Tabla_Solicitudes_Admin tab={activeTab}/>
          </div>

          <div className={`tab-pane ${activeTab === 'solicitudesSuspendidas' ? 'active' : ''}`}>
            
            <div className="container2">
              <div className='titulo-container'>
                <div className='titulo_2'>
                  Solicitudes Supendidas
                </div>
              </div>
            </div>

            <Tabla_Solicitudes_Suspendidas_Admin />
          </div>


          <div className={`tab-pane ${activeTab === 'estadisticas' ? 'active' : ''}`}>
            <div className="container2">
              <div className='titulo-container'>
                <div className='titulo_2'>
                  Estadísticas
                </div>
              </div>
            </div>

            <Estadisticas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Solicitudes;
