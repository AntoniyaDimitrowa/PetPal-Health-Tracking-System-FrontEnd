import React, { createContext, useContext, useState, useEffect } from 'react';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pet, setPet] = useState(() => {
    // Load the pet from localStorage if available
    const storedPet = localStorage.getItem('pet');
    return storedPet ? JSON.parse(storedPet) : null;
  });

  // Save the pet to localStorage whenever it changes
  useEffect(() => {    
    if (pet) {
      localStorage.setItem('pet', JSON.stringify(pet));
    } else {
      localStorage.removeItem('pet');
    }
  }, [pet]);

  return (
    <PetContext.Provider value={{ pet, setPet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
