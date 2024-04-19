import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AudioComponent from './AudioComponent'; 
import i18n from './i18n';
import "../Styles/LanguageDropdown1.css"

const WeatherInput = ({ selectedLanguage }) => {
    const { t } = useTranslation();
    const [weatherDict, setWeatherDict] = useState({});
    const API_KEY = '8f0a265ca67b78b77d58f4afe6d48ae8';
    const [location, setLocation] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [locationName, setLocationName] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [loading, setLoading] = useState(true); // added for the page loader
    // const [loadingAudio, setLoadingAudio] = useState(false); // add loading state for audio loding

    useEffect(() => {
        // Simulate a 4-second loading time on landing
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const fetchData = async (latitude, longitude) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
                const data = response.data;
                const newWeatherDict = {};
                setLocationName(data['city']['name']);
                for (let i = 0; i < data.list.length; i++) {
                    const { dt_txt, weather } = data.list[i];
                    const [date, time] = dt_txt.split(' ');
                    const desc = weather[0].description;

                    if (!newWeatherDict[date]) {
                        newWeatherDict[date] = {};
                    }

                    newWeatherDict[date][time] = desc;
                }

                setWeatherDict(newWeatherDict);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                }, (error) => {
                    console.error('Error getting location:', error);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        if (location) {
            fetchData(location.latitude, location.longitude);
        } else {
            getLocation();
        }
    }, [location, API_KEY]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedTime(''); // Reset selected time when date changes
        setDescription(''); // Reset description
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        if (selectedDate && event.target.value) {
            setDescription(weatherDict[selectedDate][event.target.value]);
        }
    };
    useEffect(() => {
        const translateText = async () => {
            try {
                setLoading(true);
                const response = await axios.post('https://127.0.0.1:5000/translate', { locationName, description, selectedLanguage, previousLanguage : i18n.language });
                setLocationName(response.data.loc);
                setDescription(response.data.desc);
    
                // Fetch audio URL based on the translated description
                const audioResponse = await axios.post('https://127.0.0.1:5000/audio', { selectedDate, selectedTime, selectedLanguage, previousLanguage : i18n.language, description });
                setAudioUrl( audioResponse.data.audio_url);
                console.log(audioUrl);
            } catch (error) {
                console.error('Translation error:', error);
            }
            finally{
            setLoading(false); 
            }
        };
    
        if (locationName && description) {
            translateText();
        }
    }, [locationName, description, selectedLanguage, selectedDate, selectedTime, location]);
    

    // useEffect(() => {
    //     console.log("Audio URL:", audioUrl);
    // }, [audioUrl]);

    return (
        <div className="weather-input-container">
            {loading ? (
                <div className="preloader">
                    <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
                    <p>{t('Wait_text')}</p>
                </div>
            ) : (
                <>
                            <h2>{t('Select Date and Time')}</h2>
                <div>   
                <label>{t('Select Date')}: </label>
                <select className = "select-date" value={selectedDate} onChange={handleDateChange}>
                    <option value="">{t('Select a Date')}</option>
                    {Object.keys(weatherDict).map((date) => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </div>
            {selectedDate && (
                <div>
                    <label>{t('Select Time')}: </label>
                    <select className = "select-time"  value={selectedTime} onChange={handleTimeChange}>
                        <option value="">{t('Select a Time')}</option>
                        {Object.keys(weatherDict[selectedDate]).map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {description && (
                <div>
                    <div className="location-name">
                    <h3>{locationName}:</h3>
                    <p>{t('Date')}: {selectedDate}</p>
                    <p>{t('Time')}: {selectedTime}</p>
                    <p>{t('Weather Description')}: {description}</p>
                    </div>
                </div>
            )}
 {audioUrl && <AudioComponent audioUrl={audioUrl} selectedDate={selectedDate} selectedTime={selectedTime} description={description} language={selectedLanguage}/>}
 </>
            )}
            </div>
    );
};

export default WeatherInput;
