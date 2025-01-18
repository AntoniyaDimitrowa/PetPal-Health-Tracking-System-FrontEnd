import React from "react";
import styles from "../components/forms/Form.module.css";
import SignupForm from "../components/forms/account/SignupForm"; 
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className={styles.pageContainer} style={{ padding: `5rem 0` }}>
      <div className={styles.box}>
        <h1 className={styles.title}>Signup</h1>
        <SignupForm />
        <p className={styles.signUpText}>
          You already have an account? <Link to="/login" className={styles.link}>Log in now!</Link>
        </p>            
      </div>
    </div>
  );
}

export default Signup;
