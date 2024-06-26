import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Estadisticas = () => {
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
      data: [10, 15, 20, 5] // Datos ficticios
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
      data: [10, 15, 20, 5] // Datos ficticios
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
        { name: 'Nueva', y: 10 },
        { name: 'En Progreso', y: 15 },
        { name: 'Concluida', y: 20 },
        { name: 'Suspendida', y: 5 }
      ] // Datos ficticios
    }]
  };

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
