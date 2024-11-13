import React, { useState } from 'react';
import styles from './VaccineRecords.module.css';
import formStyles from '../forms/Form.module.css';

const VaccineFilter = ({ filters, setFilters }) => {
  const { name, type, startDate, endDate } = filters;

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className={styles.filters}>
      <input
        className={formStyles.inputField}
        type="text"
        placeholder="Filter by name"
        value={name}
        onChange={e => handleChange('name', e.target.value)}
      />
      <select className={formStyles.dropdown} value={type} onChange={e => handleChange('type', e.target.value)}>
        <option value="">All Types</option>
        <option value="FOR_PUPPY">Puppy Vaccines</option>
        <option value="FOR_ADULT">Adult Vaccines</option>
      </select>
      <input
        className={formStyles.inputField}
        type="date"
        value={startDate}
        onChange={e => handleChange('startDate', e.target.value)}
      />
      <input
        className={formStyles.inputField}
        type="date"
        value={endDate}
        onChange={e => handleChange('endDate', e.target.value)}
      />
    </div>
  );
};

export default VaccineFilter;
