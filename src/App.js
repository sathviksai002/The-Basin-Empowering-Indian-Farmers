import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Suspense } from "react";
import "./App.css"
import Home from "./Pages/Home";
import YojnaLanding from "./Components/YojnaLanding"
import APMCLandingPage from "./Components/APMCLandingPage";
import ArticlesLandingPage from "./Components/ArticlesLandingPage";
import ShopsLandingPage from "./Components/ShopsLandingPage";
import WeatherApp from "./Components/WeatherApp"
import TermsAndConditions from "./Components/TermsAndConditions";
import Students from "./Components/Students";
import FertilizerLanding from "./Components/FertilizerLanding";

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/WeatherInput" element = {<WeatherApp />} />
        <Route path = "/Yojnas" element = {<YojnaLanding/>} />
        <Route path = "/APMC" element = {<APMCLandingPage/>} />
        <Route path = "/Articles" element = {<ArticlesLandingPage/>} />
        <Route path = "/Shops" element = {<ShopsLandingPage/>} />
        <Route path = "/legal" element = {<TermsAndConditions/>} />
        <Route path = "/Fertilizers" element = {<FertilizerLanding/>} />
        <Route path = "/aboutus" element = {<Students/>} />

        {/* <Route path = "/Contact-Us" element = {<ContactUs/>} /> */}
      </Routes>
    </Router>
  </div>
  );
}

export default App;
