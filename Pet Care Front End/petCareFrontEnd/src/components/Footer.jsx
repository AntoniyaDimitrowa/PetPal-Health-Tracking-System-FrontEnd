import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
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
