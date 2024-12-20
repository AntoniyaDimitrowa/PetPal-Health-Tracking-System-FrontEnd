import React, { useState, useEffect } from 'react';
import styles from './VaccinationsChecklist.module.css';

function VaccinationsChecklist({ vaccinationOptions, petData, handleChange }) {
    const [selectAll, setSelectAll] = useState(false);

    const groupedVaccines = vaccinationOptions.reduce((groups, vaccine) => {
        const categoryName = vaccine.name.match(/^\D+/)[0];
        if (!groups[categoryName]) {
            groups[categoryName] = [];
        }
        groups[categoryName].push(vaccine);
        return groups;
    }, {});

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const updatedVaccinations = {};
        vaccinationOptions.forEach((vaccine) => {
            updatedVaccinations[vaccine.id] = newSelectAll;
        });

        handleChange({ target: { name: 'vaccinations', value: updatedVaccinations } });
    };

    useEffect(() => {
        const allSelected = vaccinationOptions.every(
            (vaccine) => petData.vaccinations[vaccine.id]
        );
        setSelectAll(allSelected);
    }, [petData.vaccinations, vaccinationOptions]);

    return (
        <div className={styles.vaccinationGroup}>
            <label>Vaccinations:</label>
            <label>
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                />
                {selectAll ? 'Deselect All' : 'Select All'}
            </label>
            <div className={styles.checkboxGroup}>

                {Object.keys(groupedVaccines).map((category) => (
                    <div key={category} className={styles.categoryColumn}>
                        {groupedVaccines[category].map((vaccine) => (
                            <label key={vaccine.id}>
                                <input
                                    type="checkbox"
                                    name={vaccine.id}
                                    checked={petData.vaccinations[vaccine.id] || false}
                                    onChange={handleChange}
                                    data-cy={`vaccination-checkbox-${vaccine.id}`}
                                />
                                {vaccine.name} ({vaccine.range} weeks)
                            </label>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VaccinationsChecklist;
