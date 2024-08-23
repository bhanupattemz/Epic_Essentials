import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardsalesChart({ orders }) {
    const salesByMonth = Array(12).fill(0);
    
    orders.forEach(order => {
        const month = new Date(order.createdAt).getMonth(); 
        salesByMonth[month] += order.totalPrice; 
    });

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales 2024',
                data: salesByMonth,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Comparison'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: false
    };

    return (
        <Line data={data} options={options} />
    );
}
