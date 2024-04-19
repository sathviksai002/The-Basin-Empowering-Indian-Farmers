import React from 'react';
import "../Styles/AudioContainer.css"
import { useTranslation } from 'react-i18next';


const AudioComponent = ({ audioUrl }) => {
    const { t } = useTranslation();
    return (
        <div className='audio-container'>
            <div className="audio-text">{t('AUDIO')}</div>
            {audioUrl && (
                <audio key={audioUrl} controls>
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};



export default AudioComponent;
