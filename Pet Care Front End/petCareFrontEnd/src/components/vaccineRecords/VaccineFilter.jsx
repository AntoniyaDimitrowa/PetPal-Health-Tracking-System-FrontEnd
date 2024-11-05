import React from 'react';
import styles from './VaccineRecords.module.css';

const VaccineFilter = ({ filterType, setFilterType }) => {
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className={styles.vaccineFilter}>
      <label>
        Filter by Type:
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="ForPuppy">For Puppy</option>
          <option value="ForAdult">For Adult</option>
        </select>
      </label>
    </div>
  );
};

export default VaccineFilter;
