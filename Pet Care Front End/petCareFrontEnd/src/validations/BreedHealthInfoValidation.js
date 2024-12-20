export const validateBreedHealthInfo = (data) => {
    const errors = {};

    // Validate breedId
    if (!data.breedId) {
        errors.breedId = 'Breed is required.';
    }

    // Validate age range
    if (!data.ageRangeStart || isNaN(data.ageRangeStart)) {
        errors.ageRangeStart = 'Start of age range is required and must be a valid number.';
    } else if (+data.ageRangeStart < 0) {
        errors.ageRangeStart = 'Age range start must be 0 or greater.';
    }

    if (!data.ageRangeEnd || isNaN(data.ageRangeEnd)) {
        errors.ageRangeEnd = 'End of age range is required and must be a valid number.';
    } else if (+data.ageRangeEnd < 0) {
        errors.ageRangeEnd = 'Age range end must be 0 or greater.';
    }

    if (data.ageRangeStart && data.ageRangeEnd && +data.ageRangeStart >= +data.ageRangeEnd) {
        errors.ageRange = 'Age range start must be less than age range end.';
    }

    // Validate optional fields
    if (!data.normalFoodIntake || isNaN(data.normalFoodIntake)) {
        errors.normalFoodIntake = 'Food intake is required and must be a valid number.';
    } else if (data.normalFoodIntake && +data.normalFoodIntake <= 0) {
        errors.normalFoodIntake = 'Food intake must be greater than 0.';
    }

    if (!data.normalWaterIntake || isNaN(data.normalWaterIntake)) {
        errors.normalWaterIntake = 'Water intake is required and must be a valid number.';
    } else if (data.normalWaterIntake && +data.normalWaterIntake <= 0) {
        errors.normalWaterIntake = 'Water intake must be greater than 0.';
    }

    // Validate weight range
    if (!data.weightRangeMin || isNaN(data.weightRangeMin)) {
        errors.weightRangeMin = 'Minimum weight is required and must be a valid number.';
    } else if (+data.weightRangeMin <= 0) {
        errors.weightRangeMin = 'Minimum weight must be greater than 0.';
    }

    if (!data.weightRangeMax || isNaN(data.weightRangeMax)) {
        errors.weightRangeMax = 'Maximum weight is required and must be a valid number.';
    } else if (+data.weightRangeMax <= 0) {
        errors.weightRangeMax = 'Maximum weight must be greater than 0.';
    }

    if (data.weightRangeMin && data.weightRangeMax && +data.weightRangeMin >= +data.weightRangeMax) {
        errors.weightRange = 'Minimum weight must be less than maximum weight.';
    }

    return errors;
};

