import React, { useState, useEffect } from 'react';
import formStyles from './Form.module.css';
import PetInputFields from './PetInputFields';
import SubmitButton from './SubmitButton';
import { getBreeds } from '../../services/BreedsService';
import { addPet } from '../../services/PetService';
import { validatePetForm } from '../../validations/PetValidation';
import ErrorMessage from '../messages/ErrorMessge';

const AddPetForm = ({ onSuccess }) => {
    const [petData, setPetData] = useState({
        name: '',
        breedId: '',
        birthdate: '',
        weight: '',
        gender: '',
        image: null,         // Image preview URL
        imageFile: null,     // Image file object
    });

    const [breedOptions, setBreedOptions] = useState([]);
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

        fetchBreeds();
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

        const { errors } = validatePetForm(petData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
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
                image: null,
                imageFile: null,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to add pet. Please try again later.' });
        }
    };

    return (
        <div className={formStyles.pageContainer} style={{ padding: '15rem 0' }}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Pet</h1>
                <ErrorMessage errors={errors} />
                <form onSubmit={handleSubmit}>
                    {/* Shared Input Fields */}
                    <PetInputFields
                        petData={petData}
                        breedOptions={breedOptions}
                        isLoadingBreeds={isLoadingBreeds}
                        handleChange={handleChange}
                        handleBreedChange={handleBreedChange}
                        handleImageChange={handleImageChange}
                    />

                    {/* Submit Button */}
                    <SubmitButton type="submit">Add Pet</SubmitButton>
                </form>
            </div>
        </div>
    );
};

export default AddPetForm;
