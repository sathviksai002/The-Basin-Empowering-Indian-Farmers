import React, { useState, useEffect} from 'react'
import { ref, get } from 'firebase/database';
import { database } from '../firebaseconfig';
import Navbar from "./Navbar";
import { useTranslation } from 'react-i18next';




const FertilizerLanding = ()=>{
    const [cropData,setCropData] = useState([]);
    const [loading, setLoading] = useState(true); // added for the page loader
    const { t } = useTranslation();


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
            const stateSnapshot = await get(ref(database, '/crops'));
            setCropData(stateSnapshot.val());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
    console.log(cropData);
      }, []);

      return (
        <div>
            <Navbar showReadContentButton={false} showTranslationButton={false}/>
            {loading ? (
            <div className="preloader">
            <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
            <p>{t('Wait_text')}</p>
        </div>
        ) : (
            <>
          <div className="apmc-ribbon">
            <h1 className='yojna-h1'>Crop Data</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Fertilizer</th>
                <th>KG Per Acre</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {cropData.map((item, index) => (
                <tr key={index}>
                  <td>{item.crop}</td>
                  <td>{item.fertilizer}</td>
                  <td>{item.requirement}</td>
                  <td>{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        )}
        </div>
      );

}
export default FertilizerLanding;