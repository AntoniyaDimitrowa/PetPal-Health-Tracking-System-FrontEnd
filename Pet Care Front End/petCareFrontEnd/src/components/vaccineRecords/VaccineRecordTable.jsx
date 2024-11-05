import React from 'react';
import { format } from 'date-fns';
import styles from './VaccineRecords.module.css';

const VaccineRecordTable = ({ records, filterType }) => {
  const filteredRecords = records.filter(record => 
    filterType ? record.vaccination.type === filterType : true
  );

  return (
    <table className={styles.recordsTable}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Vaccine Name</th>
          <th>Type</th>
          <th>Range</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecords.map((record, index) => (
          <tr key={index}>
            <td>{format(new Date(record.date), 'yyyy-MM-dd')}</td>
            <td>{record.vaccination.name}</td>
            <td>{record.vaccination.type}</td>
            <td>{record.vaccination.range}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VaccineRecordTable;
