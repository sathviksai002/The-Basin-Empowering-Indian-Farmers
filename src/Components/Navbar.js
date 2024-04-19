import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    // faBars,
    faContactCard,
    faMicrophone,
    faXmark,
    faStop,
  } from "@fortawesome/free-solid-svg-icons";
  import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import "../Styles/Navbar.css";
import 'react-toastify/dist/ReactToastify.css';
import LanguageWeather from './LanguageWeather';
import ContactUs from './ContactUs';
import { useTranslation } from 'react-i18next';
import enSummary from './summary/en.json';
// import TextToSpeech from './TextToSpeech';

const Navbar = ({ showReadContentButton = true, showTranslationButton = true, showChannelButton = false}) => {
  const { t } = useTranslation();
    const [nav, setNav] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [isSticky, setIsSticky] = useState(false);
    const [summary, setSummary] = useState(enSummary.enSummary);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

   
    useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 0) {
              setIsSticky(true);
          } else {
              setIsSticky(false);
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);



    const openNav = () =>{
        setNav(!nav);
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
  };

    const handleLanguageChange = (language) => {
      setSelectedLanguage(language);
    };

    const handleChannel =() => {
      window.open("https://whatsapp.com/channel/0029VaW11jl4SpkLr5ewxN1T", "_blank", "noopener,noreferrer");
    }

  return (
    <div className={`navbar-section ${isSticky ? "sticky" : ""}`}>
        <h1 className="navbar-title">
        <Link to="/">
        {t('navbar.the')} <span className="hash">-</span> {t('navbar.basin')}
          </Link>
        </h1>


        {/* Desktop */}
        <ul className="navbar-items">
          <li>
            <a href="/"className="navbar-links">
            {t('navbar.home')}
            </a>
            </li>
            <li>
            <a href="/Yojnas"className="navbar-links">
            {t('navbar.yojnas')}
            </a>
            </li>
            <li>
            <a href="/APMC" className="navbar-links">
            {t('navbar.apmc')}
            </a>
            </li>
            <li>
            <a href="/Articles" className="navbar-links">
            {t('navbar.articles')}
            </a>
            </li>
            <li>
            <a href="/Shops" className="navbar-links">
            {t('navbar.soiltest')}
            </a>
            </li>
            <li>
            <a href="/Fertilizers" className="navbar-links">
            {t('navbar.fertilizers')}
            </a>
            </li>
        </ul>
        {showTranslationButton && (
        <LanguageWeather
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
        )}
        <div className="buttons">

        <button 
        className="navbar-btn"
        type = "button"
        onClick = {() => setButtonPopup(true)}
        >
            <FontAwesomeIcon icon={faContactCard} /> {t('navbar.contactUs')}
            </button>
            {showChannelButton && (
        <button 
        className="navbar-btn"
        type = "button"
        onClick={handleChannel}
        >
            <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" style={{ fontSize: "1.5em" }}/> {t('navbar.joinChannel')}
            </button>
            )}
            {showReadContentButton && (
        <button 
        className="navbar-btn"
        type = "button"
        onClick={handleReadSummary}
        disabled={isSpeaking}
        >
            <FontAwesomeIcon icon={faMicrophone} /> {t('navbar.LiveChat')}
            </button>
            )}
            {isSpeaking && (
                <button
                    className="navbar-btn"
                    type="button"
                    onClick={handleStopReading}
                >
                    <FontAwesomeIcon icon={faStop} /> Stop Reading
                </button>
            )}

            <ContactUs trigger = {buttonPopup} setTrigger ={setButtonPopup}>
            </ContactUs>


       

        </div>

        {/* Mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
        <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
        <li>
            <a onClick={openNav} href="#Yojnas">
              Yojnas
            </a>
            </li>

            <li>
            <a onClick={openNav} href="#apmc">
              APMC
            </a>
            </li>
            
            <li>
            <a onClick={openNav} href="#articles">
              Articles
            </a>
            </li>
            <li>
            <a onClick={openNav} href="#shops">
              Soil Testing
            </a>
            </li>
            </ul>
        </div>
        {/* Hamburger Icon */}
        {/* <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div> */}
    </div>
  );
}

export default Navbar