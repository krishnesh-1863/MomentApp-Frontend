import axios from "axios";

const api = axios.create({
    baseURL: "https://moment-maker-backend.onrender.com", // apna backend port
    withCredentials: true
});

export default api;