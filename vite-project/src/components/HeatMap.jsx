// src/components/Heatmap.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Heatmap = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'heatmap',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Heatmap',
            data: data.heatmapData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default Heatmap;
