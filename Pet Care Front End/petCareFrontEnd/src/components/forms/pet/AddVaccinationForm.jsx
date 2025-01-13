import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { calculateVaccinationOptions, getVaccinations } from '../../../services/VaccinationsService';
import { addVaccinationRecordToPet } from '../../../services/PetService';
import { validateVaccinationForm } from '../../../validations/VaccinationFormValidation';
import { usePet } from '../../../context/PetContext';
import ErrorMessage from '../../messages/ErrorMessge';
import styles from '../Form.module.css';
import vacStyles from './AddVaccinationForm.module.css';
import customStyles from '../CustomStyles';

const AddVaccinationForm = ({ newVaccine, setNewVaccine, handleAddVaccination }) => {
    const [vaccinationOptions, setVaccinationOptions] = useState([]);
    const [isLoadingVaccines, setIsLoadingVaccines] = useState(true);
    const { pet } = usePet();
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);

    const fetchVaccinationOptions = async () => {
        try {
            setIsLoadingVaccines(true);
            const options = await calculateVaccinationOptions(pet);
            setVaccinationOptions(options);
        } catch (err) {
            console.error('Error fetching vaccinations:', err);
        } finally {
            setIsLoadingVaccines(false);
        }
    };

    const handleNewVaccineChange = (event) => {
        const { name, value } = event.target;
        setNewVaccine({ ...newVaccine, [name]: value });
    };

    const handleSelectChange = (selectedOption) => {
        setNewVaccine({ ...newVaccine, vaccineId: selectedOption?.value || '' });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateVaccinationForm(newVaccine, vaccinationOptions);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // Scroll to the top of the form to display errors
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        setErrors({});

        try {
            const selectedVaccine = vaccinationOptions.find(option => option.value === newVaccine.vaccineId);
            const vaccinations = await getVaccinations();
            const vaccination = vaccinations.find(v => v.id === selectedVaccine.value);

            if (!vaccination) {
                alert('Vaccination details not found. Please try again.');
                return;
            }

            const data = await addVaccinationRecordToPet(pet.id, selectedVaccine.value, newVaccine.date);
            setNewVaccine({ vaccineId: '', type: '', date: '' });

            const newRecord = {
                id: data.id,
                vaccination: {
                    id: vaccination.id,
                    name: vaccination.name,
                    type: vaccination.type,
                },
                date: newVaccine.date,
            };
            handleAddVaccination(newRecord);

            if (vaccination.type === 'FOR_PUPPY') {
                fetchVaccinationOptions();
            }

        } catch (error) {
            console.error('Failed to add vaccination record:', error);
            alert('Error adding vaccination record. Please try again.');
        }
    };

    useEffect(() => {
        fetchVaccinationOptions();
    }, [pet]);

    return (
        <div className={vacStyles.box} ref={formRef}>
            <h2 className={styles.title}>Add New Vaccination</h2>
            <ErrorMessage errors={errors} />
            <form onSubmit={handleFormSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="vaccineId">Vaccine Name:*</label>
                    <Select
                        id="vaccineId"
                        name="vaccineId"
                        options={vaccinationOptions}
                        value={vaccinationOptions.find(option => option.value === newVaccine.vaccineId) || null}
                        onChange={handleSelectChange}
                        isClearable
                        isLoading={isLoadingVaccines}
                        placeholder="Select or type a vaccine name..."
                        className={vacStyles.selectField}
                        styles={customStyles}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="date">Date:*</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        className={styles.inputField}
                        value={newVaccine.date}
                        onChange={handleNewVaccineChange}
                    />
                </div>

                <button type="submit" className={styles.actionButton}>Add Record</button>
            </form>
        </div>
    );
};

export default AddVaccinationForm;
