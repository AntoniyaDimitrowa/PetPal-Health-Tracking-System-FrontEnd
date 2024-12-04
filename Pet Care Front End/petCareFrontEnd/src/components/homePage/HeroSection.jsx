import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import { AuthContext } from "../../context/AuthContext";

const HeroSection = () => {
  const { claims } = useContext(AuthContext);

  return (
    <section className={styles.heroSection}>
      
        {!claims ? (
          <div className={styles.heroText}>
          <h1 className={styles.knewaveRegular}>
            Healthy <span className={styles.whiteText}>Pets,</span> Happy <span className={styles.whiteText}>Pets!</span>
          </h1>
          <div className={styles.buttonsCenter}>
            <Link to="/signup">
              <button className={styles.btnPrimary}>Sign Up Now</button>
            </Link>
            <Link to="/login">
              <button className={styles.btnSecondary}>Log In</button>
            </Link>
          </div>
          </div>
        ) : (<div className={styles.heroText}>
          <h1 className={`${styles.knewaveRegular} ${styles.heroHeading}`}>
            Healthy <span className={styles.whiteText}>Pets,</span> Happy <span className={styles.whiteText}>Pets!</span>
          </h1>
          </div>
        )}
    </section>
  );
};

export default HeroSection;
