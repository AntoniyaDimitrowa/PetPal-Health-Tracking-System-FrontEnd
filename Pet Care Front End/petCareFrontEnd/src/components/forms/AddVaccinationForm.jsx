import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import { calculateVaccinationOptions } from '../../services/VaccinationsService';
import styles from './Form.module.css';
import vacStyles from './AddVaccinationForm.module.css';
import customStyles from './CustomStyles';

const AddVaccinationForm = ({ newVaccine, setNewVaccine, handleAddVaccination, pet }) => {
  const [vaccinationOptions, setVaccinationOptions] = useState([]);
  const [isLoadingVaccines, setIsLoadingVaccines] = useState(true);

  // Handle changes to form inputs
  const handleNewVaccineChange = (event) => {
    const { name, value } = event.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setNewVaccine({ ...newVaccine, vaccineId: selectedOption?.value || '' }); // Store vaccineId
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedVaccine = vaccinationOptions.find(v => v.id === newVaccine.vaccineId); // Match by vaccineId

    if (!selectedVaccine) {
      alert("Please select a valid vaccine.");
      return;
    }

    const newRecord = {
      vaccinationId: selectedVaccine.id, // Use vaccineId
      date: new Date(newVaccine.date),
    };

    handleAddVaccination(newRecord);
    setNewVaccine({ vaccineId: '', type: '', date: '' });
  };

  useEffect(() => {
    const fetchVaccinations = async () => {
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

    fetchVaccinations();
  }, [pet]);

  return (
    <div className={vacStyles.box}>
      <h2 className={styles.title}>Add New Vaccination</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="vaccineId">Vaccine Name:</label>
          <Select
            id="vaccineId"
            name="vaccineId"
            options={vaccinationOptions}
            value={vaccinationOptions.find((option) => option.value === newVaccine.vaccineId) || null} // Bind value by vaccineId
            onChange={handleSelectChange}
            isClearable
            isLoading={isLoadingVaccines}
            placeholder="Select or type a vaccine name..."
            className={vacStyles.selectField}
            styles={customStyles}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="date">Date:</label>
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
