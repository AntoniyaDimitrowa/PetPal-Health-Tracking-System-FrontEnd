import React from 'react';
import styles from './EditButton.module.css';

function EditButton({ onClick }) {
    return (
        <div className={styles.editButtonContainer}>
            <button className={styles.editButton} onClick={onClick}>
                <img src="/src/assets/edit.png" alt="Edit User Account" />
            </button>
        </div>
    );
}

export default EditButton;
