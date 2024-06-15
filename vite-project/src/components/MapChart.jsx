// src/components/MapChart.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MapChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: data.mapData,
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MapChart;
