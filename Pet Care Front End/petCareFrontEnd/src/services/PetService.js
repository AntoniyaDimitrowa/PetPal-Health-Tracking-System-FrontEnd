import axios from "axios";

const baseURL = "http://localhost:8090";

export const addPet = async (pet) => {
    let response = await axios.post(baseURL + `/pets`, pet);
    if (response)
    {
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}

export const getPets = async () => {
    let response = await axios.get(baseURL + `/pets`);
    if (response)
    {
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}