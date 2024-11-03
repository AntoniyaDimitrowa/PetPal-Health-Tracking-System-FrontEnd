import React from 'react';
import styles from './Account.module.css';
import PetInfo from './PetInfo';
import EditButton from './EditButton';

function PetCard({ pet }) {
    return (
        <div className={styles.infoCard}>
            <PetInfo pet={pet} />
            <div className={styles.buttonsContainer}>
                <EditButton />
                <button className={styles.dailyUpdateButton}>Daily update</button>
            </div>

        </div>
    );
}

export default PetCard;
