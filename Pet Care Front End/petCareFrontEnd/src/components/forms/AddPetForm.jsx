import React, { useState, useEffect } from 'react';
import formStyles from './Form.module.css';
import ImageUpload from './ImageUpload';
import VaccinationsChecklist from './VaccinationsChecklist';
import SubmitButton from './SubmitButton';
import Select from 'react-select';
import customStyles from './CustomStyles';
import { addPet } from '../../services/PetService';
import { getBreeds } from "../../services/BreedsService";
import { getVaccinationsForPuppy } from '../../services/VaccinationsService';

const AddPet = ({ onSuccess }) => {
    const [petData, setPetData] = useState({
        name: '',
        breedId: '',
        birthdate: '',
        weight: '',
        gender: '',
        vaccinations: {},
        image: null,
    });

    const [breedOptions, setBreedOptions] = useState([]);
    const [vaccinationOptions, setVaccinationOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPetData((prevData) =>
            type === 'checkbox'
                ? { ...prevData, vaccinations: { ...prevData.vaccinations, [name]: checked } }
                : { ...prevData, [name]: value }
        );
    };

    // Handle image input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPetData((prevData) => ({ ...prevData, image: reader.result }));
            };
        }
    };

    // Handle breed selection
    const handleBreedChange = (selectedOption) => {
        setPetData((prevData) => ({
            ...prevData,
            breedId: selectedOption ? selectedOption.value : '',
        }));
    };

    // Fetch breeds and vaccinations
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

        const fetchVaccinations = async () => {
            try {
                const vaccinations = await getVaccinationsForPuppy();
                setVaccinationOptions(vaccinations);
            } catch (error) {
                console.error('Error fetching vaccinations:', error);
            }
        };

        fetchBreeds();
        fetchVaccinations();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPet(petData);
            if (onSuccess) onSuccess();
            setPetData({
                name: '',
                breedId: '',
                birthdate: '',
                weight: '',
                gender: '',
                vaccinations: {},
                image: null,
            });
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    return (
        <div className={formStyles.pageContainer} style={{padding: '15rem 0'}}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Pet</h1>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.photoPlusInputs}>
                        <ImageUpload petData={petData} handleImageChange={handleImageChange} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                                <label htmlFor="birthdate" className={formStyles.label}>Birthdate:</label>
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
                        <label htmlFor="weight" className={formStyles.label}>Weight (kg):</label>
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

                    <div className={formStyles.inputGroup}>
                        <label htmlFor="gender" className={formStyles.label}>Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={petData.gender}
                            onChange={handleChange}
                            className={formStyles.inputField} 
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <VaccinationsChecklist
                        vaccinationOptions={vaccinationOptions}
                        petData={petData}
                        handleChange={handleChange}
                    />
                    <SubmitButton type="submit">Add Pet</SubmitButton> 
                </form>
            </div>
        </div>
    );
};

export default AddPet;
