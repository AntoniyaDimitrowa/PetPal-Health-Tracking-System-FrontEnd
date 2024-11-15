import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { calculateVaccinationOptions, getVaccinations } from '../../services/VaccinationsService';
import { addVaccinationRecordToPet } from '../../services/PetService';
import styles from './Form.module.css';
import vacStyles from './AddVaccinationForm.module.css';
import customStyles from './CustomStyles';

const AddVaccinationForm = ({ newVaccine, setNewVaccine, pet, handleAddVaccination }) => {
  const [vaccinationOptions, setVaccinationOptions] = useState([]);
  const [isLoadingVaccines, setIsLoadingVaccines] = useState(true);

  // Fetch vaccination options and update state
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

  // Handle changes to form inputs
  const handleNewVaccineChange = (event) => {
    const { name, value } = event.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setNewVaccine({ ...newVaccine, vaccineId: selectedOption?.value || '' });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const selectedVaccine = vaccinationOptions.find((v) => v.value === newVaccine.vaccineId);

    const vaccinations = await getVaccinations();
    const vaccination = vaccinations.find((v) => v.id === selectedVaccine.value);

    if (!vaccination) {
      alert('Vaccination details not found. Please try again.');
      return;
    }

    const newRecord = {
      vaccination: {
        name: vaccination.name,
        type: vaccination.type,
      },
      date: newVaccine.date,
    };

    try {
      await addVaccinationRecordToPet(pet.id, selectedVaccine.value, newVaccine.date);
      
      // Reset the form fields
      setNewVaccine({ vaccineId: '', type: '', date: '' });
      
      handleAddVaccination(newRecord);

      // Recalculate options only if the added vaccine type is "FOR_PUPPY"
      if (vaccination.type === 'FOR_PUPPY') {
        fetchVaccinationOptions();
      }

    } catch (error) {
      console.error('Failed to add vaccination record:', error);
      alert('Error adding vaccination record. Please try again.');
    }
  };

  // Fetch vaccination options when the pet changes
  useEffect(() => {
    fetchVaccinationOptions();
  }, [pet]);

  return (
    <div className={vacStyles.box}>
      <h2 className={styles.title}>Add New Vaccination</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="vaccineId">
            Vaccine Name:
          </label>
          <Select
            id="vaccineId"
            name="vaccineId"
            options={vaccinationOptions}
            value={vaccinationOptions.find((option) => option.value === newVaccine.vaccineId) || null}
            onChange={handleSelectChange}
            isClearable
            isLoading={isLoadingVaccines}
            placeholder="Select or type a vaccine name..."
            className={vacStyles.selectField}
            styles={customStyles}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="date">
            Date:
          </label>
          <input
            id="date"
            type="date"
            name="date"
            className={styles.inputField}
            value={newVaccine.date}
            onChange={handleNewVaccineChange}
          />
        </div>

        <button type="submit" className={styles.actionButton}>
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddVaccinationForm;
