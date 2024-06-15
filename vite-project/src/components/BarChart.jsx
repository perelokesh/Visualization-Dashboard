// src/components/BarChart.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { fetchData } from '../dataServices'; // Assuming you have a fetchData function defined in dataServices

// Function to group data by sector
export const groupBySector = (data) => {
  return data.reduce((acc, item) => {
    const sector = item.sector || 'Unknown';
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += 1;
    return acc;
  }, {});
};

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Count by Sector',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Count',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Sector',
              },
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
