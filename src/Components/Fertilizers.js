import React from 'react'
import "../Styles/Fertilizer.css";
import ArticleFarmer from "../Assets/ArticleFarmer.jpg"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Fertilizer from "../Assets/fertilizer_web.jpg"


function Fertilizers() {
 
  const { t } = useTranslation();
  const navigate  = useNavigate();

 
    const FindArticles = () => {
        navigate("/Fertilizers");
      };
  return (
     
    <div className="fertilizer-section" id = "Fertilizers">
        <div className="fertilizer-image-content">
            <img src={Fertilizer} alt="Farmer-Book" className="fertilizer-image1" />
        </div>
    
    <div className="fertilizers-text-content">
        <h3 className="fertilizers-title">
            <span>{t('Fertilizers.title')}</span>
        </h3>
        <p className="fertilizers-description">
        {t('Fertilizers.description')}
        </p>
        <button
            className="Fertilizers-btn"
            type="button"
            onClick={FindArticles}
            
          >
            <FontAwesomeIcon icon={faBook} /> {t('Fertilizers.btn')}
          </button>

    </div>
    </div>
  )
}

export default Fertilizers