import React from 'react'
import "../Styles/APMC.css";
import { useTranslation } from 'react-i18next';
import APMC1 from "../Assets/APMC.jpg"
import SolutionStep from "./SolutionStep";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function APMC() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const FindAPMC = () => {
        navigate("/APMC");
      };
  return (
    <div className="about-section" id = "APMC">
      <div className="about-left">
        <div className="about-image-content">
            <img src={APMC1} alt="Farmer" className="about-image1" />
        </div>
        <button
            className="APMC-btn"
            type="button"
            onClick={FindAPMC}
            
          >
            <FontAwesomeIcon icon={faMoneyBillTransfer} /> {t('apmc.findApmc')}    
          </button>
          </div>
          <div className="about-right">
    <div className="about-text-content">
        <h3 className="about-title">
            <span>APMC</span>
        </h3>
    <p className="about-description">
    {t('apmc.description')}
    </p>
    

    <h4 className="about-text-title">{t('apmc.whyImportant')}</h4>
    <SolutionStep 
    title = {t('apmc.steps.0.title')}
    description = {t('apmc.steps.0.description')}
    />
    <SolutionStep 
    title = {t('apmc.steps.1.title')}
    description = {t('apmc.steps.1.description')}
    />
    </div>
    </div>
    </div>
  )
}

export default APMC