import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroText}>
        <h1 className={styles.knewaveRegular}>
          Healthy <span className={styles.whiteText}>Pets,</span> Happy <span className={styles.whiteText}>Pets!</span>
        </h1>
        <div className={styles.buttonsCenter}>
          <button className={styles.btnPrimary}>Sign Up Now</button>
          <Link to="/login">
            <button className={styles.btnSecondary}>Log In</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
