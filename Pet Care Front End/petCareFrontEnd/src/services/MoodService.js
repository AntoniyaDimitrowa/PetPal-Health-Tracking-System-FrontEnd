import axios from "axios";
import { baseURL } from "../config.js";
import TokenManager from "./TokenManager.jsx"; // Assuming this is where the token is managed

export const getMoods = async () => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        let response = await axios.get(baseURL + `/moods`, {
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
        console.error("Error fetching moods:", error);
        throw error; // Let the caller handle the error
    }
};

export const createMood = async (moodData) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }

        const response = await axios.post(baseURL + `/moods`, moodData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response && response.data) {
            console.log("Mood created successfully:", response.data);
            return response.data; // Return the created mood
        } else {
            console.error("No response data found.");
            throw new Error("No response data found.");
        }
    } catch (error) {
        console.error("Error creating mood:", error);
        throw error;
    }
};