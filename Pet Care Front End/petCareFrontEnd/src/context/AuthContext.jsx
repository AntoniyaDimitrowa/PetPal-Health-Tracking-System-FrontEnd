import React, { createContext, useState, useEffect } from 'react';
import TokenManager from '../services/TokenManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [claims, setClaims] = useState(null);

  const isTokenExpired = (claims) => {
    if (!claims || !claims.exp) return true;
    return Date.now() >= claims.exp * 1000;
  };

  useEffect(() => {
    const storedClaims = TokenManager.getClaims();
    if (storedClaims && !isTokenExpired(storedClaims)) {
      setClaims(storedClaims);
    } else {
      TokenManager.clear();
      setClaims(null);
    }
  }, []);

  const signIn = (accessToken) => {
    const userClaims = TokenManager.setAccessToken(accessToken);
    setClaims(userClaims);
  };

  const signOut = () => {
    TokenManager.clear();
    setClaims(null);
  }

  return (
    <AuthContext.Provider value={{ claims, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};


