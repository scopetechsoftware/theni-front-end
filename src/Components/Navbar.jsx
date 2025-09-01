import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png"; // replace with your logo path

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
   
    <nav className="nav-container">
      <div className="nav-logo">
        
        <img src={logo} alt="Logo" />
      </div>

      <ul className={isMobile ? "nav-links nav-active" : "nav-links"}>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/offer">Offers</a></li>
        <li><a href="/store">Stores</a></li>    
         <li><a href="/jobs">Jobs</a></li>    
        <li><a href="/contact">Contact Us</a></li>
       
        <li><a href="#" className="nav-signup">Sign Up</a></li>
      </ul>

      <div 
        className={isMobile ? "nav-toggle nav-toggle-active" : "nav-toggle"} 
        onClick={() => setIsMobile(!isMobile)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
