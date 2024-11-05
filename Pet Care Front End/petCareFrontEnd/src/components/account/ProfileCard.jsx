import React from 'react';
import styles from './Account.module.css';
import ProfileInfo from './ProfileInfo';
import EditButton from './EditButton';
import { Link } from "react-router-dom";

function ProfileCard({ account }) {
    return (
        <section className={styles.infoCard}>
            <ProfileInfo account={account} />
            <Link to="/account/edit">
                <EditButton />
            </Link>
        </section>
    );
}

export default ProfileCard;
