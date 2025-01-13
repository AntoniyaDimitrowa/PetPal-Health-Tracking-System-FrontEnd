export const validateDailyUpdateForm = (healthRecord) => {
    const errors = {};

    // Validate food intake
    if (!healthRecord.foodIntake) {
        errors.foodIntake = "Food intake is required.";
    }
    else if (healthRecord.foodIntake <= 0) {
        errors.foodIntake = "Food intake must be greater than zero.";
    }

    // Validate water intake
    if (!healthRecord.waterIntake) {
        errors.waterIntake = "Water intake is required.";
    }
    else if (healthRecord.waterIntake <= 0) {
        errors.waterIntake = "Water intake must be greater than zero.";
    }

    // Validate mood selection
    if (!healthRecord.moodId) {
        errors.moodId = "Mood selection is required.";
    }

    // Validate activity level
    if (!healthRecord.activityLevel) {
        errors.activityLevel = "Activity level is required.";
    }
    else if (healthRecord.activityLevel < 0 || healthRecord.activityLevel > 10) {
        errors.activityLevel = "Activity level must be between 0 and 10.";
    }

    // Validate social interaction
    if (!healthRecord.socialInteraction) {
        errors.socialInteraction = "Social interaction status is required.";
    }

    return errors;
};
