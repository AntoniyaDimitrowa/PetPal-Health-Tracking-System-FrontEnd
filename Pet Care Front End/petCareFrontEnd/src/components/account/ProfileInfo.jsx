import React from 'react';
import styles from './Account.module.css';

function ProfileInfo({ account }) {
    return (
        <div className={styles.profileDetails}>
            <div className={styles.profileAvatar}>
                <img src={`data:image/jpeg;base64,${account.image}` || "/src/assets/profile-image-default.png"} alt="User Avatar" />
            </div>
            <div className={styles.profileInfo}>
                <p><strong>Full name:</strong> {account.name}</p>
                <p><strong>Address:</strong> {account.address}</p>
                <p><strong>Email:</strong> {account.email}</p>
                <p><strong>Member since:</strong> {new Date(account.memberSince).toLocaleDateString()}</p>
            </div>
            <div className={styles.profilePets}>
                <h2>Number of pets:</h2>
                <span className={styles.petCount}>{account.pets.length}</span>
            </div>
        </div>
    );
}

export default ProfileInfo;
