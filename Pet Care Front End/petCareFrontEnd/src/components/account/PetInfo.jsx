import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PetInfo.module.css';
import formStyles from '../forms/Form.module.css';
import { usePet } from '../../context/PetContext'; 

function PetInfo({ pet }) {
  const { setPet } = usePet(); 

  const handleViewVaccines = () => {
    setPet(pet);
  };

  return (
    <div className={styles.petInfo}>
      <img src={`data:image/jpeg;base64,${pet.image}` || "/src/assets/default-pet.jpg"} alt={pet.name} className={styles.petImage} />
      <div className={styles.petDetails}>
        <p><strong>Name:</strong> {pet.name}</p>
        <p><strong>Breed:</strong> {pet.breed.name}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        <p><strong>Birthday:</strong> {new Date(pet.birthdate).toLocaleDateString()}</p>
        <p><strong>Weight:</strong> {pet.weight} kg</p>
        <p>
          <strong>Vaccinations: </strong>
          {pet.vaccinationRecords.length + " "} 
          <Link 
            className={formStyles.link} 
            to="/pet/vaccines" 
            onClick={handleViewVaccines}
          >
            See more
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PetInfo;
