import React from "react";
import styles from "./Home.module.css"; 
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.knewaveRegular}>
            Healthy <span className={styles.whiteText}>Pets,</span> Happy <span className={styles.whiteText}>Pets!</span>
          </h1>
          <div className={styles.buttonsCenter}>
            <button className={styles.btnPrimary}>Sign Up Now</button>
            <Link to="/login"><button className={styles.btnSecondary}>Log In</button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.knewaveRegular}>Features</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src="/src/assets/pet-health-history-icon.png" alt="Pet Health History Icon" />
            <h3>Pet Health History</h3>
            <p>Owners can add daily health data for each pet and view the health history over time.</p>
          </div>
          <div className={styles.feature}>
            <img src="/src/assets/notification-icon.png" alt="Notifications Icon" />
            <h3>Notifications and Statistics</h3>
            <p>Receive notifications when it's time to consult a veterinarian and check monthly statistics about your pets' health.</p>
          </div>
          <div className={styles.feature}>
            <img src="/src/assets/socialization-icon.png" alt="Socialization Icon" />
            <h3>Socialization Platform</h3>
            <p>Connect with other pet owners through live chat and arrange playdates to help your pets socialize.</p>
          </div>
          <div className={styles.feature}>
            <img src="/src/assets/veterinary-help-icon.png" alt="Veterinary Help Icon" />
            <h3>Veterinary Help</h3>
            <p>Easily contact a veterinarian for expert opinions on your pets' health.</p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className={styles.tutorialSection}>
        <div className={styles.tutorialText}>
          <h2 className={styles.knewaveRegular}>First time using our website?</h2>
          <p>
            Explore our platform to track your pet's health, receive timely notifications, 
            and connect with other pet owners. 
            For assistance, check out our video guide below to help you get started.
          </p>
        </div>
        <div className={styles.video}>
          <img src="/src/assets/video-placeholder.jpg" alt="video" />
        </div>
      </section>
    </div>
  );
};

export default Home
