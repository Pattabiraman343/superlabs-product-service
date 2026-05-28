import axios from "axios";

const API = axios.create({
    baseURL: "https://superlabs-product-service.onrender.com/api",});

export default API;