export const validateAddBreedForm = (breed) => {
    const errors = {};

    // Validate name
    if (!breed.name.trim()) {
        errors.name = "Breed name is required.";
    } else if (breed.name.length < 3) {
        errors.name = "Breed name must be at least 3 characters long.";
    }

    // Validate description
    if (!breed.description.trim()) {
        errors.description = "Description is required.";
    }

    // Validate normal mood ID
    if (!breed.normalMoodId) {
        errors.normalMoodId = "Please select a normal mood.";
    }

    // Validate minimum exercise
    if (breed.minimumExercisePerDay < 0) {
        errors.minimumExercisePerDay = "Exercise per day must be a positive number.";
    } else if (breed.minimumExercisePerDay === 0) {
        errors.minimumExercisePerDay = "Minimum exercise per day is required.";
    }

    return errors;
};
