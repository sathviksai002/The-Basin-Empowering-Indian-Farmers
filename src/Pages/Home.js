import React, {useState} from 'react'
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Yojnas from '../Components/Yojnas';
import APMC from '../Components/APMC';
import Articles from "../Components/Articles";
import Shops from '../Components/Shops';
import Footer from "../Components/Footer"
import ContactUs from '../Components/ContactUs';
import Fertilizers from "../Components/Fertilizers"

function Home() {
  const [showContactUs, setShowContactUs] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const toggleContactUs = () => {
    setShowContactUs(!showContactUs);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="home-section">
        <Navbar onContactClick = {toggleContactUs}
         selectedLanguage={selectedLanguage}
         onLanguageChange={handleLanguageChange}/>
        <Hero />
        <Yojnas />
        <APMC />
        <Articles />
        <Shops />
        <Fertilizers /> 
        <Footer />
        {showContactUs && <ContactUs onClose={toggleContactUs} />}
    </div>
  )
}

export default Home