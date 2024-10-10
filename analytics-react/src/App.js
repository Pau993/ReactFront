import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const apiUrl = 'http://localhost:8080/tasks';

const AnaliticaTareas = () => {
    const [graficoSeleccionado, setGraficoSeleccionado] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (graficoSeleccionado) {
            obtenerDatos(graficoSeleccionado);
        }
    }, [graficoSeleccionado]);

    async function obtenerDatos(endpoint) {
        try {
            const response = await fetch(`${apiUrl}/${endpoint}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const generarGrafico = () => {
        const ctx = document.getElementById('graficoCanvas').getContext('2d');

        switch (graficoSeleccionado) {
            case 'dificultad':
                generarHistogramaDificultad(ctx, data);
                break;
            case 'finalizadas':
                generarTareasFinalizadasTiempo(ctx, data);
                break;
            case 'prioridad':
                generarPromediosTareasPrioridad(ctx, data);
                break;
            case 'tiempo':
                generarTiempoTotalInvertido(ctx, data);
                break;
            default:
                alert('Por favor seleccione una gráfica.');
        }
    };

    const generarHistogramaDificultad = (ctx, data) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Cantidad de Tareas',
                    data: Object.values(data),
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const generarTareasFinalizadasTiempo = (ctx, data) => {
        const fechas = data.map(task => task.fechaFinalizacion);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Tareas Finalizadas',
                    data: fechas.map(() => 1),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const generarPromediosTareasPrioridad = (ctx, data) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Número de Tareas',
                    data: Object.values(data),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const generarTiempoTotalInvertido = (ctx, data) => {
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Tiempo Total Invertido'],
                datasets: [{
                    label: 'Horas',
                    data: [data],
                    backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgba(153, 102, 255, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    };

    return (
        <div>
            <h1>Analítica de Tareas</h1>

            <label htmlFor="grafica">Seleccionar gráfica:</label>
            <select
                id="grafica"
                value={graficoSeleccionado}
                onChange={(e) => setGraficoSeleccionado(e.target.value)}
            >
                <option value="">Seleccionar gráfica</option>
                <option value="dificultad">Histograma de Dificultad</option>
                <option value="finalizadas">Número de tareas finalizadas por tiempo</option>
                <option value="prioridad">Promedios de tareas por prioridad</option>
                <option value="tiempo">Tiempo total invertido por tareas realizadas</option>
            </select>
            <button onClick={generarGrafico}>Generar</button>

            <div id="contenedorGrafico">
                <canvas id="graficoCanvas"></canvas>
            </div>
        </div>
    );
};

export default AnaliticaTareas;

