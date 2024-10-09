import axios from "axios";

const baseURL = "http://localhost:8080";

export const getAccount = async (id) => {
    let response = await axios.get(baseURL + `/users/` + id);
    if (response)
    {   
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}