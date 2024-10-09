import React from "react";
import styles from "./Form.module.css"; 
import typogrphy from "./Typography.module.css"; 
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.box}>
        <h1 className={styles.title}>Login</h1>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input type="email" id="email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input type="password" id="password" className={styles.inputField} />
          </div>
          <button type="submit" className={styles.actionButton}>Log in</button>
        </form>
        <p className={styles.signUpText}>
          You still don’t have an account? <Link to="/signup"><a href="/signup" className={styles.link}>Sign up now!</a></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
