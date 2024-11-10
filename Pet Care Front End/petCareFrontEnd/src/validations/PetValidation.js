import { differenceInWeeks } from 'date-fns';

export const validatePetForm = (petData, vaccinationOptions) => {
    const errors = {};
    const today = new Date();
    const birthDate = new Date(petData.birthdate);

    // Calculate age in weeks
    const ageInWeeks = petData.birthdate ? Math.max(0, differenceInWeeks(today, birthDate)) : 0;

    // Basic validation
    if (!petData.name.trim()) errors.name = "Name is required.";
    if (!petData.breedId) errors.breedId = "Breed is required.";
    if (!petData.birthdate) errors.birthdate = "Birthdate is required.";
    if (!petData.weight || parseFloat(petData.weight) <= 0) errors.weight = "Weight must be greater than 0.";
    if (!petData.gender) errors.gender = "Gender is required.";

    // Vaccination validation
    Object.keys(petData.vaccinations).forEach((vaccineId) => {
        const vaccine = vaccinationOptions.find((v) => v.id === parseInt(vaccineId));
        if (vaccine && petData.vaccinations[vaccineId] && vaccine.range >= ageInWeeks) {
            errors.vaccinations = `Vaccination "${vaccine.name}" is not allowed for dogs younger than ${vaccine.range} weeks.`;
        }
    });

    return { errors, ageInWeeks };
};
