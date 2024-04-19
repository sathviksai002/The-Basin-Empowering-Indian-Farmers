import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function InformationCard(props) {
  return (
    <div className="info-cards">
        <span className="info-card-icon">
            <FontAwesomeIcon className="info-fa-icon" icon = {props.icon} />
        </span>
        <p className="info-card-title">{props.title}</p>
        <p className="info-card-description">{props.description}</p>
    </div>
  );
}

export default InformationCard