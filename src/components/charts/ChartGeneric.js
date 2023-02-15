import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function ChartGeneric() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(40, 50, 100)',
                tension: 0.1
            }
        ]
    };
    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
    return (_jsx("div", { children: _jsx("div", { style: { border: 'solid black 5px' }, children: _jsx(Doughnut, { data: chartData }) }) }));
}
