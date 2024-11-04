import React from 'react';
import styles from './ImageUpload.module.css';

function ImageUpload({ petData, handleImageChange }) {
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file); 
        }
    };

    return (
        <div className={styles.imageUploadGroup}>
            <label htmlFor="imageUpload">
                {petData.image ? (
                    <img src={petData.image} alt="Profile" className={styles.petImage} />
                ) : (
                    <div className={styles.uploadPlaceholder}>
                        <img src="/src/assets/upload-icon.png" alt="Upload Icon" />
                    </div>
                )}
            </label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.fileInput}
            />
        </div>
    );
}

export default ImageUpload;
