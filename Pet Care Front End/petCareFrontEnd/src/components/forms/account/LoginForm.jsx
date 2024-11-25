import React, { useContext, useState } from 'react';
import SubmitButton from '../SubmitButton'; // Adjust path as necessary
import styles from '../Form.module.css'; 
import AuthenticationService from '../../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import TokenManager from '../../../services/TokenManager';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const { signIn } = useContext(AuthContext);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "email") {
            setEmail(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        AuthenticationService.login(email, password)
        .then(() => {
            signIn(TokenManager.getAccessToken());
            navigate('/'); 
        })
        .catch((e) => {
            alert("Login failed. Please try again. "  + e);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    className={styles.inputField}
                    value={email} 
                    onChange={handleChange} 
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type="password"
                    id="password"
                    className={styles.inputField}
                    value={password} 
                    onChange={handleChange} 
                />
            </div>
            <SubmitButton type="submit">
                Log in
            </SubmitButton>
        </form>
    );
}

export default LoginForm;
