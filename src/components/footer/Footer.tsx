import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Footer.scss";
import {useThemeStore } from "../../App";


const Footer: React.FC = () => {
  const { mode } = useThemeStore();
  
  return (
    <footer className={`footer ${mode === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="footer-links-container">
        <Link to="/about" className="footer-link">About Us</Link>
        <Link to="/contact" className="footer-link">Contact Us</Link>
      </div>
      <p>© {new Date().getFullYear()} TestScoreHero. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;