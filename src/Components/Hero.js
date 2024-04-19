import React, {useState, useEffect} from 'react'
import { faAngleUp, faTemperature0 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/Hero.css"
import { useNavigate  } from "react-router-dom";
import Farmer from "../Assets/Farmer.png"
import { useTranslation } from 'react-i18next';


function Hero() {
    const navigate = useNavigate();
    const [goUp, setGoUp] = useState(false);
    const { t } = useTranslation();

    const FindWeather = () => {
        navigate("/WeatherInput");
      };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      useEffect(() => {
        const onPageScroll = () => {
          if (window.scrollY > 600) {
            setGoUp(true);
          } else {
            setGoUp(false);
          }
        };
        window.addEventListener("scroll", onPageScroll);
        return () => {
            window.removeEventListener("scroll", onPageScroll);
          };
        }, []);
  return (
    <div className="section-container">
        <div className="hero-section">
            <div className="text-section">
                <p className="text-headline">🌱 {t('hero.headline')} 🌱</p>
                <p className="text-description">
                {t('hero.description')}
                </p>
                <button
            className="text-appointment-btn"
            type="button"
            onClick={FindWeather}
            
          >
            <FontAwesomeIcon icon={faTemperature0} /> {t('hero.weatherButton')}
          </button>

            <div className="text-stats">
                <div className="text-stats-container">
                    <p>30+</p>
                    <p>{t('hero.yojnas')}</p>
                </div>
                <div className="text-stats-container">
                    <p>500+</p>
                    <p>{t('hero.apmc')}</p>
                </div>
                <div className="text-stats-container">
                    <p>50+</p>
                    <p>{t('hero.articles')}</p>
                </div>
            </div>
            </div>
            <div className="hero-image-section">
            <img src={Farmer} alt="Farmer" className="hero-image1" />
        </div>
        </div>
        <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero