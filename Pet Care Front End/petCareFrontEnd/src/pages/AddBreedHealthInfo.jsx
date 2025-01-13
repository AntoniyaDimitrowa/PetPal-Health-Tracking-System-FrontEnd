import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GridLayout.module.css';
import typography from './Typography.module.css';
import TokenManager from '../services/TokenManager';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../context/AuthContext'; // Assuming you have this context for user claims

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const { claims } = useContext(AuthContext); // Getting claims from the AuthContext

  useEffect(() => {
    const checkUserAccess = () => {
      const token = TokenManager.getAccessToken();

      // 1. If no token, redirect to login
      if (!token) {
        navigate('/login');
        return;
      }

      // 2. Decode the token and check for expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        TokenManager.clear();
        navigate('/login'); // Redirect if token is expired
        return;
      }

      // 3. If user is logged in but not a Veterinarian, redirect to /accessDenied
      if (claims && !claims.roles.includes("Veterinarian")) {
        navigate('/accessDenied');
        return;
      }
    };

    checkUserAccess();
  }, [navigate, claims]); // Dependency on navigate and claims

  return (
    <div className={styles.pagePlusMessages} style={{ height: `100vh` }}>
      <div className={styles.pageContainer}>
        <h1 className={typography.title}>Access Denied!</h1>
        <p className={typography.p}>
          You are not authorized to access this page!
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
