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
        <video
          className={styles.tutorialVideo}
          controls
          src="/assets/TutorialPetPal - Made with Clipchamp.mp4"
          poster="/assets/video-poster.png"
          onError={(e) => {
            e.target.style.display = "none"; // Hide the video
            const fallbackImage = document.createElement("img");
            fallbackImage.src = "/assets/video-placeholder.jpg";
            fallbackImage.alt = "Video not available";
            e.target.parentElement.appendChild(fallbackImage); // Add fallback image
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default TutorialSection;
