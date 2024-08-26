import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Estadisticas = () => {
  const [data, setData] = useState({ nuevo: 0, enCurso: 0, concluida: 0, suspendida: 0 });
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const columnOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Estado de Solicitudes (Gráfico de Columnas)'
    },
    xAxis: {
      categories: ['Nueva', 'En Progreso', 'Concluida', 'Suspendida']
    },
    yAxis: {
      title: {
        text: 'Número de Solicitudes'
      }
    },
    series: [{
      name: 'Solicitudes',
      data: [data.nuevo, data.enCurso, data.concluidas, data.suspendidas]
    }]
  };

  const lineOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Estado de Solicitudes (Gráfico de Líneas)'
    },
    xAxis: {
      categories: ['Nueva', 'En Progreso', 'Concluida', 'Suspendida']
    },
    yAxis: {
      title: {
        text: 'Número de Solicitudes'
      }
    },
    series: [{
      name: 'Solicitudes',
      data: [data.nuevo, data.enCurso, data.concluidas, data.suspendidas]
    }]
  };

  const pieOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Estado de Solicitudes (Gráfico Circular)'
    },
    series: [{
      name: 'Solicitudes',
      colorByPoint: true,
      data: [
        { name: 'Nueva', y: data.nuevo },
        { name: 'En Progreso', y: data.enCurso },
        { name: 'Concluida', y: data.concluidas },
        { name: 'Suspendida', y: data.suspendidas }
      ]
    }]
  };

  useEffect(() => {
    fetch(`${apiUrl}/admin/estadisticas`,{
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Gráficos de Estado de Solicitudes</h1>
      <HighchartsReact
        highcharts={Highcharts}
        options={columnOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={lineOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={pieOptions}
      />
    </div>
  );
};

export default Estadisticas;
