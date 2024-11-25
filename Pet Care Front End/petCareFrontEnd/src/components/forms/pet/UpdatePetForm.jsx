import React, { useState, useEffect } from 'react';
import formStyles from '../Form.module.css';
import PetInputFields from './PetInputFields';
import SubmitButton from '../SubmitButton';
import { getBreeds } from '../../../services/BreedsService';
import { updatePet } from '../../../services/PetService'; // Uncomment the service to update pet data
import { usePet } from '../../../context/PetContext';
import ErrorMessage from '../../messages/ErrorMessge';
import SuccessMessage from '../../messages/SuccessMessage';

const UpdatePetForm = () => {
    const { pet, setPet } = usePet(); // Access the selected pet from context
    console.log(pet);
    const [petData, setPetData] = useState({
        id: '',
        name: '',
        breedId: '',
        birthdate: '',
        weight: '',
        gender: '',
        image: '',          // Image URL for preview
        imageFile: null,    // Image file for upload
    });

    const [breedOptions, setBreedOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);
    const [errors, setErrors] = useState({});
    const [isLoadingPetData, setIsLoadingPetData] = useState(true); // Flag for pet data loading
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch breeds and populate the form when pet context is updated
    useEffect(() => {        
        if (pet) {
            setPetData({ 
                id: pet.id,
                name: pet.name,
                breedId: pet.breed.id,
                birthdate: pet.birthdate,
                weight: pet.weight,
                gender: pet.gender,
                image: `data:image/jpeg;base64,${pet.image}` || '',         // Set image URL if available
                imageFile: null,                // Initially no new file selected
            });
            setIsLoadingPetData(false); // Data is loaded, set loading state to false
        }

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
    }, [pet]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleBreedChange = (selectedOption) => {
        setPetData((prevData) => ({ ...prevData, breedId: selectedOption ? selectedOption.value : '' }));
    };

    const handleImageChange = (file) => {
        setPetData((prevData) => ({
            ...prevData,
            imageFile: file,                      // Store the File object
            image: URL.createObjectURL(file),     // Set preview URL
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data for submission
        const updatedPetData = { ...petData };

        // If a new image is uploaded, handle it
        if (petData.imageFile) {
            try {
                const base64Image = await convertFileToBase64(petData.imageFile);
                updatedPetData.image = base64Image; // Store base64-encoded image
            } catch (error) {
                console.error("Error converting image to base64:", error);
                setErrors({ submit: 'Failed to process the image. Please try again.' });
                return;
            }
        } else {
            // Retain the existing image if no new file is uploaded
            updatedPetData.image = pet.image; // Use the existing image from the context
        }

        try {
            const message = await updatePet(updatedPetData); // Send updated pet data to the server
            setSuccessMessage(message);
            setErrors({});
        } catch (error) {
            console.error('Error updating pet:', error);
            setErrors({ submit: 'Failed to update pet. Please try again later. Error updating pet:'+ error });
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer); // Cleanup the timeout on unmount
        }
    }, [successMessage]);

    // Convert image file to base64 (helper function)
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove data:image prefix
            reader.onerror = (error) => reject(error);
        });
    };

    // Loading state for the form (Show loader if pet data is not yet available)
    if (isLoadingPetData) {
        return <div className={formStyles.pageContainer}>Loading pet data...</div>;
    }

    return (
        <div className={formStyles.pageContainer}>
            <SuccessMessage message={successMessage}/>
            <div className={formStyles.box}>    
                <h1 className={formStyles.title}>Update Pet</h1>
                <ErrorMessage errors={errors} />
                <form onSubmit={handleSubmit}>
                    <PetInputFields
                        petData={petData}
                        breedOptions={breedOptions}
                        isLoadingBreeds={isLoadingBreeds}
                        handleChange={handleChange}
                        handleBreedChange={handleBreedChange}
                        handleImageChange={handleImageChange}
                    />
                    <SubmitButton type="submit">Update Pet</SubmitButton>
                </form>
            </div>
        </div>
    );
};

export default UpdatePetForm;
