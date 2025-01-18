import React, { useRef, useState } from 'react';
import styles from '../Form.module.css'; // Adjust the path as needed
import SubmitButton from '../SubmitButton'; // Adjust the path as necessary
import AuthenticationService from '../../../services/AuthenticationService.js';
import { validateSignupForm } from '../../../validations/UserValidation.js';
import ErrorMessage from '../../messages/ErrorMessge.jsx';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [inputValues, setInputValues] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [errors, setErrors] = useState({});
    const formRef = useRef(null); // Ref for scrolling to the top of the form
    const navigate = useNavigate(); 
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, address, email, password, repeatPassword } = inputValues;

        const detectedErrors = validateSignupForm(inputValues);

        if (Object.keys(detectedErrors).length > 0) {
            setErrors(detectedErrors);

            // Scroll to the top of the form to display errors
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        setErrors({});

        AuthenticationService.register(name, email, address, password)
            .then(() => {
                navigate("/account")
            })
            .catch((e) => {
                alert(e);
            });
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <ErrorMessage errors={errors} />
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Full Name:*</label>
                <input
                    type="text"
                    id="name"
                    className={styles.inputField}
                    value={inputValues.name}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:*</label>
                <input
                    type="email"
                    id="email"
                    className={styles.inputField}
                    value={inputValues.email}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address" className={styles.label}>Address(City, Country):* </label>
                <input
                    type="text"
                    id="address"
                    className={styles.inputField}
                    value={inputValues.address}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:*</label>
                <input
                    type="password"
                    id="password"
                    className={styles.inputField}
                    value={inputValues.password}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="repeatPassword" className={styles.label}>Confirm Password:*</label>
                <input
                    type="password"
                    id="repeatPassword"
                    className={styles.inputField}
                    value={inputValues.repeatPassword}
                    onChange={handleChange}
                />
            </div>
            <SubmitButton type="submit">
                Sign up
            </SubmitButton>
        </form>
    );
}

export default SignupForm;
