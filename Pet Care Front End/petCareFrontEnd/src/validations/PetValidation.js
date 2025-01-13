// validations/PetFormValidation.js

import { differenceInWeeks } from 'date-fns';

// Helper function to calculate age in weeks
const calculateAgeInWeeks = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    return birthdate ? Math.max(0, differenceInWeeks(today, birthDate)) : 0;
};

// Shared validation for common fields
const validateCommonFields = (petData) => {
    const errors = {};

    if (!petData.name.trim()) errors.name = "Name is required.";
    if (!petData.breedId) errors.breedId = "Breed is required.";
    if (!petData.birthdate) errors.birthdate = "Birthdate is required.";
    if (!petData.weight || parseFloat(petData.weight) <= 0) errors.weight = "Weight must be greater than 0.";
    if (!petData.gender) errors.gender = "Gender is required.";

    return errors;
};

// Validation for AddPetForm (includes vaccinations)
export const validatePetForm = (petData, vaccinationOptions = []) => {
    const errors = validateCommonFields(petData);
    const ageInWeeks = calculateAgeInWeeks(petData.birthdate);

    // Vaccination validation (optional)
    if (vaccinationOptions.length > 0 && petData.vaccinations) {
        Object.keys(petData.vaccinations).forEach((vaccineId) => {
            const vaccine = vaccinationOptions.find((v) => v.id === parseInt(vaccineId));
            if (vaccine && petData.vaccinations[vaccineId] && vaccine.range >= ageInWeeks) {
                errors.vaccinations = `Vaccination "${vaccine.name}" is not allowed for pets younger than ${vaccine.range} weeks.`;
            }
        });
    }

    return { errors, ageInWeeks };
};

// Validation for UpdatePetForm (without vaccinations)
export const validateUpdatePetForm = (petData) => {
    return validateCommonFields(petData);
};
