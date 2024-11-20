import axios from "axios";
import {baseURL} from "../config.js";

export const getMoods = async () => {
    let response = await axios.get(baseURL + `/moods`);
    if (response)
    {
        //debugger;
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}