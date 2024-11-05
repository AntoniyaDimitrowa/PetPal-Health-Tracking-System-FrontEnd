import React, { useState, useEffect } from 'react';
import { addYears, isBefore } from 'date-fns';
import VaccineRecordTable from './VaccineRecordTable';
import VaccineFilter from './VaccineFilter';
import AddVaccinationForm from '../forms/AddVaccinationForm';
import UpcomingVaccinesList from './UpcomingVaccinesList';
import styles from './VaccineRecords.module.css';
import { usePet } from '../../context/PetContext';

const VaccineRecords = () => {
    const { pet } = usePet();

    if (!pet) {
        return <p>No pet data available. Please go back and select a pet.</p>;
    }

    const [filterType, setFilterType] = useState('');
    const [vaccinationRecords, setVaccinationRecords] = useState(pet.vaccinationRecords || []);
    const [newVaccine, setNewVaccine] = useState({ name: '', type: '', date: '' });
    const [upcomingVaccines, setUpcomingVaccines] = useState([]);

    useEffect(() => {
        const calculateUpcomingVaccines = () => {
            const upcoming = vaccinationRecords.filter(record => {
                const nextDueDate = record.vaccination.type === 'ForPuppy'
                    ? addYears(new Date(record.date), record.vaccination.range / 52)
                    : addYears(new Date(record.date), record.vaccination.range);
                return isBefore(new Date(), nextDueDate);
            });
            setUpcomingVaccines(upcoming);
        };

        calculateUpcomingVaccines();
    }, [vaccinationRecords]);

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
                <AddVaccinationForm newVaccine={newVaccine} setNewVaccine={setNewVaccine} handleAddVaccination={handleAddVaccination} />
                <UpcomingVaccinesList upcomingVaccines={upcomingVaccines} />
            </div>
        </div>
    );
};

export default VaccineRecords;
