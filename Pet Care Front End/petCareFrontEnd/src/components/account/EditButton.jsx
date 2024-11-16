import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import styles from './EditButton.module.css';

function EditButton({ pet }) {
    const navigate = useNavigate();
    const { setPet } = usePet();

    const handleEdit = () => {
        setPet(pet); // Store the selected pet
        navigate('/updatePet'); // Navigate to the UpdatePetForm page
    };

    return (
        <div className={styles.editButtonContainer}>
            <button className={styles.editButton} onClick={handleEdit}>
                <img src="/src/assets/edit.png" alt="Edit Pet" />
            </button>
        </div>
    );
}

export default EditButton;
