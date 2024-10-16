import axios from "axios";
import {baseURL} from "../config.js";

export const addPet = async (pet) => {
    const selectedVaccinationIds = Object.keys(pet.vaccinations)
        .filter(vaccineId => pet.vaccinations[vaccineId])
        .map(vaccineId => parseInt(vaccineId));

    const formattedGender = pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1).toLowerCase();

    const formattedBirthdate = new Date(pet.birthdate).toISOString().split('T')[0];

    const formattedData = {
        name: pet.name,  
        breedId: parseInt(pet.breedId),  
        gender: formattedGender,  
        birthdate: formattedBirthdate,  
        weight: parseFloat(pet.weight), 
        image: pet.image,  
        vaccinationRecordsIds: selectedVaccinationIds,  
    };

    try {
        let response = await axios.post(baseURL + `/pets`, formattedData);
        if (response) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Error adding pet:", error);
        throw error;
    }

    alert("Something went wrong");
    return "";
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