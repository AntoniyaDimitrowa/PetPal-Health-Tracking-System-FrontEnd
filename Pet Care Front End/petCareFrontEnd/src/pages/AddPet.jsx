import React, { useState, useEffect, useContext } from 'react';
import AddPet from '../components/forms/pet/AddPetForm';
import SuccessMessage from '../components/messages/SuccessMessage';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../services/TokenManager';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../context/AuthContext'; // Assuming you have this context for user claims

function AddPetPage() {
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { claims } = useContext(AuthContext); // Getting claims from the AuthContext

    useEffect(() => {
        const checkUserAccess = () => {
            const token = TokenManager.getAccessToken();

            // 1. If no token, redirect to login
            if (!token) {
                navigate('/login');
                return;
            }

            // 2. Decode the token and check for expiration
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                TokenManager.clear();
                navigate('/login'); // Redirect if token is expired
                return;
            }

            // 3. If user doesn't have 'owner' role, redirect to /accessDenied
            if (claims && !claims.roles.includes("Owner")) {
                navigate('/accessDenied');
                return;
            }
        };

        checkUserAccess();
    }, [navigate, claims]);

    const handleSuccess = () => {
        setSuccessMessage('Pet has been successfully created!');
        // Optionally reset the success message after some time
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    return (
        <div style={{ backgroundColor: '#C3E5CC' }}>
            {successMessage && <SuccessMessage message={successMessage} />}
            <AddPet onSuccess={handleSuccess} />
        </div>
    );
}

export default AddPetPage;
