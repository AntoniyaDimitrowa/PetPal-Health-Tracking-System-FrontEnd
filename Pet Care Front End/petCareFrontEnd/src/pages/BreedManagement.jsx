import React, { useState } from 'react';
import AddBreedForm from '../components/forms/adminForms/AddBreedForm';
import BreedList from '../components/adminComponents/BreedList';
import styles from '../components/forms/Form.module.css';
import gridStyle from './GridLayout.module.css';

const BreedManagement = () => {
    const [refresh, setRefresh] = useState(false);

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
