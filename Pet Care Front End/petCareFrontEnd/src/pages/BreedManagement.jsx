import React, { useContext, useEffect, useState } from 'react';
import AddBreedForm from '../components/forms/adminForms/AddBreedForm';
import BreedList from '../components/adminComponents/BreedList';
import styles from '../components/forms/Form.module.css';
import gridStyle from './GridLayout.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TokenManager from '../services/TokenManager';
import { jwtDecode } from 'jwt-decode';

const BreedManagement = () => {
    const [refresh, setRefresh] = useState(false);
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
            if (claims && !claims.roles.includes("Admin")) {
                navigate('/accessDenied');
                return;
            }
        };

        checkUserAccess();
    }, [navigate, claims]);

    const handleBreedAdded = () => {
        setRefresh(!refresh); // Trigger re-render of the breed list
    };

    return (
        <div className={gridStyle.pageContainer}>
            <h1 className={gridStyle.title}>Breed Management</h1>
            <div className={gridStyle.pageContent}>
                <AddBreedForm onBreedAdded={handleBreedAdded} className={gridStyle.rightPanel} />
                <div className={`${gridStyle.box} ${gridStyle.leftPanel}`}>
                    <h1 className={gridStyle.title}>Breeds</h1>
                    <BreedList key={refresh} />
                </div>
            </div>
        </div>
    );
};

export default BreedManagement;
