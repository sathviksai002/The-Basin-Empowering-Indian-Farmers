import React, { useState } from 'react';
import WeatherInput from './WeatherInput';
import LanguageWeather from './LanguageWeather';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Navbar from "./Navbar"
import i18n from './i18n';
import "../Styles/LanguageDropdown.css"


function App() {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { t } = useTranslation();


    // Function to handle language change
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <div className="whole-container">
                    <Navbar showReadContentButton={false} showTranslationButton={false}/>
        <div className="en-container"> 
        <h2>{t('Select Language')}</h2>
        <I18nextProvider i18n={i18n}>
            <div>
            <LanguageWeather onLanguageChange={handleLanguageChange} />
                <WeatherInput selectedLanguage={selectedLanguage} />
            </div>
        </I18nextProvider>
        </div>
        </div>
    );
}

export default App;
