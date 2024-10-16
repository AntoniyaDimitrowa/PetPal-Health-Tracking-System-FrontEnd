import React from 'react';
import AddPet from '../components/AddPet';

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
