import React from 'react';
import AddPet from '../components/forms/AddPetForm';

function AddPetPage() {
    const handleSuccess = () => {
        alert('Pet has been successfully created!');
    };

    return (
        <div>
            <AddPet onSuccess={handleSuccess} />
        </div>
    );
}

export default AddPetPage;
