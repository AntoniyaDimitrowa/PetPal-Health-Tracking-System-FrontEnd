import React from 'react';
import SubmitButton from './SubmitButton'; // Adjust path as necessary
import styles from './Form.module.css'; 

function LoginForm() {
    return (
        <form>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input type="email" id="email" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input type="password" id="password" className={styles.inputField} />
            </div>
            <SubmitButton type="submit">
                Log in
            </SubmitButton>
        </form>
    );
}

export default LoginForm;
