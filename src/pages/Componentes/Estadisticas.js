import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos del DatePicker
import { setMonth, setYear } from 'date-fns'; 
import { es } from 'date-fns/locale';
registerLocale('es', es);

const Estadisticas = () => {
  registerLocale('es', es);

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

  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date) => {
    setStartDate(date);
    //data.filter()
  };

  useEffect(() => {
    const selectedMonth = startDate.getMonth() + 1; // getMonth() es 0-indexado
    const selectedYear = startDate.getFullYear();

    fetch(`${apiUrl}/admin/estadisticas`, {
      method: 'POST', // Cambiar a POST
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido
      },
      body: JSON.stringify({
        month: selectedMonth, // Enviar el mes
        year: selectedYear // Enviar el año
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data); // Actualizar el estado con los nuevos datos
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [startDate]);

  return (
    <div>
      <h1>Gráficos de Estado de Solicitudes</h1>

      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker // Solo muestra mes y año
        showFullMonthYearPicker // Muestra el selector completo de mes y año
        showTwoColumnMonthYearPicker // Opcional: dos columnas para una mejor vista
        locale="es"
      />

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
