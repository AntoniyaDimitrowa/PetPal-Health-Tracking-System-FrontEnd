import React from 'react';
import UpdatePet from '../components/forms/UpdatePetForm';

function UpdatePetPage() {
    const handleSuccess = () => {
        alert('Pet has been successfully updated!');
    };

    return (
        <div>
            <UpdatePet onSuccess={handleSuccess} />
        </div>
    );
}

export default UpdatePetPage;
