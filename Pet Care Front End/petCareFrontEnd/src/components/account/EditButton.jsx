import React from 'react';
import styles from './EditButton.module.css';

function EditButton() {
    return (
        <button className={styles.editButton}>
            <img src="/src/assets/edit.png" alt="Edit" />
        </button>
    );
}

export default EditButton;
