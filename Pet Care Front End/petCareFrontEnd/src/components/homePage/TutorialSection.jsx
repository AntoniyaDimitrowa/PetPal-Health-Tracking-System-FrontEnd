import React from "react";
import styles from "./TutorialSection.module.css";

const TutorialSection = () => {
  return (
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
        <img src="/assets/video-placeholder.jpg" alt="video" />
      </div>
    </section>
  );
};

export default TutorialSection;
