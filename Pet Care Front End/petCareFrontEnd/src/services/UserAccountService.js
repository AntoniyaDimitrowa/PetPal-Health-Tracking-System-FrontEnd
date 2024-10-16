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