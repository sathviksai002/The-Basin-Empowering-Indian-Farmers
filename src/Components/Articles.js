import React from 'react'
import "../Styles/Articles.css";
import ArticleFarmer from "../Assets/ArticleFarmer.jpg"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Articles() {
 
  const { t } = useTranslation();
  const navigate  = useNavigate();

 
    const FindArticles = () => {
        navigate("/Articles");
      };
  return (
     
    <div className="ba-section" id = "Articles">
        <div className="ba-image-content">
            <img src={ArticleFarmer} alt="Farmer-Book" className="ba-image1" />
        </div>
    
    <div className="ba-text-content">
        <h3 className="ba-title">
            <span>{t('articles.title')}</span>
        </h3>
        <p className="ba-description">
        {t('articles.description')}
        </p>
        <button
            className="Article-btn"
            type="button"
            onClick={FindArticles}
            
          >
            <FontAwesomeIcon icon={faBook} /> {t('articles.findArticles')}   
          </button>

    <p className="ba-checks ba-check-first">
        <FontAwesomeIcon icon = {faCircleCheck} style = {{color : "#2e5b1a"}} />
        {t('articles.checks.0')}
    </p>
    <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5b1a" }} />
          {t('articles.checks.1')}
        </p>
    <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#2e5b1a" }} />
          {t('articles.checks.2')}
    </p>
    </div>
    </div>
  )
}

export default Articles