import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTasks } from '../hooks/useTasks';

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskStats() {

    const { tasks } = useTasks();
    const completed = tasks.filter(task => task.is_completed === 1).length;
    const notCompleted = tasks.length - completed;

    const data = {
        labels: ['Complétées', 'Non complétées'],
        datasets: [{
            data: [completed, notCompleted],
            backgroundColor: [
                '#10b981', // Vert pour les tâches complétées
                '#f59e0b'  // Orange pour les tâches non complétées
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 10
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 14,
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                    },
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            title: {
                display: true,
                text: 'Statistiques des tâches',
                font: {
                    size: 18,
                    weight: 'bold',
                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                },
                padding: {
                    top: 10,
                    bottom: 20
                },
                color: '#212529'
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                bodyFont: {
                    size: 14
                },
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    }

    return (

        <div className="todo-stats">
            <Doughnut data={data} options={options} className="todo-stats__chart" />
        </div>
    );
}

export default TaskStats;
