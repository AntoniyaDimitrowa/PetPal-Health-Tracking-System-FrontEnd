import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { claims, signOut } = useContext(AuthContext);
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/src/assets/logo-with-text.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>Home</NavLink></li>
          {claims ? (
            <>
              <li><a href="#health-tracking">Health Tracking</a></li>
              <li><a href="#socialize">Socialize</a></li>
              <li><NavLink to="/account" className={({ isActive }) => isActive ? styles.active : undefined}>Account</NavLink></li>
            </>
          ) : (<></>)
          }

        </ul>
      </nav>

      {claims ? (
        <div className={styles.authButtons}>
          <Link to="/login"><button className={styles.btnPrimary} onClick={signOut}>Log Out</button></Link>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/login"><button className={styles.btnSecondary}>Log In</button></Link>
          <Link to="/signup"><button className={styles.btnPrimary}>Sign Up</button></Link>
        </div>
      )
      }

    </header>
  );
};

export default Header;
