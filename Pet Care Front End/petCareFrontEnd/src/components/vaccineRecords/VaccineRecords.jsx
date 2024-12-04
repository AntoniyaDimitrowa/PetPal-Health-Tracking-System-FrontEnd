import React, { useState, useEffect } from 'react';
import VaccineRecordTable from './VaccineRecordTable';
import VaccineFilter from './VaccineFilter';
import AddVaccinationForm from '../forms/pet/AddVaccinationForm';
import UpcomingVaccinesList from './UpcomingVaccinesList';
import styles from './VaccineRecords.module.css';
import { usePet } from '../../context/PetContext';
import { calculateUpcomingVaccines } from '../../services/VaccinationsService';
import SuccessMessage from '../messages/SuccessMessage';
import ErrorMessage from '../messages/ErrorMessge';

const VaccineRecords = () => {
    const { pet, setPet } = usePet();

    if (!pet) {
        return <p>No pet data available. Please go back and select a pet.</p>;
    }

    const [vaccinationRecords, setVaccinationRecords] = useState(pet.vaccinationRecords || []);
    const [newVaccine, setNewVaccine] = useState({ vaccineId: '', type: '', date: '' });
    const [upcomingVaccines, setUpcomingVaccines] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        type: '',
        startDate: '',
        endDate: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState({});

    // Recalculate upcoming vaccines
    const recalculateUpcomingVaccines = async (pet) => {

        try {
            const upcoming = await calculateUpcomingVaccines(pet);

            setUpcomingVaccines(upcoming);
        } catch (error) {
            console.error('Error fetching upcoming vaccines:', error);
        }
    };

    // Handle addition of a new vaccine
    const handleAddVaccination = async (newRecord) => {
        try {
            // Consolidate updates
            const updatedRecords = [...vaccinationRecords, newRecord];
            const updatedPet = { ...pet, vaccinationRecords: updatedRecords };

            // Update the pet state
            setPet(updatedPet);
            setVaccinationRecords(updatedRecords);
            await recalculateUpcomingVaccines(updatedPet);

            setSuccessMessage('Vaccination record added successfully!');
            setErrorMessages({});
        } catch (error) {
            setErrorMessages({ general: error.message });
            setSuccessMessage('');
        }
    };


    // Initialize data on mount
    useEffect(() => {
        if (pet) {
            setVaccinationRecords(pet.vaccinationRecords || []);
            recalculateUpcomingVaccines(pet);
        }
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer); // Cleanup the timeout on unmount
        }
    }, [successMessage]);

    useEffect(() => {
        if (Object.keys(errorMessages).length > 0) {
            const timer = setTimeout(() => setErrorMessages({}), 3000);
            return () => clearTimeout(timer); // Cleanup the timeout on unmount
        }
    }, [errorMessages]);

    return (
        <div className={styles.pagePlusMessages}>
            <SuccessMessage message={successMessage} />
            <ErrorMessage errors={errorMessages} />

            <div className={styles.flex} >
                <AddVaccinationForm
                    newVaccine={newVaccine}
                    setNewVaccine={setNewVaccine}
                    pet={pet}
                    handleAddVaccination={handleAddVaccination}
                />
                <UpcomingVaccinesList upcomingVaccines={upcomingVaccines} />
            </div>

            <div className={styles.box}>
                <h2 className={styles.title}>Vaccination Records</h2>
                <VaccineFilter filters={filters} setFilters={setFilters} />
                <VaccineRecordTable records={vaccinationRecords} filters={filters} />
            </div>
        </div>
    );
};

export default VaccineRecords;
