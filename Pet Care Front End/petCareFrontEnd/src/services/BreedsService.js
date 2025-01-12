import axios from "axios";
import {baseURL} from "../config.js";
import TokenManager from "./TokenManager.jsx";

export const getBreeds = async () => {
    const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
    if (!token) {
      throw new Error("Token is missing");
    }
    let response = await axios.get(baseURL + `/breeds`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    if (response)
    {
        //debugger;
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}

export const createBreed = async (breedData) => {
  try {
      const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
      if (!token) {
          throw new Error("Token is missing");
      }

      const response = await axios.post(baseURL + `/breeds`, breedData, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      });

      if (response && response.data) {
          console.log("Breed created successfully:", response.data);
          return response.data; // Return the created breed
      } else {
          console.error("No response data found.");
          throw new Error("No response data found."); // Ensure error propagation for unexpected responses
      }
  } catch (error) {
      console.error("Error creating breed:", error);
      throw error; // Let the caller handle the error
  }
};

export const createBreedHealthInfo = async (breedHealthInfoData) => {
    try {
        const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
        if (!token) {
            throw new Error("Token is missing");
        }
        const response = await axios.post(`${baseURL}/health/breeds/${breedHealthInfoData.breedId}/health`, breedHealthInfoData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response && response.status === 201) {
            console.log("Breed Health Info created successfully:", response.data);
            return response.data; // Return created data if needed
        } else {
            throw new Error("Unexpected response status: " + response.status);
        }
    } catch (error) {
        console.error("Error creating Breed Health Info:", error);
        throw error; // Let the caller handle the error
    }
};
