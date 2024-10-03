import React from "react";
import "./Footer.css"; // Create a separate CSS file for footer styling

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 PetPal. All Rights Reserved.</p>
      <nav>
        <ul>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
          <li><a href="#terms-of-service">Terms of Service</a></li>
          <li><a href="#contact-us">Contact Us</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
