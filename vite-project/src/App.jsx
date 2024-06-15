// src/App.jsx

import React, { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import Heatmap from './components/HeatMap';
import PieChart from './components/PieChart';
import ScatterPlot from './components/ScatterPlot';
import StackedBarChart from './components/StackedBarChart';
import MapChart from './components/MapChart';
import { fetchData } from './dataServices'; // Assuming you have a data service for fetching data
import { groupBySector } from './components/BarChart'; // Import groupBySector from BarChart.jsx
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(); // Fetch data using your fetchData function
        setData(result);
        setFilteredData(result); // Set initial filtered data to all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData(); // Call the getData function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      // Apply filters based on state
      if (filters.endYear) {
        filtered = filtered.filter(item => item.end_year === filters.endYear);
      }
      if (filters.topics) {
        filtered = filtered.filter(item => item.topic === filters.topics);
      }
      if (filters.sector) {
        filtered = filtered.filter(item => item.sector === filters.sector);
      }
      if (filters.region) {
        filtered = filtered.filter(item => item.region === filters.region);
      }
      if (filters.pestle) {
        filtered = filtered.filter(item => item.pestle === filters.pestle);
      }
      if (filters.source) {
        filtered = filtered.filter(item => item.source === filters.source);
      }
      if (filters.swot) {
        filtered = filtered.filter(item => item.swot === filters.swot);
      }
      if (filters.country) {
        filtered = filtered.filter(item => item.country === filters.country);
      }
      if (filters.city) {
        filtered = filtered.filter(item => item.city === filters.city);
      }

      setFilteredData(filtered); // Update filteredData state
    };

    applyFilters(); // Call the applyFilters function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const sectorData = groupBySector(filteredData); // Group data by sector using groupBySector function

  return (
    <div className="App">
      <header>
        <h1>Title: The main title of the dashboard</h1>
        <div className="filters">
          <select name="endYear" value={filters.endYear} onChange={handleFilterChange}>
            <option value="">All Years</option>
            {/* Populate with unique endYear values from data */}
            {Array.from(new Set(data.map(item => item.end_year))).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select name="topics" value={filters.topics} onChange={handleFilterChange}>
            <option value="">All Topics</option>
            {/* Populate with unique topics values from data */}
            {Array.from(new Set(data.map(item => item.topic))).map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          {/* Add more filters as needed */}
        </div>
      </header>
      <main>
        <div className="chart-container">
          <BarChart data={sectorData} />
          <LineChart data={filteredData} />
          <Heatmap data={filteredData} />
          <PieChart data={filteredData} />
          <ScatterPlot data={filteredData} />
          <StackedBarChart data={filteredData} />
          <MapChart data={filteredData} />
        </div>
      </main>
    </div>
  );
};

export default App;
