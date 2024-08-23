import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardStockChart = ({ products }) => {
  let stock = [0, 0]
  if (products) {
    for (let prod of products) {
      if (prod.stock > 0) {
        stock[0] += 1
      } else {
        stock[1] += 1
      }
    }
  }
  const data = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        data: stock,
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Status',
      },
    },
    cutout: '50%',
  };

  return <Doughnut data={data} options={options} />;
};

export default DashboardStockChart;