import React from 'react';
import styles from './Account.module.css';
import PetInfo from './PetInfo';
import EditButton from './EditButton';
import { usePet } from '../../context/PetContext';
import { Link } from "react-router-dom";

function PetCard({ pet }) {
  const { setPet } = usePet();

  const selectPet = () => {
    setPet(pet);
  };

  return (
    <div className={styles.infoCard}>
      <PetInfo pet={pet} />
      <div className={styles.buttonsContainer}>
        <Link to="/updatePet" onClick={selectPet}>
          <EditButton />
        </Link>
        <Link to="/dailyUpdate" onClick={selectPet}>
          <button className={styles.dailyUpdateButton}>Daily update</button>
        </Link>
      </div>

    </div>
  );
}

export default PetCard;
