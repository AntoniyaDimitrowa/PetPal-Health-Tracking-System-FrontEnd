import React, { useState, useEffect, useRef } from 'react';
import { getAccount, updateAccount } from '../../../services/UserAccountService';  
import formStyles from '../Form.module.css';
import ImageUpload from '../ImageUpload';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../../messages/ErrorMessge';
import { validateUpdateAccountForm } from '../../../validations/UserValidation';

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
    const [errors, setErrors] = useState({});
    const [isChangePassword, setIsChangePassword] = useState(false); // State for tracking the checkbox
    const formRef = useRef(null); 

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
    
        const validationErrors = validateUpdateAccountForm(accountData, isChangePassword);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        const withPassword = isChangePassword;
    
        const payload = {
            name: accountData.name,
            email: accountData.email,
            address: accountData.address,
            ...(withPassword
                ? {
                      oldPassword: accountData.oldPassword,
                      newPassword: accountData.password,
                  }
                : {}),
        };
    
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
            await updateAccount(userId, payload, withPassword);
            if (onSuccess) onSuccess();
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update account.";
            setError(message);
        }
    };
    
    if (loading) {
        return <p>Loading...</p>;
    }

    const dynamicPadding = Object.keys(errors).length > 0 ? '5rem' : '3rem';

    return (
        <div className={formStyles.pageContainer} style={{ padding: `${dynamicPadding} 0` }}>
            <div className={formStyles.box} ref={formRef}>
                <h1 className={formStyles.title}>Update Account</h1>
                <ErrorMessage errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.photoPlusInputs}>
                        <ImageUpload data={accountData} handleImageChange={handleImageChange} />
                        <div>
                            <div className={formStyles.inputGroup}>
                                <label htmlFor="name" className={formStyles.label}>Name:*</label>
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
                                <label htmlFor="email" className={formStyles.label}>Email:*</label>
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
                                <label htmlFor="address" className={formStyles.label}>Address:*</label>
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
                                <label htmlFor="oldPassword" className={formStyles.label}>Old Password:*</label>
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
                                <label htmlFor="password" className={formStyles.label}>New Password:*</label>
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
                                <label htmlFor="confirmPassword" className={formStyles.label}>Confirm New Password:*</label>
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
