import React, {useState} from 'react'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCommentDots,
    faLock,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";

import "../Styles/Navbar.css";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [nav, setNav] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const openNav = () =>{
        setNav(!nav);
    };
    
    const handleChatBtnClick = () =>{
        if(!isButtonDisabled){
            toast.info("We are working on it, Please come back next time !",{
                onOpen : () => setIsButtonDisabled(true),
                onClose : () => setIsButtonDisabled(false),
            });
        }
    };
  return (
    <div className="navbar-section">
        <h1 className="navbar-title">
        <Link to="/">
          The <span className="hash">-</span> Basin
          </Link>
        </h1>


        {/* Desktop */}
        <ul className="navbar-items">
            <li>
            <a href="#services"className="navbar-links">
                Schemes
            </a>
            </li>
            <li>
            <a href="#services" className="navbar-links">
                APMC
            </a>
            </li>
            <li>
            <a href="#services" className="navbar-links">
                Articles
            </a>
            </li>
            <li>
            <a href="#services" className="navbar-links">
                Shops
            </a>
            </li>
            <li>
            <a href="#services" className="navbar-links">
                Contact Us
            </a>
            </li>
        </ul>
        <div className="buttons">
        <button 
        className="navbar-btn"
        type = "button"
        disabled = {isButtonDisabled}
        onClick = {handleChatBtnClick}
        >
            <ToastContainer 
            draggable = {false}
            transition={Zoom}
            autoClose = {3000}/>
            <FontAwesomeIcon icon={faCommentDots} /> Live Chat
            </button>

        <button 
        className="login-btn"
        type = "button"
        >
            <FontAwesomeIcon icon={faLock} /> Login
            </button>
        </div>

        {/* Mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
        <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
        <li>
            <a onClick={openNav} href="#schemes">
              Schemes
            </a>
            </li>

            <li>
            <a onClick={openNav} href="#apmc">
              APMC
            </a>
            </li>
            
            <li>
            <a onClick={openNav} href="#articles">
              Articles
            </a>
            </li>
            <li>
            <a onClick={openNav} href="#shops">
              Shops
            </a>
            </li>
            <li>
            <a onClick={openNav} href="#contact-us">
              Contact Us
            </a>
            </li>
            </ul>
        </div>
        {/* Hamburger Icon */}
        {/* <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div> */}
    </div>
  );
}

export default Navbar