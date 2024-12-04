import React, { useState } from 'react';
import AddMoodForm from '../components/forms/adminForms/AddMoodForm';
import MoodList from '../components/adminComponents/MoodList';
import gridStyle from './GridLayout.module.css';

const MoodManagement = () => {
    const [refresh, setRefresh] = useState(false);

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
