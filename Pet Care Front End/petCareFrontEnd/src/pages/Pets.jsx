import React, { useEffect, useState } from 'react'
import { getPets } from "../services/PetService";
import { useNavigate, useParams  } from 'react-router-dom';
import PetsList from '../components/PetsList';


export default function Pets() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      const pets = await getPets();
      setPets(pets);
    };
    fetchPets();
    console.log(pets)
  }, []);

  return (
    <>
      <PetsList pets={pets}></PetsList>
    </>
  )
}
