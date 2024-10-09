import React from "react";
import styles from "./Header.module.css"; 
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/src/assets/logo-with-text.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><a href="#health-tracking">Health Tracking</a></li>
          <li><a href="#socialize">Socialize</a></li>
          <li><a href="#account">Account</a></li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <Link to="/login"><button className={styles.btnSecondary}>Log In</button></Link>
        <button className={styles.btnPrimary}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
