import React, { useState, useEffect } from 'react';
import VaccineRecordTable from './VaccineRecordTable';
import VaccineFilter from './VaccineFilter';
import AddVaccinationForm from '../forms/AddVaccinationForm';
import UpcomingVaccinesList from './UpcomingVaccinesList';
import styles from './VaccineRecords.module.css';
import { usePet } from '../../context/PetContext';
import { calculateUpcomingVaccines } from '../../services/VaccinationsService';

const VaccineRecords = () => {
    const { pet } = usePet();

    if (!pet) {
        return <p>No pet data available. Please go back and select a pet.</p>;
    }

    const [filterType, setFilterType] = useState('');
    const [vaccinationRecords, setVaccinationRecords] = useState(pet.vaccinationRecords || []);
    const [newVaccine, setNewVaccine] = useState({ vaccine_id: '', name: '', type: '', date: '' });
    const [upcomingVaccines, setUpcomingVaccines] = useState([]);

    useEffect(() => {
        const fetchUpcomingVaccines = async () => {
            try {
                const upcoming = await calculateUpcomingVaccines(pet);
                setUpcomingVaccines(upcoming);
            } catch (error) {
                console.error("Error fetching upcoming vaccines:", error);
            }
        };

        fetchUpcomingVaccines();
    }, [pet, vaccinationRecords]); // Recalculate when vaccination records or pet data changes

    const handleAddVaccination = (newRecord) => {
        setVaccinationRecords([...vaccinationRecords, newRecord]);
    };

    return (
        <div className={styles.vaccineRecordsPageContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.box}>
                    <h2 className={styles.title}>Vaccination Records</h2>
                    <VaccineFilter filterType={filterType} setFilterType={setFilterType} />
                    <VaccineRecordTable records={vaccinationRecords} filterType={filterType} />
                </div>
            </div>

            <div className={styles.rightPanel}>
                <AddVaccinationForm 
                    newVaccine={newVaccine} 
                    setNewVaccine={setNewVaccine} 
                    handleAddVaccination={handleAddVaccination} 
                    pet={pet}
                />
                <UpcomingVaccinesList upcomingVaccines={upcomingVaccines} />
            </div>
        </div>
    );
};

export default VaccineRecords;
