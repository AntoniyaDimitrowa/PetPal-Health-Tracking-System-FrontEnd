import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from "../services/UserAccountService";
import styles from "../components/account/Account.module.css";
import { Link } from "react-router-dom";
import ProfileCard from '../components/account/ProfileCard';
import PetCard from '../components/account/PetCard';
import TokenManager from '../services/TokenManager';
import typographyStyles from "./Typography.module.css";
import { AuthContext } from '../context/AuthContext';
import BreedHealthInfoCard from '../components/account/BreedHealthInfoCard';

export default function Account() {
  const { claims } = useContext(AuthContext);

  const [account, setAccount] = useState(null);
  const id = TokenManager.getClaims()?.userId;
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
      <h1 className={typographyStyles.title}>Profile Information</h1>
      <ProfileCard account={account} />
      {claims ? (
        claims.roles.includes("Owner") ? (
          <>
            {account.pets?.length > 0 ? (
              <h1 className={typographyStyles.title}>My Pets</h1>
            ) : (
              <h1 className={typographyStyles.title}>You haven't added any pets.</h1>
            )}

            <section className={styles.petList}>
              {account.pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
              <Link to="/addPet">
                <button className={styles.addPetButton}>Add Pet</button>
              </Link>
            </section>
          </>
        ) : (
          <>
            {account.breedHealthInfos?.length > 0 ? (
              <h1 className={typographyStyles.title}>The breed health information you added</h1>
            ) : (
              <h1 className={typographyStyles.title}>You haven't added any breed health information.</h1>
            )}
            <section className={styles.healthInfoList}>
              {account.breedHealthInfos.map((info) => (
                <BreedHealthInfoCard key={info.id} breedHealthInfo={info} />
              ))}
              <Link to="/addBreedHealthInfo">
                <button className={styles.addPetButton}>Add Breed Health Information</button>
              </Link>
            </section>
          </>
        )) :
        (<></>)}

    </div>
  );
}
