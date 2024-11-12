import React from 'react';
import { format, addYears } from 'date-fns';
import styles from './VaccineRecords.module.css';

const UpcomingVaccinesList = ({ upcomingVaccines }) => (
  <div className={styles.box}>
    <h2 className={styles.title}>Upcoming Vaccines</h2>
    <ul>
      {upcomingVaccines.map((record, index) => (
        <li key={index}>
          <p>
          {record.vaccination.name}
          </p>
           <p>
           {format(new Date(record.dueDate), 'yyyy-MM-dd')}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingVaccinesList;
