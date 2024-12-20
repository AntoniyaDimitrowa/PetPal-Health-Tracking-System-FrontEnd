import React from "react";
import FeatureItem from "./FeatureItem";
import styles from "./FeaturesSection.module.css";

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.knewaveRegular}>Features</h2>
      <div className={styles.features}>
        <FeatureItem
          imgSrc="/assets/pet-health-history-icon.png"
          title="Pet Health History"
          description="Owners can add daily health data for each pet and view the health history over time."
        />
        <FeatureItem
          imgSrc="/assets/notification-icon.png"
          title="Notifications and Statistics"
          description="Receive notifications when it's time to consult a veterinarian and check monthly statistics about your pets' health."
        />
        <FeatureItem
          imgSrc="/assets/socialization-icon.png"
          title="Socialization Platform"
          description="Connect with other pet owners through live chat and arrange playdates to help your pets socialize."
        />
        <FeatureItem
          imgSrc="/assets/veterinary-help-icon.png"
          title="Veterinary Help"
          description="Easily contact a veterinarian for expert opinions on your pets' health."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
