import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import ArticleCard from './ArticleCard'
import "../Styles/ArticleLanding.css"
import Navbar from "./Navbar"


function ArticlesLandingPage() {
   const [loading, setLoading] = useState(true); // added for the page loader
   const {t, i18n} = useTranslation();
   useEffect(() => {
      // Simulate a 4-second loading time on landing
      const timeout = setTimeout(() => {
          setLoading(false);
      }, 10000);

      return () => clearTimeout(timeout);
  }, []);

//   console.log("Current language : ", i18n.language);


  return (
       <div className="navbar"><Navbar showReadContentButton={false}/>
{loading ? (
            <div className="preloader">
            <img src="https://media.tenor.com/fjMzFw1vlakAAAAj/farming-farm.gif" alt="Loader" />
            <p>{t('Wait_text')}</p>
        </div>
        ) : (
      
    <div className='article-container'>
       <div className="card-row">
        <ArticleCard />
        </div>   
        </div>  
        )}
        </div>
        )
}

export default ArticlesLandingPage