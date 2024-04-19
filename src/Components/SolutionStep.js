import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

function SolutionStep(props) {
  return (
    <div className="about-text-step">
        <p className="about-text-sTitle">
            <span>
                <FontAwesomeIcon className="fa-icon" icon = {faQuestionCircle} /> {" "}
                {props.title}
            </span>
        </p>
        <p className="about-text-description">{props.description}</p>
    </div>
  )
}

export default SolutionStep