import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS } from 'chart.js';
import { LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
export default function ChartLine({ title, style }) {
    ChartJS.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
            {
                label: title,
                data: [65, 59, 80, 81, 56, 55, 40, 10],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(40, 50, 100)',
                borderWidth: 3
            }
        ]
    };
    return (_jsx("div", { className: 'chart', children: _jsx(Line, { style: style, data: chartData }) }));
}
