import axios from "axios";

const API = axios.create({
    baseURL: "https://smart-resume-analyzer-backend-teyp.onrender.com/api/candidates"
});

export default API;
