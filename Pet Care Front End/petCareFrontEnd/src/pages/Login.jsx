import React from "react";
import styles from "../components/forms/Form.module.css"; 
import LoginForm from "../components/forms/LoginForm"; 
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.box}>
        <h1 className={styles.title}>Login</h1>
        <LoginForm />
        <p className={styles.signUpText}>
            You still don’t have an account? <Link to="/signup" className={styles.link}>Sign up now!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
