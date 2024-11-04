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
        image: null,         // Image preview URL
        imageFile: null,     // Image file object
    });

    const [breedOptions, setBreedOptions] = useState([]);
    const [vaccinationOptions, setVaccinationOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPetData((prevData) =>
            type === 'checkbox'
                ? { ...prevData, vaccinations: { ...prevData.vaccinations, [name]: checked } }
                : { ...prevData, [name]: value }
        );
    };

    const handleImageChange = (file) => {
        setPetData((prevData) => ({
            ...prevData,
            imageFile: file,                      // Store the File object
            image: URL.createObjectURL(file),     // Set preview URL
        }));
    };

    const handleBreedChange = (selectedOption) => {
        setPetData((prevData) => ({
            ...prevData,
            breedId: selectedOption ? selectedOption.value : '',
        }));
    };

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

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove data:image prefix
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: petData.name,
            breedId: petData.breedId,
            birthdate: petData.birthdate,
            weight: petData.weight,
            gender: petData.gender,
            vaccinations: petData.vaccinations,
        };

        if (petData.imageFile) {
            try {
                const base64Image = await convertFileToBase64(petData.imageFile);
                payload.image = base64Image;
            } catch (error) {
                console.error("Error converting image to base64:", error);
                return;
            }
        }

        try {
            await addPet(payload);
            if (onSuccess) onSuccess();
            setPetData({
                name: '',
                breedId: '',
                birthdate: '',
                weight: '',
                gender: '',
                vaccinations: {},
                image: null,
                imageFile: null,
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
