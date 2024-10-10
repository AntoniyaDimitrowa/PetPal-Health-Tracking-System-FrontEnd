import axios from "axios";

const baseURL = "http://localhost:8090";

export const getBreeds = async () => {
    let response = await axios.get(baseURL + `/breeds`);
    if (response)
    {
        console.log(response.data)
        return response.data;
    }

    alert ("Something went wrong");
    return "";
}