// src/components/VaccineRecordsPage/AddVaccinationForm.js

import React from 'react';
import styles from './Form.module.css';
import vacStyles from './AddVaccinationForm.module.css';

const AddVaccinationForm = ({ newVaccine, setNewVaccine, handleAddVaccination }) => {
  const handleNewVaccineChange = (event) => {
    const { name, value } = event.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newRecord = {
      vaccination: { name: newVaccine.name, type: newVaccine.type, range: 0 },
      date: new Date(newVaccine.date),
    };
    handleAddVaccination(newRecord);
    setNewVaccine({ name: '', type: '', date: '' });
  };

  return (
      <div className={vacStyles.box}>
        <h2 className={styles.title}>Add New Vaccination</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Vaccine Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              className={styles.inputField}
              value={newVaccine.name}
              onChange={handleNewVaccineChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              className={styles.dropdown}
              value={newVaccine.type}
              onChange={handleNewVaccineChange}
            >
              <option value="">Select Type</option>
              <option value="ForPuppy">For Puppy</option>
              <option value="ForAdult">For Adult</option>
            </select>
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
