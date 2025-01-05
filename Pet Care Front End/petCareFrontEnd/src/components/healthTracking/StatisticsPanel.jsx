import React from 'react';
import styles from './StatisticsPanel.module.css';
import PetStatistics from './PetStatistics';

const StatisticsPanel = ({ pets }) => {
  console.log(pets);

  return (
    <div className={styles.wrapper}>
      {pets.map((pet) => (
        <PetStatistics pet={pet} key={pet.id}/>
      ))}
    </div>
  );
};

export default StatisticsPanel;
