import axios from "axios";
import {baseURL} from "../config.js";

export const addPet = async (pet) => {
    try {
        const selectedVaccinationIds = Object.keys(pet.vaccinations)
            .filter(vaccineId => pet.vaccinations[vaccineId])
            .map(vaccineId => parseInt(vaccineId));

        const formattedData = {
            name: pet.name,
            breedId: parseInt(pet.breedId),
            gender: pet.gender.toUpperCase(),
            birthdate: new Date(pet.birthdate).toISOString().split('T')[0],
            weight: parseFloat(pet.weight),
            image: pet.image,
            vaccinationRecordsIds: selectedVaccinationIds,
            userId: pet.userId
        };

        let response = await axios.post(baseURL + `/pets`, formattedData);

        if (response && response.data) {
            console.log("Pet added successfully:", response.data);
            return response.data; // Return success response
        } else {
            console.error("No response data found.");
            throw new Error("No response data found."); // Ensure error propagation for unexpected responses
        }
    } catch (error) {
        console.error("Error adding pet:", error);
        throw error; // Let the caller handle the error
    }
};



export const getPets = async () => {
    let response = await axios.get(baseURL + `/pets`);
    if (response) {
        console.log(response.data)
        return response.data;
    }

    alert("Something went wrong");
    return "";
}

export const addVaccinationRecordToPet = async (petId, vaccinationId, date) => {
  try {
    const payload = {
      petId,
      vaccinationId,
      date,
    };
    const response = await axios.post(`${baseURL}/vaccinations`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding vaccination record:", error);
    throw error; // Let the caller handle errors
  }
};


export const updatePet = async (pet) => {
    try {
        const formattedData = {
            petId: pet,is,
            name: pet.name,
            breedId: parseInt(pet.breedId),
            gender: pet.gender.toUpperCase(),
            birthdate: new Date(pet.birthdate).toISOString().split('T')[0],
            weight: parseFloat(pet.weight),
            image: pet.image,
        };

        let response = await axios.put(baseURL + `/pets`, formattedData);

        if (response && response.data) {
            console.log("Pet updated successfully:", response.data);
            return response.data; // Return success response
        } else {
            console.error("No response data found.");
            throw new Error("No response data found."); // Ensure error propagation for unexpected responses
        }
    } catch (error) {
        console.error("Error updating pet:", error);
        throw error; // Let the caller handle the error
    }
};
