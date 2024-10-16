import React, { useState, useEffect } from 'react';
import formStyles from '../styles/Form.module.css';
import ImageUpload from './ImageUpload';
import PetFormFields from './PetFormFields';
import VaccinationsChecklist from './VaccinationsChecklist';
import SubmitButton from './SubmitButton';
import { addPet } from '../services/PetService'; // Assuming addPet is a POST request to add a pet
import { getBreeds } from "../services/BreedsService";
import { getVaccinationsForPuppy } from '../services/VaccinationsService';

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
        <div className={formStyles.pageContainer}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Pet</h1>
                <form onSubmit={handleSubmit}>
                    <div className="photoPlusInputs">
                        <ImageUpload petData={petData} handleImageChange={handleImageChange} />
                        <PetFormFields
                            petData={petData}
                            breedOptions={breedOptions}
                            handleChange={handleChange}
                            handleBreedChange={handleBreedChange}
                            isLoadingBreeds={isLoadingBreeds}
                        />
                    </div>
                    <VaccinationsChecklist 
                        vaccinationOptions={vaccinationOptions} 
                        petData={petData} 
                        handleChange={handleChange} 
                    />
                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};

export default AddPet;
