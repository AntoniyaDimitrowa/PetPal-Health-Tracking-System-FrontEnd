import React from "react";
import styles from "./FeatureItem.module.css";

const FeatureItem = ({ imgSrc, title, description }) => {
  return (
    <div className={styles.feature}>
      <img src={imgSrc} alt={`${title} Icon`} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
