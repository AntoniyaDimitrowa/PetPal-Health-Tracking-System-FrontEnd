import React, { useContext } from 'react';
import styles from './ProfileInfo.module.css';
import { AuthContext } from '../../context/AuthContext';

function ProfileInfo({ account }) {
    const { claims } = useContext(AuthContext);

    return (
        <div className={styles.profileDetails}>
            <div className={styles.profileAvatar}>
                <img src={account.image ? `data:image/jpeg;base64,${account.image}` : "/assets/no-picture.png"} alt="User Avatar" />
            </div>
            <div className={styles.profileInfo}>
                <p><strong>Full name:</strong> {account.name}</p>
                <p><strong>Address:</strong> {account.address}</p>
                <p><strong>Email:</strong> {account.email}</p>
                <p><strong>Member since:</strong> {new Date(account.memberSince).toLocaleDateString()}</p>
            </div>
            {claims ? (
        claims.roles.includes("Owner") ? (
            <div className={styles.profilePets}>
                <h2>Number of pets:</h2>
                <span className={styles.petCount}>{account.pets.length}</span>
            </div>
        ) :(
            <div className={styles.profilePets}>
                <h2>Number of breed informations:</h2>
                <span className={styles.petCount}>1</span>
            </div>
        )) : (<></>)}
            
        </div>
    );
}

export default ProfileInfo;
