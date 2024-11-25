import React from 'react';
import UpdateAccount from '../components/forms/account/UpdateAccountForm';
import TokenManager from '../services/TokenManager';

function UpdateAccountPage() {
    const userId = TokenManager.getClaims()?.userId; 

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