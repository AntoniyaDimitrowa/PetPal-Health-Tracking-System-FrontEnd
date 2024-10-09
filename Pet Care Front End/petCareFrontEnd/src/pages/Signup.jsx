import React from "react";
import styles from "./Form.module.css"; 
import typogrphy from "./Typography.module.css"; 
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Signup</h1>
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
          <div className={styles.inputGroup}>
            <label htmlFor="phoneNumber" className={styles.label}>Phone Number:</label>
            <input type="text" id="phoneNumber" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input type="password" id="password" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
            <input type="password" id="confirmPassword" className={styles.inputField} />
          </div>
          <button type="submit" className={styles.actionButton}>Sign up</button>
        </form>
        <p className={styles.signUpText}>
        You already have an account? <Link to="/login"><a href="/signup" className={styles.link}>Log in now!</a></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
