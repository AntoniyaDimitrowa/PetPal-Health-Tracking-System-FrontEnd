import React from 'react';
import styles from './Account.module.css';
import ProfileInfo from './ProfileInfo';

function ProfileCard({ account }) {
    return (
        <section className={styles.infoCard}>
            <ProfileInfo account={account} />
            <div className={styles.editButtonContainer}>
                <button className={styles.editButton}>
                    <img src="/src/assets/edit.png" alt="Edit User Account" />
                </button>
            </div>
        </section>
    );
}

export default ProfileCard;
