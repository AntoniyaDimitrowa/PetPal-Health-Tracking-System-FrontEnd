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
        password: '',
        confirmPassword: '',
        image: null,          // For image preview
        imageFile: null,       // For storing the file object
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const data = await getAccount(userId);
            if (data) {
                setAccountData({
                    ...data,
                    image: `data:image/jpeg;base64,${data.image}`, // Use base64 string from backend for preview
                    password: '',
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
        if (accountData.password !== accountData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const payload = {
            name: accountData.name,
            email: accountData.email,
            address: accountData.address,
            password: accountData.password,
        };

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
                        <ImageUpload petData={accountData} handleImageChange={handleImageChange} />
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
                    <div className={formStyles.inputGroup}>
                        <label htmlFor="password" className={formStyles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={accountData.password}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label htmlFor="confirmPassword" className={formStyles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={accountData.confirmPassword}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <SubmitButton type="submit">Save</SubmitButton>
                </form>
            </div>
        </div>
    );
};

export default UpdateAccount;
