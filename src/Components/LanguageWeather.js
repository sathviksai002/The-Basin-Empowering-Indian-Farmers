import React from 'react';
import { useTranslation } from 'react-i18next';
import "../Styles/LanguageWeather.css"

const LanguageWeather = ({ selectedLanguage, onLanguageChange }) => {
    const { i18n } = useTranslation();
    
    const handleLanguageChange = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
        onLanguageChange(language);
    };

    return (
        <div className="container">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en" lang="en">English</option>
            <option value="hi" lang="hi">हिन्दी</option>
            <option value="te" lang="te">తెలుగు</option>
            <option value="kn" lang="kn">ಕನ್ನಡ</option>
            <option value="ta" lang="ta">தமிழ்</option>
        </select>
        </div>
    );
};

export default LanguageWeather;
