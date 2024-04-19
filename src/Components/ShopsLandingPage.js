import React, { useState, useEffect} from 'react'
import { ref, get } from 'firebase/database';
import "../Styles/YojnaTable.css"
import { database } from '../firebaseconfig';
import Navbar from "./Navbar";
import { useTranslation } from 'react-i18next'



const Soil = () => {
    const [data, setData] = useState([]);
    const {t} = useTranslation();
    const [stateData, setStateData] = useState({});
    const [states, setStates] = useState([]);
    const [filters, setFilters] = useState({ state: '', district: '' });
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // added for the page loader

    
    useEffect(() => {
      // Simulate a 4-second loading time on landing
      const timeout = setTimeout(() => {
          setLoading(false);
      }, 4000);

      return () => clearTimeout(timeout);
  }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const stateSnapshot = await get(ref(database, '/states'));
            const soilSnapshot = await get(ref(database, '/soil'));
    
            setStateData(stateSnapshot.val());
            setStates(Object.keys(stateSnapshot.val()));
            setData(soilSnapshot.val());
    
            setFilters({ state: '', district: '' });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const filterData = () => {
          let filtered = data;
    
          if (filters.state) {
            filtered = filtered.filter(item => item.States === filters.state);
          }
    
          if (filters.district) {
            filtered = filtered.filter(item => item.District === filters.district);
          }
    
          setFilteredData(filtered);
        };
    
        filterData();
      }, [data, filters]);

      const handleStateChange = event => {
        const selectedState = event.target.value;
        setFilters(prevFilters => ({
          ...prevFilters,
          state: selectedState,
          district: '' // Reset district when state changes
        }));
      };
    
      const handleDistrictChange = event => {
        const selectedDistrict = event.target.value;
        setFilters(prevFilters => ({
          ...prevFilters,
          district: selectedDistrict
        }));

};

return(
    <div className="navbar"> <Navbar showReadContentButton={false} showTranslationButton={false}/>
    {loading ? (
            <div className="preloader">
            <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
            <p>{t('Wait_text')}</p>
        </div>
        ) : (
          <>
      <div className="apmc-ribbon">
        <h1 className='yojna-h1'>Soil Test Labs</h1>
      </div>
      <label htmlFor="stateSelect">Select State:</label>
      <select id="stateSelect" onChange={handleStateChange}>
        <option value="">All States</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>
      <label htmlFor="districtSelect">Select District:</label>
      <select id = "districtSelect" onChange={handleDistrictChange} value={filters.district}>
  <option value="">All Districts</option>
  {stateData[filters.state] &&
    stateData[filters.state].map((district, index) => (
      <option key={index} value={district}>{district}</option>
    ))}
</select>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>District</th>
            <th>Lab Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.States}</td>
              <td>{item.District}</td>
              <td>{item.LabName}</td>
              <td>{item.Address}</td>
              <td>{item.PhoneNumber}</td>
              <td>{item.EmailAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
        )}
    </div>
  );
};

export default Soil;

