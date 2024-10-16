import React from 'react';
import styles from './ImageUpload.module.css';

function ImageUpload({ petData, handleImageChange }) {
    return (
        <div className={styles.imageUploadGroup}>
            <label htmlFor="imageUpload">
                {petData.image ? (
                    <img src={petData.image} alt="Pet" className={styles.petImage} />
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
                onChange={handleImageChange}
                className={styles.fileInput}
            />
        </div>
    );
}

export default ImageUpload;
