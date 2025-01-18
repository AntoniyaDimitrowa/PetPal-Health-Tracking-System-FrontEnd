// validations/UserValidation.js

// Helper function for validating email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function for validating password complexity
const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return passwordRegex.test(password);
};

// Helper function for validating address format
const isValidAddress = (address) => {
    const addressRegex = /^[A-Za-z][A-Za-z\s-]{0,99},\s[A-Za-z][A-Za-z\s-]{0,99}$/;
    return addressRegex.test(address);
};

// Validation for SignupForm
export const validateSignupForm = (inputValues) => {
    const errors = {};

    if (!inputValues.name.trim()) {
        errors.name = "Name is required and must not be empty.";
    }

    if (!isValidEmail(inputValues.email)) {
        errors.email = "A valid email is required.";
    }

    if (!inputValues.address.trim()) {
        errors.address = "Address is required.";
    } else if (!isValidAddress(inputValues.address)) {
        errors.address = "Address must be in the format 'City, Country'. Each part can be up to 100 characters.";
    }

    if (!inputValues.password) {
        errors.password = "Password is required.";
    } else if (!isStrongPassword(inputValues.password)) {
        errors.password = "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (inputValues.password !== inputValues.repeatPassword) {
        errors.repeatPassword = "Passwords do not match.";
    }

    return errors;
};

// Validation for LoginForm
export const validateLoginForm = (email, password) => {
    const errors = {};

    if (!isValidEmail(email)) {
        errors.email = "A valid email is required.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (!isStrongPassword(password)) {
        errors.password = "Password must meet the required complexity.";
    }
    console.log(errors);
    
    return errors;
};

// Validation for UpdateAccount Form
export const validateUpdateAccountForm = (accountData, isChangePassword) => {
    const errors = {};

    if (!accountData.name.trim()) {
        errors.name = "Name is required and must not be empty.";
    }

    if (!isValidEmail(accountData.email)) {
        errors.email = "A valid email is required.";
    }

    if (!accountData.address.trim()) {
        errors.address = "Address is required.";
    } else if (!isValidAddress(accountData.address)) {
        errors.address = "Address must be in the format 'City, Country'. Each part can be up to 100 characters.";
    }

    if (isChangePassword) {
        if (!accountData.oldPassword) {
            errors.oldPassword = "Old password is required.";
        }

        if (!accountData.password) {
            errors.password = "New password is required.";
        } else if (!isStrongPassword(accountData.password)) {
            errors.password = "New password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        if (accountData.password !== accountData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
    }

    return errors;
};
