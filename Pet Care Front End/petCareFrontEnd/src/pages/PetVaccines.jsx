import React, { useContext, useEffect } from 'react';
import VaccinationRecords from '../components/vaccineRecords/VaccineRecords';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TokenManager from '../services/TokenManager';
import { jwtDecode } from 'jwt-decode';

function PetVaccines() {
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

          // 3. If user doesn't have 'owner' role, redirect to /accessDenied
          if (claims && !claims.roles.includes("Admin")) {
              navigate('/accessDenied');
              return;
          }
      };

      checkUserAccess();
  }, [navigate, claims]);

  return <VaccinationRecords />;
}

export default PetVaccines;
