import axios from "axios";
import { baseURL } from "../config.js";

export const getVaccinations = async () => {
  let response = await axios.get(baseURL + `/vaccinations`);
  if (response) {
    console.log(response.data)
    return response.data;
  }

  alert("Something went wrong");
  return "";
}

export const getVaccinationsForPuppy = async () => {
  let response = await axios.get(baseURL + `/vaccinations`);
  if (response) {
    // Filter vaccinations by type "ForPuppy"
    const filteredVaccinations = response.data.filter(vaccination => vaccination.type === "FOR_PUPPY");
    return filteredVaccinations;
  }

  alert("Something went wrong");
  return [];
};

export const calculateVaccinationOptions = async (pet) => {
  const allVaccinations = await getVaccinations();
  const vaccinationRecords = pet.vaccinationRecords || [];

  const administeredVaccineIds = vaccinationRecords.map(record => record.vaccination?.id);

  const vaccinationOptions = allVaccinations.filter(vaccine => {
    if (vaccine.type === "FOR_PUPPY") {
      return !administeredVaccineIds.includes(vaccine.id);
    } else if (vaccine.type === "FOR_ADULT") {
      return true;
    }
    return false;
  });

  return vaccinationOptions.map(vaccine => ({
    value: vaccine.id,
    label: vaccine.type === "FOR_PUPPY"
      ? `${vaccine.name} (${vaccine.range} weeks old)`
      : vaccine.name,
  }));
};



export const calculateUpcomingVaccines = async (pet) => {
  const filteredVaccines = await calculateVaccinationOptions(pet);

  const filteredIds = filteredVaccines.map(vaccine => {
    return vaccine.value;
  });

  const allVaccinations = await getVaccinations();

  const relevantVaccines = allVaccinations.filter(vaccination => {
    return filteredIds.includes(vaccination.id);
  });


  const vaccinationRecords = pet.vaccinationRecords || [];
  const petBirthDate = new Date(pet.birthdate);

  if (isNaN(petBirthDate.getTime())) {
    console.error(`Invalid birthdate: ${pet.birthdate}`);
    return [];
  }

  const upcomingVaccines = [];

  // Separate vaccines into puppy and adult lists
  const puppyVaccines = relevantVaccines.filter(vaccine => vaccine.type === "FOR_PUPPY");
  const adultVaccines = relevantVaccines.filter(vaccine => vaccine.type === "FOR_ADULT");

  // Handle puppy vaccines
  for (const vaccination of puppyVaccines) {
    const minAgeWeeks = vaccination.range;
    const dueDate = new Date(petBirthDate);
    dueDate.setDate(dueDate.getDate() + minAgeWeeks * 7);

    if (!isNaN(dueDate.getTime())) {
      upcomingVaccines.push({
        vaccination,
        dueDate: dueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      });
    } else {
      console.error(`Invalid date for puppy vaccine: ${vaccination.name}`);
    }
  }


  // Handle adult vaccines
  for (const vaccination of adultVaccines) {
    // Check if there is already a record for this adult vaccine
    const existingAdultRecord = vaccinationRecords
      .filter(record => record.vaccination?.id === vaccination.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (existingAdultRecord) {
      // Calculate due date based on the last record
      const dueDate = new Date(existingAdultRecord.date);
      dueDate.setFullYear(dueDate.getFullYear() + vaccination.range);

      if (!isNaN(dueDate.getTime())) {
        upcomingVaccines.push({
          vaccination,
          dueDate: dueDate.toISOString().split("T")[0],
        });
      } else {
        console.error(`Invalid date for adult vaccine: ${vaccination.name}`);
      }

    } else {
      const latestPuppyRecord = vaccinationRecords
        .filter(record => (record.vaccination.name === vaccination.name && record.vaccination.type === "FOR_PUPPY") || (record.vaccination.name === (vaccination.name + "3") && record.vaccination.type === "FOR_PUPPY"))
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

      if (latestPuppyRecord) {
        // Calculate the first adult vaccine's due date
        const dueDate = new Date(latestPuppyRecord.date);
        dueDate.setFullYear(dueDate.getFullYear() + vaccination.range);

        if (!isNaN(dueDate.getTime())) {
          upcomingVaccines.push({
            vaccination,
            dueDate: dueDate.toISOString().split("T")[0],
          });
        } else {
          console.error(`Invalid date for adult vaccine: ${vaccination.name}`);
        }
      }

    }
  }

  // Sort by dueDate in ascending order
  upcomingVaccines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Return the top 5 nearest upcoming vaccinations
  return upcomingVaccines.slice(0, 5);
};

