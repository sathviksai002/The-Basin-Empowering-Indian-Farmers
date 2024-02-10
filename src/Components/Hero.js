import React from 'react'
import "../Styles/Hero.css"

function Hero() {
  return (
    <div className="section-container">
        <div className="hero-section">
            <div className="text-section">
                <p className="text-headline">🌱 Jai Jawan ! Jai Kisan ! 🌱</p>
                <p className="text-description">
                Welcome to 'The Basin'—where we celebrate Indian farmers and the farming world's beauty. 
                Explore trends in APMC, government schemes, and personalized weather forecasts. Access 
                insightful articles to nurture farm success. Join us in sowing seeds for a brighter future!
                </p>

            <div className="text-stats">
                <div className="text-stats-container">
                    <p>30+</p>
                    <p>Yojnas</p>
                </div>
                <div className="text-stats-container">
                    <p>500+</p>
                    <p>Wholesale Regulated Markets(APMC)</p>
                </div>
                <div className="text-stats-container">
                    <p>50+</p>
                    <p>Articles on Farming</p>
                </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Hero