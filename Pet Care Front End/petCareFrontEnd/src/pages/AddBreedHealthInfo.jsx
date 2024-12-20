import React, { useState } from 'react';
import AddBreedHealthInfoForm from '../components/forms/breedHealthInfo/AddBreedHealthInfoForm';
import SuccessMessage from '../components/messages/SuccessMessage';

const AddBreedHealthInfoPage = ({ breedId }) => {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSuccess = () => {
        setSuccessMessage('Breed health info has been successfully added!');
        setTimeout(() => setSuccessMessage(''), 5000); // Clear message after 5 seconds
    };

    return (
        <div style={{ backgroundColor: '#F3F4F6' }}>
            {successMessage && <SuccessMessage message={successMessage} />}
            <AddBreedHealthInfoForm onSuccess={handleSuccess} />
        </div>
    );
};

export default AddBreedHealthInfoPage;
