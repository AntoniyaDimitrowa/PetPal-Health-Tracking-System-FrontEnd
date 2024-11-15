import axios from "axios";
import {baseURL} from "../config.js";

export const getBreeds = async () => {
    let response = await axios.get(baseURL + `/breeds`);
    if (response)
    {
        //debugger;
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}