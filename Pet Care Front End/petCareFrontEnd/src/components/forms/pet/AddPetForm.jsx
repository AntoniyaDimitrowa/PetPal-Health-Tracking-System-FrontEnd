import React, { useState, useEffect, useRef } from 'react';
import formStyles from '../Form.module.css';
import PetInputFields from './PetInputFields';
import SubmitButton from '../SubmitButton';
import { getBreeds } from '../../../services/BreedsService';
import { addPet } from '../../../services/PetService';
import { validatePetForm } from '../../../validations/PetValidation';
import ErrorMessage from '../../messages/ErrorMessge';
import { getVaccinationsForPuppy } from '../../../services/VaccinationsService';
import VaccinationsChecklist from './VaccinationsChecklist';
import TokenManager from '../../../services/TokenManager';

const AddPetForm = ({ onSuccess }) => {
    const userId = TokenManager.getClaims()?.userId;

    const [petData, setPetData] = useState({
        name: '',
        breedId: '',
        birthdate: '',
        weight: '',
        gender: '',
        vaccinations: {},
        image: null,
        imageFile: null,
        userId: userId || ''
    });

    const [breedOptions, setBreedOptions] = useState([]);
    const [vaccinationOptions, setVaccinationOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);
    const [errors, setErrors] = useState({});

    const formRef = useRef(null); // Ref for scrolling to the top of the form

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
            imageFile: file,
            image: URL.createObjectURL(file),
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
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
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

        const { errors } = validatePetForm(petData, vaccinationOptions);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);

            // Scroll to the top of the form to display errors
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
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

    const dynamicPadding = Object.keys(errors).length > 0 ? '22rem' : '17rem';

    return (
        <div className={formStyles.pageContainer} style={{ padding: `${dynamicPadding} 0` }}>
            <div className={formStyles.box} ref={formRef}>
                <h1 className={formStyles.title}>Add Pet</h1>
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

export default AddPetForm;
