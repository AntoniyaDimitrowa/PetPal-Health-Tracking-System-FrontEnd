import React, { useEffect, useState } from 'react'
import { getBreeds } from "../services/BreedsService";
import { useNavigate, useParams  } from 'react-router-dom';
import BreedsList from '../components/BreedsList';


export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      const breeds = await getBreeds();
      setBreeds(breeds);
    };
    fetchBreeds();
    console.log(breeds)
  }, []);

  return (
    <>
      <BreedsList breeds={breeds}></BreedsList>
    </>
  )
}
