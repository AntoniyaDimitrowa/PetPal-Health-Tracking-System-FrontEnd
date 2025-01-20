import axios from "axios";
import { baseURL } from "../config.js";
import TokenManager from "./TokenManager.jsx";

// Helper function to get current month and year
const getCurrentMonthYear = () => {
    const now = new Date();
    return {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    };
};

export const getHealthDataForCurrentMonth = async (petId) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        const { month, year } = getCurrentMonthYear();

        // Fetch health data for the pet for the current month
        const response = await axios.get(`${baseURL}/health/pets/${petId}/statistics`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                month,
                year,
            }
        });

        if (response && response.data) {
            // Organize the response data for charts
            const foodData = response.data.foodIntake.map(record => ({
                date: record.date,
                intake: record.intake,
                norm: record.norm,
            }));

            const waterData = response.data.waterIntake.map(record => ({
                date: record.date,
                intake: record.intake,
                norm: record.norm,
            }));

            const activityData = response.data.activityLevel.map(record => ({
                date: record.date,
                level: record.level,
                norm: record.norm,
            }));

            const moodData = response.data.moodDistribution.map(record => ({
                name: record.mood,
                value: record.value,
            }));

            return {
                foodData,
                waterData,
                activityData,
                moodData
            };
        } else {
            throw new Error("No health data found for the specified pet.");
        }
    } catch (error) {
        console.error("Error fetching health data:", error);
        throw error;
    }
};

export const getHealthRecordsByPetId = async (petId) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        // Fetch health data for the pet for the current month
        const response = await axios.get(`${baseURL}/health/pets/${petId}/records`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error("No health drecords found for the specified pet.");
        }
    } catch (error) {
        console.error("Error fetching health records for pet:", error);
        throw error;
    }
};