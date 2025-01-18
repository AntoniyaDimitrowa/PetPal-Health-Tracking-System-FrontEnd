import axios from "axios";
import {baseURL} from "../config.js";
import TokenManager from "./TokenManager.jsx";

export const getAccount = async (id) => {
    const token = TokenManager.getAccessToken(); // Retrieve the raw JWT
    if (!token) {
      throw new Error("Token is missing");
    }
    const response = await fetch(`${baseURL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch account: ${response.statusText}`);
    }
    return response.json();
  };
  

  export const updateAccount = async (id, updatedData, withPassword = false) => {
    const token = TokenManager.getAccessToken();
    if (!token) {
        throw new Error("Token is missing");
    }

    const endpoint = withPassword ? `${baseURL}/users/${id}/secure` : `${baseURL}/users/${id}/basic`;

    const response = await axios.put(endpoint, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};
