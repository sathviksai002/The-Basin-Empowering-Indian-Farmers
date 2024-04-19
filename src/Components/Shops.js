import React from 'react';
import Shop1 from "../Assets/Shop1.jpg"
import "../Styles/Shops.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Shops() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
    const findShops = () => {
        navigate("/Shops");
      };
  return (
    <div className="shop-section" id ="Shops">
        <div className="shop-image-content">
            <img src={Shop1} alt="Shops" className="shop-image1" />
        </div>

    <div className="shop-text-content">
      <h3 className="shop-title">
        <span>{t('shops.title')}</span>
      </h3>
      <p className="shop-description">
      {t('shops.description')}
      </p>
      <button
            className="Shop-btn"
            type="button"
            onClick={findShops}
            
          >
            <FontAwesomeIcon icon={faFlask} /> {t('shops.btn')} 
          </button>

    </div>
    </div>
  )
}

export default Shops