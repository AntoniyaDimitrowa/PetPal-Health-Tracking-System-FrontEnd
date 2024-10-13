import React, { useState, useEffect } from 'react';
import styles from './AddPet.module.css';
import formStyles from "./Form.module.css";
import typogrphy from "./Typography.module.css";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { getBreeds } from "../services/BreedsService";
import { addPet } from "../services/PetService";
import { getVaccinationsForPuppy } from "../services/VaccinationsService";

function AddPet() {
    const [petData, setPetData] = useState({
        name: '',
        breedId: '',
        birthdate: '',
        weight: '',
        gender: '',
        vaccinations: {},
        image: null
    });

    const [vaccinationOptions, setVaccinationOptions] = useState([]);

    useEffect(() => {
        const fetchVaccinations = async () => {
            try {
                const vaccinations = await getVaccinationsForPuppy();
                setVaccinationOptions(vaccinations);

                const defaultVaccinations = {};
                vaccinations.forEach(vaccine => {
                    defaultVaccinations[vaccine.id] = false;
                });

                setPetData(prevData => ({
                    ...prevData,
                    vaccinations: defaultVaccinations
                }));
            } catch (error) {
                console.error("Error fetching vaccinations:", error);
            }
        };

        fetchVaccinations();
    }, []);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#D2E9D7',
            border: '1px solid #D2E9D7',
            boxShadow: state.isFocused ? '0 0 0 2px #007bff' : null,
            padding: '0.5rem',
            '&:hover': {
                border: '1px solid #66BF7B',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#E4F3E6' : '#D2E9D7',
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: '#D2E9D7',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#D2E9D7',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };


    const [breedOptions, setBreedOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breeds = await getBreeds();
                const formattedBreeds = breeds.map((breed) => ({
                    value: breed.id,
                    label: breed.name,
                }));
                setBreedOptions(formattedBreeds);
            } catch (error) {
                console.error('Error fetching breeds:', error);
            }
            setIsLoadingBreeds(false);
        };


        fetchBreeds();
    }, []);

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
        console.log(petData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPetData({ ...petData, image: reader.result });
        };
    };

    const handleBreedChange = (selectedOption) => {
        const breedId = selectedOption ? selectedOption.value : '';
        setPetData({ ...petData, breedId });
        console.log(petData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addPet(petData);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code outside of the 2xx range
                console.error('Error Response:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error Request:', error.request);
            } else {
                // Something happened in setting up the request that triggered the error
                console.error('Error Message:', error.message);
            }
        }
    };

    // const handleSubmit = () => {
    //     console.log(petData);
    // };



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
                                <Select
                                    id="breed"
                                    name="breed"
                                    options={breedOptions}
                                    value={breedOptions.find((option) => option.value === petData.breedId)}
                                    onChange={handleBreedChange}
                                    isClearable
                                    isLoading={isLoadingBreeds}
                                    placeholder="Select or type a breed..."
                                    className={formStyles.selectField}
                                    styles={customStyles}
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
                        <label className={formStyles.label} htmlFor="weight">Weight(kg):</label>
                        <input
                            type="number"
                            min={0.05}
                            step={0.01}
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
                            {vaccinationOptions.map((vaccine) => (
                                <label key={vaccine.id}>
                                    <input
                                        type="checkbox"
                                        name={vaccine.id}
                                        checked={petData.vaccinations[vaccine.id] || false}
                                        onChange={handleChange}
                                    />
                                    {vaccine.name} ({vaccine.range} weeks)
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" onClick={handleSubmit} className={formStyles.actionButton}>Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddPet;
