import React, { useState, useEffect, useTransition } from 'react';
import "../Styles/APMCTable.css"
import Navbar from "./Navbar"
import { useTranslation } from 'react-i18next';

const Table = () => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ state: '', district: '' });
  const [loading, setLoading] = useState(true); // added for the page loader

  useEffect(() => {
    // Simulate a 4-second loading time on landing
    const timeout = setTimeout(() => {
        setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001b208a862ece341e551400344aeb08a98&format=json&limit=7000');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData['records']);

        // Extract states and districts for filtering
        const states = new Set(jsonData['records'].map(item => item.state));
        const districtMap = {};
        jsonData['records'].forEach(item => {
          if (!districtMap[item.state]) {
            districtMap[item.state] = new Set();
          }
          districtMap[item.state].add(item.district);
        });

        setFilters({ state: '', district: '' }); // Reset filters
        setFilters({ states: Array.from(states), districtMap });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStateChange = event => {
    const selectedState = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      state: selectedState,
      district: ''
    }));
  };

  const handleDistrictChange = event => {
    const selectedDistrict = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      district: selectedDistrict
    }));
  };

  const filteredData = data.filter(item => {
    if (filters.state && item.state !== filters.state) {
      return false;
    }
    if (filters.district && item.district !== filters.district) {
      return false;
    }
    return true;
  });

  return (
    <div className="navbar"> <Navbar showReadContentButton={false} showTranslationButton={false}/>
    {loading ? (
            <div className="preloader">
            <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
            <p>{t('Wait_text')}</p>
        </div>
        ) : (
    <div>
        <div className="apmc-ribbon">
      <h1 classname = 'apmc-h1'>APMC TABLE</h1>
      </div>
      <div className='dropdown-menu'>
        <label htmlFor="stateFilter">State : </label>
        <select className = 'dropdown' id="stateFilter" value={filters.state} onChange={handleStateChange}>
          <option value="">All</option>
          {filters.states && filters.states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
        <label htmlFor="districtFilter">District : </label>
        <select className = 'dropdown' id="districtFilter" value={filters.district} onChange={handleDistrictChange}>
          <option value="">All</option>
          {filters.districtMap && filters.state && filters.districtMap[filters.state] &&
            Array.from(filters.districtMap[filters.state]).map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))
          }
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>District</th>
            <th>Market</th>
            <th>Commodity</th>
            <th>Variety</th>
            <th>Grade</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.state}</td>
              <td>{item.district}</td>
              <td>{item.market}</td>
              <td>{item.commodity}</td>
              <td>{item.variety}</td>
              <td>{item.grade}</td>
              <td>{item.min_price}</td>
              <td>{item.max_price}</td>
              <td>{item.modal_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
    </div>
  );
};

export default Table;