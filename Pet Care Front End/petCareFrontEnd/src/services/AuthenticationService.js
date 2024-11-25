import axios from "axios";
import TokenManager from "./TokenManager";
import { baseURL } from "../config.js";

const AuthenticationService = {
    login: (email, password) => axios.post(`${baseURL}/authentication/login`, { email, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken)),
    register: (name, email, address, password) => axios.post(`${baseURL}/authentication/signup`, { name, email, address, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken))
}

export default AuthenticationService;