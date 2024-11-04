import React from 'react';
import UpdateAccount from '../components/forms/UpdateAccountForm';
import { useParams } from 'react-router-dom';

function UpdateAccountPage() {
    const userId = '2'; //When I have Login this should be changed to the loged in userId

    const handleSuccess = () => {
        alert('Account information has been successfully updated!');
    };

    return (
        <div>
            <UpdateAccount userId={userId} onSuccess={handleSuccess} />
        </div>
    );
}

export default UpdateAccountPage;