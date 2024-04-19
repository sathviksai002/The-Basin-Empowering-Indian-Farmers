import React, { useState, useEffect} from 'react'
import { ref, get } from 'firebase/database';
import "../Styles/YojnaTable.css"
import { database } from '../firebaseconfig';
import Navbar from "./Navbar";
import { useTranslation } from 'react-i18next';
import enSummary from './summary/en.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

//yojnaSummary

const useTable = () => {
  const { t } = useTranslation();
    const [data,setData] = useState([]);
    const [lang, setLang] = useState(0);
    const langu = ['English', 'हिन्दी', 'తెలుగు','ಕನ್ನಡ','தமிழ்'];
    const [loading, setLoading] = useState(true); // added for the page loader
    const [summary, setSummary] = useState(enSummary.yojnaSummary);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
      // Simulate a 4-second loading time on landing
      const timeout = setTimeout(() => {
          setLoading(false);
      }, 4000);

      return () => clearTimeout(timeout);
  }, []);

    const handleLanguageChange = (event) => {
        setLang(event.target.value);
    };

    const handleReadSummary = () => {
      const summaryText = summary;
    const utterance = new SpeechSynthesisUtterance(summaryText);
    utterance.pitch = 1.4;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
    setUtterance(utterance);
    setIsSpeaking(true);
    utterance.onerror = function (event) {
      console.error('Speech synthesis error:', event.error);
    };
    };

    const handleStopReading = () => {
      if (utterance) {
          speechSynthesis.cancel();
          setIsSpeaking(false);
      }
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
                const dataSnapshot = await get(ref(database,'/yojnas'));
                const fetchedData = dataSnapshot.val();
                if(fetchedData){
                    const dataArray = Object.values(fetchedData);
                    setData(dataArray);
                }
            }catch(error){
                console.error('Error fetching the data!',error.message);
            }
        };
        fetchData();

        return () => {

        };
    },[]);
    return {data, lang, handleReadSummary, handleStopReading, handleLanguageChange,langu,loading, t, isSpeaking};
};

const Yojna1 = () => {
  const {data, lang, handleLanguageChange,handleReadSummary, handleStopReading, langu, loading, t, isSpeaking} = useTable();
  
    return(
      <div className="navbar"> <Navbar showReadContentButton={false} showTranslationButton={false} showChannelButton = {true}/>
      {loading ? (
            <div className="preloader">
            <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
            <p>{t('Wait_text')}</p>
        </div>
        ) : (
        <div>
            <div className="apmc-ribbon">
        <h1 className='yojna-h1'>Yojnas</h1>
        </div>
        <div>
            <div className="select-lang">
          <h3>Select Language</h3>
          <button 
        className="navbar-btn"
        type = "button"
        onClick={handleReadSummary}
        disabled={isSpeaking}
        >
            <FontAwesomeIcon icon={faMicrophone} /> {t('navbar.LiveChat')}
            </button>
            {isSpeaking && (
                <button
                    className="navbar-btn"
                    type="button"
                    onClick={handleStopReading}
                >
                    <FontAwesomeIcon icon={faStop} /> Stop Reading
                </button>
            )}
          </div>
          <div className="dropdown-menu">
          <select className = 'dropdown' value={lang} onChange={handleLanguageChange}>
            {langu.map((language, index) => (
              <option key={index} value={index}>{language}</option>
            ))}
          </select>
          <p className='select'>Selected Language: {langu[lang]}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item['Scheme Name'][lang]}</td>
                <td>{item['Purpose'][lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )}
      </div>
    );
};

export default Yojna1