import React, { useState } from 'react';
import AddPet from '../components/forms/pet/AddPetForm';
import SuccessMessage from '../components/messages/SuccessMessage';

function AddPetPage() {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSuccess = () => {
        setSuccessMessage('Pet has been successfully created!');
        // Optionally reset the success message after some time
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    return (
        <div style={{ backgroundColor: '#C3E5CC'}}>
            {successMessage && <SuccessMessage message={successMessage} />}
            <AddPet onSuccess={handleSuccess} />
        </div>
    );
}

export default AddPetPage;
