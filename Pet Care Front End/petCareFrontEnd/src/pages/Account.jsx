import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from "../services/UserAccountService";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";

export default function Account() {
  const [account, setAccount] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams();

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
      {/* User Profile Section */}

      <section className={styles.infoCard}>
        <div className={styles.profileDetails}>
          <div className={styles.profileAvatar}>
            <img src="/src/assets/user-avatar.png" alt="User Avatar" />
          </div>
          <div className={styles.profileInfo}>
            <p><strong>Full name:</strong> {account.name}</p>
            <p><strong>Address:</strong> {account.address}</p>
            <p><strong>Email:</strong> {account.email}</p>
            <p><strong>Member since:</strong> {new Date(account.memberSince).toLocaleDateString()}</p>
          </div>
          <div className={styles.profilePets}>
            <h2>Number of pets:</h2>
            <span className={styles.petCount}>{account.pets.length}</span>
          </div>
        </div>
        <div className={styles.editButtonContainer}>
        <button className={styles.editButton}><img src="/src/assets/edit.png" alt="Edit User Account" /></button>
        </div>
      </section>

      {/* Pet List Section */}
      <section className={styles.petList}>
        {account.pets.map((pet) => (
          <div key={pet.id} className={styles.infoCard}>
            <img src={pet.image || "/src/assets/default-pet.jpg"} alt={pet.name} className={styles.petImage} />
            <div className={styles.petDetails}>
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Breed:</strong> {pet.breed.name}</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Birthday:</strong> {new Date(pet.birthdate).toLocaleDateString()}</p>
              <p><strong>Weight:</strong> {pet.weight} kg</p>
              <p><strong>Vaccinations:</strong> {pet.vaccinationRecords.length > 0 ? 'Up to date' : 'No records'}</p>
            </div>
            <button className={styles.dailyUpdateButton}>Daily update</button>
          </div>
        ))}
        <Link to="/addPet"><button className={styles.addPetButton}>Add Pet</button></Link>
      </section>
    </div>
  );
}
