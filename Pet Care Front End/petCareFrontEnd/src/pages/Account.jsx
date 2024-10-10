import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAccount } from "../services/UserAccountService";
import { getPets } from "../services/PetService";
import styles from "./Account.module.css";


export default function Account() {
    const [account, setAccount] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
          const { cocktail } = await getAccount(id);
          setProduct(cocktail);
        };
        fetchProduct();
      }, [id]);

    return (
        <div className={styles.accountContainer}>
      {/* User Profile Section */}
      <section className={styles.userProfile}>
        <div className={styles.profileDetails}>
          <div className={styles.profileAvatar}>
            <img src="/src/assets/user-avatar.png" alt="User Avatar" />
          </div>
          <div className={styles.profileInfo}>
            <p><strong>Full name:</strong> John Doe</p>
            <p><strong>Address:</strong> 1234 Elm St, Springfield</p>
            <p><strong>Phone number:</strong> (555) 555-5555</p>
            <p><strong>Email:</strong> johndoe@email.com</p>
            <p><strong>Member since:</strong> January 2023</p>
          </div>
          <div className={styles.profilePets}>
            <h2>Number of pets: <span className={styles.petCount}>2</span></h2>
          </div>
          <button className={styles.editButton}>Edit</button>
        </div>
      </section>

      {/* Pet List Section */}
      <section className={styles.petList}>
        <div className={styles.petCard}>
          <img src="/src/assets/dog1.jpg" alt="Pet 1" className={styles.petImage} />
          <div className={styles.petDetails}>
            <p><strong>Name:</strong> Max</p>
            <p><strong>Breed:</strong> Golden Retriever</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Birthday:</strong> 01/05/2018</p>
            <p><strong>Weight:</strong> 30kg</p>
            <p><strong>Vaccinations:</strong> Up to date</p>
          </div>
          <button className={styles.dailyUpdateButton}>Daily update</button>
        </div>

        <div className={styles.petCard}>
          <img src="/src/assets/dog2.jpg" alt="Pet 2" className={styles.petImage} />
          <div className={styles.petDetails}>
            <p><strong>Name:</strong> Bella</p>
            <p><strong>Breed:</strong> Golden Retriever</p>
            <p><strong>Gender:</strong> Female</p>
            <p><strong>Birthday:</strong> 15/03/2020</p>
            <p><strong>Weight:</strong> 25kg</p>
            <p><strong>Vaccinations:</strong> Up to date</p>
          </div>
          <button className={styles.vaccinationCheckButton}>✔</button>
        </div>

        <button className={styles.addPetButton}>Add Pet</button>
      </section>
    </div>
  );
}
