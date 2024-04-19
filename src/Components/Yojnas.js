import React from 'react'
import "../Styles/Yojnas.css";
import InformationCard from './InformationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faCashRegister, faRocket, faTree } from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from "react-router-dom";

function Yojnas() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const FindYojnas = () => {
        navigate("/Yojnas");
      };

  return (
    <div className="info_section" id = "Yojnas">
        <div className="info-title-content">
        <h3 className="info-title">
          <span>{t('yojnas.title')}</span>
          </h3>
        <p className="info-description">
        {t('yojnas.description')}
        </p>
        <button
            className="yojna-btn"
            type="button"
            onClick={FindYojnas}
            
          >
            <FontAwesomeIcon icon={faCashRegister} /> {t('yojnas.findYojnas')}
          </button>
        </div>
    
    <div className="info-cards-content">
        <InformationCard
            title = {t('yojnas.cards.0.title')}
            description = {t('yojnas.cards.0.description')}
            icon = {faRocket}
            />
        
        <InformationCard
            title = {t('yojnas.cards.1.title')}
            description = {t('yojnas.cards.1.description')}
            icon = {faTree}
            />
    </div>
    </div>
  );
}

export default Yojnas