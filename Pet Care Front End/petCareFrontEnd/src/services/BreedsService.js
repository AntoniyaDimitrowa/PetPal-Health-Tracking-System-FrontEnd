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