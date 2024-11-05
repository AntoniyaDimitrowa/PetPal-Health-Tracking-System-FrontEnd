import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from "../services/UserAccountService";
import styles from "../components/account/Account.module.css";
import { Link } from "react-router-dom";
import ProfileCard from '../components/account/ProfileCard';
import PetCard from '../components/account/PetCard';

export default function Account() {
  const [account, setAccount] = useState(null); 
  const navigate = useNavigate();
  const id = 2; //When I have Login this should be changed to the loged in userId

  useEffect(() => {
    const fetchAccount = async () => {
      const accountData = await getAccount(id); 
      setAccount(accountData); 
    };
    fetchAccount();
  }, [id]);

  if (!account) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.accountContainer}>
      <ProfileCard account={account} />
      <section className={styles.petList}>
        {account.pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
        <Link to="/addPet">
          <button className={styles.addPetButton}>Add Pet</button>
        </Link>
      </section>
    </div>
  );
}
