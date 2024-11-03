import React from 'react';
import styles from './Form.module.css'; // Adjust the path as needed
import SubmitButton from './SubmitButton'; // Adjust the path as necessary

function SignupForm() {
    return (
        <form>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input type="text" id="name" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input type="email" id="email" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address" className={styles.label}>Address:</label>
                <input type="text" id="address" className={styles.inputField} />
            </div>
            {/* <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
                <input type="text" id="phoneNumber" className={styles.inputField} />
            </div> */}
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input type="password" id="password" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
                <input type="password" id="confirmPassword" className={styles.inputField} />
            </div>
            <SubmitButton type="submit">
                Sign up
            </SubmitButton>
        </form>
    );
}

export default SignupForm;
