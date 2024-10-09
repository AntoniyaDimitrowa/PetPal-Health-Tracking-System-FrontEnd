import React, { useState } from 'react';
import styles from './AddPet.module.css';
import formStyles from "./Form.module.css";
import typogrphy from "./Typography.module.css";
import { Link } from "react-router-dom";

function AddPet() {
    const [petData, setPetData] = useState({
        name: '',
        breed: '',
        birthdate: '',
        weight: '',
        gender: '',
        vaccinations: {
            distemper: false,
            parvovirus: false,
            adenovirus: false,
            rabies: false
        },
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setPetData(prevData => ({
                ...prevData,
                vaccinations: {
                    ...prevData.vaccinations,
                    [name]: checked
                }
            }));
        } else {
            setPetData({ ...petData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPetData({ ...petData, image: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(petData);
        // Logic to submit form data
    };


    return (
        <div className={`${formStyles.pageContainer} ${styles.pageContainer}`}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Pet</h1>
                <form>
                    <div className={styles.photoPlusInputs}>
                        <div className={`${formStyles.inputGroup} ${styles.imageUploadGroup}`}>
                            <label className={formStyles.inputLabel} htmlFor="imageUpload">
                                {petData.image ? (
                                    <img src={petData.image} alt="Pet" className={styles.petImage} />
                                ) : (
                                    <div className={styles.uploadPlaceholder}>
                                        <img src="/src/assets/upload-icon.png" alt="Upload Icon" />
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="name" className={formStyles.label}>Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={petData.name}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="breed" className={formStyles.label}>Breed:</label>
                                <input
                                    type="text"
                                    id="breed"
                                    name="breed"
                                    value={petData.breed}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label className={formStyles.label} htmlFor="birthdate">Birthdate:</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={petData.birthdate}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>

                        </div>
                    </div>



                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="weight">Weight:</label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={petData.weight}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>

                    {/* Gender Dropdown */}
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label} htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={petData.gender}
                            onChange={handleChange}
                            className={formStyles.dropdown}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Vaccinations */}
                    <div className={styles.vaccinationGroup}>
                        <label className={formStyles.label}>Vaccinations:</label>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="distemper"
                                    checked={petData.vaccinations.distemper}
                                    onChange={handleChange}
                                />
                                Distemper (6-8 weeks)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="parvovirus"
                                    checked={petData.vaccinations.parvovirus}
                                    onChange={handleChange}
                                />
                                Parvovirus (6-8 weeks)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="adenovirus"
                                    checked={petData.vaccinations.adenovirus}
                                    onChange={handleChange}
                                />
                                Adenovirus (10-12 weeks)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="rabies"
                                    checked={petData.vaccinations.rabies}
                                    onChange={handleChange}
                                />
                                Rabies (12-16 weeks)
                            </label>
                        </div>
                    </div>
                    <button type="submit" className={formStyles.actionButton}>Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddPet;
