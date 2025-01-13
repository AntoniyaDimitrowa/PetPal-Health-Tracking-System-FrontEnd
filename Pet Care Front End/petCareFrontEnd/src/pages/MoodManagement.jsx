import React, { useContext, useEffect, useState } from 'react';
import AddMoodForm from '../components/forms/adminForms/AddMoodForm';
import MoodList from '../components/adminComponents/MoodList';
import gridStyle from './GridLayout.module.css';
import { useNavigate } from 'react-router-dom';
import TokenManager from '../services/TokenManager';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const MoodManagement = () => {
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

    const handleMoodAdded = () => {
        setRefresh(!refresh); // Trigger re-render of the mood list
    };

    return (
        <div className={gridStyle.pageContainer}>
            <h1 className={gridStyle.title}>Mood Management</h1>
            <div className={gridStyle.pageContent}>
                <AddMoodForm onMoodAdded={handleMoodAdded} className={gridStyle.rightPanel} />
                <div className={`${gridStyle.box} ${gridStyle.leftPanel}`}>
                    <h1 className={gridStyle.title}>Moods</h1>
                    <MoodList key={refresh} />
                </div>
            </div>
        </div>
    );
};

export default MoodManagement;
