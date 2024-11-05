import React from 'react';
import { format, addYears } from 'date-fns';
import styles from './VaccineRecords.module.css';

const UpcomingVaccinesList = ({ upcomingVaccines }) => (
  <div className={styles.box}>
    <h2 className={styles.title}>Upcoming Vaccines</h2>
    <ul>
      {upcomingVaccines.map((record, index) => (
        <li key={index}>
          {record.vaccination.name} due by {format(addYears(new Date(record.date), record.vaccination.range), 'yyyy-MM-dd')}
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingVaccinesList;
