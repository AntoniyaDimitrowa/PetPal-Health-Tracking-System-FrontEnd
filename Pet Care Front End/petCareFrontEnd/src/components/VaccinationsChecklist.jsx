import React from 'react';
import styles from './VaccinationsChecklist.module.css';

function VaccinationsChecklist({ vaccinationOptions, petData, handleChange }) {
    return (
        <div className={styles.vaccinationGroup}>
            <label>Vaccinations:</label>
            <div className={styles.checkboxGroup}>
                {vaccinationOptions.map((vaccine) => (
                    <label key={vaccine.id}>
                        <input
                            type="checkbox"
                            name={vaccine.id}
                            checked={petData.vaccinations[vaccine.id] || false}
                            onChange={handleChange}
                        />
                        {vaccine.name} ({vaccine.range} weeks)
                    </label>
                ))}
            </div>
        </div>
    );
}

export default VaccinationsChecklist;
