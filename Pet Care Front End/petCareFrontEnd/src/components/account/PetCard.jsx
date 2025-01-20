import React, { useEffect, useState } from 'react';
import styles from './Account.module.css';
import PetInfo from './PetInfo';
import EditButton from './EditButton';
import { usePet } from '../../context/PetContext';
import { Link } from "react-router-dom";
import { getHealthRecordsByPetId } from '../../services/HealthTrackingService';
import { format } from 'date-fns';

function PetCard({ pet }) {
  const { setPet } = usePet();
  const [hasTodayRecord, setHasTodayRecord] = useState(false);

  useEffect(() => {
    const fetchTodayRecord = async () => {
      try {
        const healthRecords = await getHealthRecordsByPetId(pet.id);
        const today = format(new Date(), 'yyyy-MM-dd'); // Format today's date as YYYY-MM-DD
        const todayRecordExists = healthRecords.some(
          record => record.date === today
        );
        setHasTodayRecord(todayRecordExists);
      } catch (error) {
        console.error("Error checking today's health record:", error);
      }
    };

    fetchTodayRecord();
  }, [pet.id]);

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
        {hasTodayRecord ? (
          <div className={styles.dailyUpdateIndicator} title="Daily update completed"></div>

        ) : (
          <Link to="/dailyUpdate" onClick={selectPet}>
            <button className={styles.dailyUpdateButton}>Daily update</button>
          </Link>
        )}
      </div>

    </div>
  );
}

export default PetCard;
