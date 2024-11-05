import React, { createContext, useContext, useState } from 'react';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pet, setPet] = useState(null); 

  return (
    <PetContext.Provider value={{ pet, setPet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
