import React from 'react';
import styles from './ImageUpload.module.css';

function ImageUpload({ data, handleImageChange }) {
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file); 
        }
    };

    return (
        <div className={styles.imageUploadGroup}>
            <label htmlFor="imageUpload">
                {data.image ? (
                    <img src={data.image} alt="Profile" className={styles.image} />
                ) : (
                    <div className={styles.uploadPlaceholder}>
                        <img src="/src/assets/upload-photo.jpg" alt="Upload Photo" />
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
