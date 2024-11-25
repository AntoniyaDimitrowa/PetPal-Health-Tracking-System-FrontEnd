import axios from "axios";
import { baseURL } from "../config.js";
import TokenManager from "./TokenManager.jsx";

export const addPet = async (pet) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

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

        let response = await axios.post(baseURL + `/pets`, formattedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

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
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        let response = await axios.get(baseURL + `/pets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response) {
            console.log(response.data);
            return response.data;
        }

        alert("Something went wrong");
        return "";
    } catch (error) {
        console.error("Error fetching pets:", error);
        throw error;
    }
};

export const addVaccinationRecordToPet = async (petId, vaccinationId, date) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        const payload = {
            petId,
            vaccinationId,
            date,
        };

        const response = await axios.post(`${baseURL}/vaccinations`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding vaccination record:", error);
        throw error; // Let the caller handle errors
    }
};



export const updatePet = async (pet) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        console.log(token);
        const formattedData = {
            id: pet.id,
            name: pet.name,
            breedId: parseInt(pet.breedId),
            gender: pet.gender.toUpperCase(),
            birthdate: new Date(pet.birthdate).toISOString().split('T')[0],
            weight: parseFloat(pet.weight),
            image: pet.image,
        };

        let response = await axios.put(baseURL + `/pets`, formattedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

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

export const addHealthRecordToPet = async (petId, healthRecord) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        const payload = {
            date: new Date(),
            foodIntake: healthRecord.foodIntake,
            waterIntake: healthRecord.waterIntake,
            moodId: healthRecord.moodId,
            activityLevel: healthRecord.activityLevel,
            socialInteraction: healthRecord.socialInteraction,
            notes: healthRecord.notes,
        };

        const response = await axios.post(`${baseURL}/health/pets/${petId}/records`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding health record:", error);
        throw error; // Let the caller handle errors
    }
};
