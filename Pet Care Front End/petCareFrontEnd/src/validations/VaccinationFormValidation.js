// VaccinationFormValidation.js
export const validateVaccinationForm = (newVaccine, vaccinationOptions) => {
    const errors = {};

    // Check if a vaccine is selected
    if (!newVaccine.vaccineId) {
        errors.vaccineId = "Vaccine selection is required.";
    } else if (!vaccinationOptions.find(option => option.value === newVaccine.vaccineId)) {
        errors.vaccineId = "Selected vaccine is invalid.";
    }

    // Check if a date is provided
    if (!newVaccine.date) {
        errors.date = "Vaccination date is required.";
    } else {
        const vaccinationDate = new Date(newVaccine.date);
        const today = new Date();
        
        if (isNaN(vaccinationDate.getTime())) {
            errors.date = "Invalid date format.";
        } else if (vaccinationDate > today) {
            errors.date = "Vaccination date cannot be in the future.";
        }
    }

    return errors;
};