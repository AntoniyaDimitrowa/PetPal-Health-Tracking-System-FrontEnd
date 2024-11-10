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
import { validatePetForm } from '../../validations/PetValidation';
import ErrorMessage from '../messages/ErrorMessge';

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
        userId: 2
    });

    const [breedOptions, setBreedOptions] = useState([]);
    const [vaccinationOptions, setVaccinationOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breeds = await getBreeds();
                setBreedOptions(breeds.map((b) => ({ value: b.id, label: b.name })));
            } catch (err) {
                console.error('Error fetching breeds:', err);
            } finally {
                setIsLoadingBreeds(false);
            }
        };

        const fetchVaccinations = async () => {
            try {
                const vaccinations = await getVaccinationsForPuppy();
                setVaccinationOptions(vaccinations);
            } catch (err) {
                console.error('Error fetching vaccinations:', err);
            }
        };

        fetchBreeds();
        fetchVaccinations();
    }, []);

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

        const payload = { ...petData };

        if (petData.imageFile) {
            try {
                const base64Image = await convertFileToBase64(petData.imageFile);
                payload.image = base64Image;
            } catch (error) {
                console.error("Error converting image to base64:", error);
                return;
            }
        }
        
        const { errors, ageInWeeks } = validatePetForm(petData, vaccinationOptions);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setSuccessMessage('');
            return;
        }

        setErrors({});

        try {
            await addPet(payload);
            setErrors({});
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
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to add pet. Please try again later.' });
        }
    };
    
    const dynamicPadding = Object.keys(errors).length > 0 ? '20rem' : '15rem';

    return (
        <div className={formStyles.pageContainer} style={{ padding: `${dynamicPadding} 0` }}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Pet</h1>
                {/* Display Error Messages */}
                <ErrorMessage errors={errors} />

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
