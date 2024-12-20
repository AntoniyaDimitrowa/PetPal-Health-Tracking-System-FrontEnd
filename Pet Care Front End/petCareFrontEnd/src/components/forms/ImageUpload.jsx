import React, { useState } from 'react';
import styles from './ImageUpload.module.css';

function ImageUpload({ data, handleImageChange }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageChange(file);
        }
    };

    return (
        <div className={styles.imageUploadGroup}>
            <label
                htmlFor="imageUpload"
                className={styles.imageLabel}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {data.image ? (
                    <div className={styles.imageWrapper}>
                        <img src={data.image} alt="Profile" className={styles.image} />
                        {isHovered && (
                            <div className={styles.hoverText}>Click the picture to change it</div>
                        )}
                    </div>
                ) : (
                    <div className={styles.uploadPlaceholder}>
                        <img src="/assets/upload-picture.png" alt="Upload Photo" />
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
