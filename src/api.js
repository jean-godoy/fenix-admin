import axios from 'axios';
import env from "react-dotenv";

const api = axios.create({
    // baseURL: env.REACT_APP_URL,
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://fenix-faccoes-api.herokuapp.com',
});

export default api;
