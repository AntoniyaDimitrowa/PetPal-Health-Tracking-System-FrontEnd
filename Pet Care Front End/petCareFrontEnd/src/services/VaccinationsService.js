import axios from "axios";
import {baseURL} from "../config.js";

export const getVaccinations = async () => {
    let response = await axios.get(baseURL + `/vaccinations`);
    if (response)
    {
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
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
    console.log(pet);
  
    const allVaccinations = await getVaccinations();
    const vaccinationRecords = pet.vaccinationRecords || [];
    const petBirthDate = new Date(pet.birthdate); // Parse birthdate into a Date object
  
    if (isNaN(petBirthDate.getTime())) {
      console.error(`Invalid birthdate: ${pet.birthdate}`);
      return []; // Return an empty array if the birthdate is invalid
    }
  
    const upcomingVaccines = [];
  
    for (const vaccination of allVaccinations) {
      if (vaccination.type === "FOR_PUPPY") {
        // Handle puppy vaccines
        const minAgeWeeks = vaccination.range;
        const minAgeDate = new Date(petBirthDate); // Clone birthDate to calculate the puppy vaccine date
        minAgeDate.setDate(minAgeDate.getDate() + minAgeWeeks * 7); // Add the range in weeks to the birth date
  
        if (isNaN(minAgeDate.getTime())) {
          console.error(`Invalid date for puppy vaccine: ${vaccination.name}`);
          continue; // Skip this vaccination if date calculation fails
        }
  
        upcomingVaccines.push({
          vaccination,
          dueDate: minAgeDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        });
      } else if (vaccination.type === "FOR_ADULT") {
        // Handle adult vaccines
        const correspondingPuppyVaccination = allVaccinations.find(
          (v) => v.name === vaccination.name + "3" && v.type === "FOR_PUPPY"
        );
  
        if (correspondingPuppyVaccination) {
          // Find the latest completed vaccine record for the corresponding puppy vaccine
          const latestPuppyVaccineRecord = vaccinationRecords
            .filter(
              (record) =>
                record.vaccination.id === correspondingPuppyVaccination?.id
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
          console.log(latestPuppyVaccineRecord);
  
          if (latestPuppyVaccineRecord) {
            const firstAdultDueDate = new Date(latestPuppyVaccineRecord.date);
            console.log(firstAdultDueDate);
            firstAdultDueDate.setFullYear(
              firstAdultDueDate.getFullYear() + vaccination.range
            );
            console.log(firstAdultDueDate);
  
            if (isNaN(firstAdultDueDate.getTime())) {
              console.error(
                `Invalid date for adult vaccine: ${vaccination.name}`
              );
              continue; // Skip this vaccine if date calculation fails
            }
  
            upcomingVaccines.push({
              vaccination,
              dueDate: firstAdultDueDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
            });
          }
        }
      }
    }
  
    // Sort by dueDate in ascending order
    upcomingVaccines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
    // Return the top 5 nearest upcoming vaccinations
    const top5Vaccines = upcomingVaccines.slice(0, 5);
  
    console.log(top5Vaccines);
  
    return top5Vaccines;
  };
  