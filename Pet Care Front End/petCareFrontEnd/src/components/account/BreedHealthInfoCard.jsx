import React from 'react';
import PropTypes from 'prop-types';
import styles from './BreedHealthInfoCard.module.css';

const BreedHealthInfoCard = ({ breedHealthInfo }) => {
    console.log(breedHealthInfo);
    
  const { ageRangeStart, ageRangeEnd, normalFoodIntake, normalWaterIntake, breed, weightRangeMin, weightRangeMax } = breedHealthInfo;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{breed.name}</h3>
      <p className={styles.ageRange}>Age Range: {ageRangeStart} to {ageRangeEnd} years</p>
      <p className={styles.ageRange}>Weight Range: {weightRangeMin} to {weightRangeMax} kg</p>
      <p className={styles.foodIntake}>Normal Food Intake: {normalFoodIntake}g/day</p>
      <p className={styles.waterIntake}>Normal Water Intake: {normalWaterIntake}g/day</p>
    </div>
  );
};

BreedHealthInfoCard.propTypes = {
  breedHealthInfo: PropTypes.shape({
    ageRangeStart: PropTypes.number.isRequired,
    ageRangeEnd: PropTypes.number.isRequired,
    normalFoodIntake: PropTypes.number.isRequired,
    normalWaterIntake: PropTypes.number.isRequired,
  }).isRequired,
};

export default BreedHealthInfoCard;