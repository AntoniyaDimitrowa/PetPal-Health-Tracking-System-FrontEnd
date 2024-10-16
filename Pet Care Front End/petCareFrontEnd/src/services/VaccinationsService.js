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
        const filteredVaccinations = response.data.filter(vaccination => vaccination.type === "ForPuppy");
        return filteredVaccinations;
    }

    alert("Something went wrong");
    return [];
};