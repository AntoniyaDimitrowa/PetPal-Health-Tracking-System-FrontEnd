export const validateAddMoodForm = (mood) => {
    const errors = {};

    // Validate mood name
    if (!mood.name.trim()) {
        errors.name = "Mood name is required.";
    } else if (mood.name.length < 3) {
        errors.name = "Mood name must be at least 3 characters long.";
    }

    // Validate emoji
    if (!mood.emoji.trim()) {
        errors.emoji = "Emoji selection is required.";
    }

    return errors;
};
