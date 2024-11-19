import React from 'react';
import DailyUpdateForm from '../components/forms/healthRecord/DailyUpdateForm';
import { usePet } from '../context/PetContext';

function DailyUpdate() {
  const { pet, setPet } = usePet(); // Access the selected pet from context

  return <DailyUpdateForm pet={pet}/>;
}

export default DailyUpdate;
