import React from 'react';
import styles from './Account.module.css';
import ProfileInfo from './ProfileInfo';
import EditButton from './EditButton';

function ProfileCard({ account }) {
    return (
        <section className={styles.infoCard}>
            <ProfileInfo account={account} />
            <EditButton />
        </section>
    );
}

export default ProfileCard;
