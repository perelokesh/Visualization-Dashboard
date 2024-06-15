// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const data = [
//   { "intensity": 6, "sector": "Energy", "topic": "gas", "likelihood": 3 },
//   { "intensity": 6, "sector": "Energy", "topic": "oil", "likelihood": 3 },
//   { "intensity": 6, "sector": "Energy", "topic": "consumption", "likelihood": 3 },
//   { "intensity": 6, "sector": "Environment", "topic": "oil", "likelihood": 2 },
//   { "intensity": 6, "sector": "", "topic": "market", "likelihood": 3 },
//   { "intensity": 6, "sector": "Energy", "topic": "oil", "likelihood": 3 }
// ];

// const PieChart = ({ width }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const height = Math.min(500, width / 2);
//     const outerRadius = height / 2 - 10;
//     const innerRadius = outerRadius * 0.75;

//     // Aggregate data by sector
//     const aggregatedData = d3.nest()
//       .key(d => d.sector || 'Unknown')
//       .rollup(v => d3.sum(v, d => d.intensity))
//       .entries(data)
//       .map(d => ({ sector: d.key, intensity: d.value }));

//     const totalIntensity = d3.sum(aggregatedData, d => d.intensity);
//     aggregatedData.forEach(d => {
//       d.percentage = ((d.intensity / totalIntensity) * 100).toFixed(2);
//     });

//     const color = d3.scaleOrdinal(d3.schemeCategory10)
//       .domain(aggregatedData.map(d => d.sector));

//     const svg = d3.select(svgRef.current)
//       .attr("viewBox", [-width / 2, -height / 2, width, height]);

//     const arc = d3.arc()
//       .innerRadius(innerRadius)
//       .outerRadius(outerRadius);

//     const pie = d3.pie()
//       .sort(null)
//       .value(d => d.intensity);

//     const path = svg.selectAll("path")
//       .data(pie(aggregatedData))
//       .join("path")
//       .attr("fill", d => color(d.data.sector))
//       .attr("d", arc)
//       .each(function (d) { this._current = d; });

//     const tooltip = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("background", "#fff")
//       .style("padding", "5px 10px")
//       .style("border", "1px solid #ccc")
//       .style("border-radius", "3px")
//       .style("pointer-events", "none")
//       .style("display", "none");

//     path.on("mouseover", (event, d) => {
//       tooltip.style("display", "block")
//         .html(`Sector: ${d.data.sector}<br>Percentage: ${d.data.percentage}%`);
//     }).on("mousemove", (event) => {
//       tooltip.style("left", (event.pageX + 10) + "px")
//         .style("top", (event.pageY + 10) + "px");
//     }).on("mouseout", () => {
//       tooltip.style("display", "none");
//     });

//     function arcTween(a) {
//       const i = d3.interpolate(this._current, a);
//       this._current = i(0);
//       return t => arc(i(t));
//     }

//   }, [width]);

//   return (
//     <svg ref={svgRef}></svg>
//   );
// };

// export default PieChart;
// src/dataService.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/data');
    return response.data;
  } catch (error) {
    console.error('Error retrieving the data:', error);
    throw error;
  }
};
