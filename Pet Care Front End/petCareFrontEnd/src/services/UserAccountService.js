import axios from "axios";
import {baseURL} from "../config.js";

export const getAccount = async (id) => {
    let response = await axios.get(baseURL + `/users/` + id);
    if (response)
    {   
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}

export const updateAccount = async (id, updatedData) => {
    try {
        const response = await axios.put(`${baseURL}/users/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating account:", error);
        return null;
    }
};