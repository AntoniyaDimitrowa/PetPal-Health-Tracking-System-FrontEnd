import React from 'react';
import { format } from 'date-fns';
import styles from './VaccineRecords.module.css';

const VaccineRecordTable = ({ records, filters }) => {
  const { name, type, startDate, endDate } = filters;

  const filteredRecords = records.filter(record => {
    const matchesName = record.vaccination.name
      .toLowerCase()
      .includes(name.toLowerCase());
    const matchesType = type ? record.vaccination.type === type : true;
    const matchesDateRange =
      (!startDate || new Date(record.date) >= new Date(startDate)) &&
      (!endDate || new Date(record.date) <= new Date(endDate));

    return matchesName && matchesType && matchesDateRange;
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.recordsTable}>
        <thead>
          <tr>
            <th>Vaccine Name</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.vaccination.name}</td>
              <td>{format(new Date(record.date), 'yyyy-MM-dd')}</td>
              <td>{record.vaccination.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccineRecordTable;
