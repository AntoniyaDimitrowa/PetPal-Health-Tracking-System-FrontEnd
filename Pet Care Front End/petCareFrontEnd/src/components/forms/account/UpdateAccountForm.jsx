import React, { useState, useEffect } from 'react';
import { getAccount, updateAccount } from '../../../services/UserAccountService';  
import formStyles from '../Form.module.css';
import ImageUpload from '../ImageUpload';
import SubmitButton from '../SubmitButton';

const UpdateAccount = ({ userId, onSuccess }) => {
    const [accountData, setAccountData] = useState({
        name: '',
        email: '',
        address: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        image: null,          // For image preview
        imageFile: null,      // For storing the file object
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChangePassword, setIsChangePassword] = useState(false); // State for tracking the checkbox

    useEffect(() => {
        const fetchAccount = async () => {
            const data = await getAccount(userId);
            if (data) {
                setAccountData({
                    ...data,
                    image: data.image ? `data:image/jpeg;base64,${data.image}` : '', // Use base64 string from backend for preview
                    password: '', // Reset passwords on load
                    confirmPassword: '',
                });
            }
            setLoading(false);
        };

        fetchAccount();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (file) => {
        setAccountData((prevData) => ({
            ...prevData,
            imageFile: file,
            image: URL.createObjectURL(file), // For preview
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsChangePassword(e.target.checked); // Toggle checkbox state
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove `data:image/*;base64,`
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If password change is requested, validate that passwords match
        if (isChangePassword) {
            if (accountData.password !== accountData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            if (!accountData.password || !accountData.confirmPassword || !accountData.oldPassword) {
                setError("Please fill in all password fields");
                return;
            }
        }

        const payload = {
            name: accountData.name,
            email: accountData.email,
            address: accountData.address,
        };

        // Include the old password for validation
        if (isChangePassword && accountData.oldPassword) {
            payload.oldPassword = accountData.oldPassword;
        }

        // Only include the new password if the change password checkbox is checked
        if (isChangePassword && accountData.password) {
            payload.password = accountData.password;
        }

        // Convert to base64 if there is an image file
        if (accountData.imageFile) {
            try {
                const base64Image = await convertFileToBase64(accountData.imageFile);
                payload.image = base64Image;
            } catch (error) {
                console.error("Error converting image to base64:", error);
                setError("Failed to process the image. Please try a different file.");
                return;
            }
        }

        try {
            await updateAccount(userId, payload);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Error updating account:", error);
            setError("Failed to update account. Please try again later.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={formStyles.pageContainer}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Update Account</h1>
                {error && <p className={formStyles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.photoPlusInputs}>
                        <ImageUpload data={accountData} handleImageChange={handleImageChange} />
                        <div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="name" className={formStyles.label}>Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={accountData.name}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="email" className={formStyles.label}>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={accountData.email}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="address" className={formStyles.label}>Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={accountData.address}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox for changing password */}
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>
                            <input
                                type="checkbox"
                                checked={isChangePassword}
                                onChange={handleCheckboxChange}
                            />
                            Change Password
                        </label>
                    </div>

                    {/* Password fields (conditionally displayed) */}
                    {isChangePassword && (
                        <>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="oldPassword" className={formStyles.label}>Old Password:</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={accountData.oldPassword}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                    required={isChangePassword}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="password" className={formStyles.label}>New Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={accountData.password}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                    required={isChangePassword}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="confirmPassword" className={formStyles.label}>Confirm New Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={accountData.confirmPassword}
                                    onChange={handleChange}
                                    className={formStyles.inputField}
                                    required={isChangePassword}
                                />
                            </div>
                        </>
                    )}

                    <SubmitButton type="submit">Save</SubmitButton>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccount;
