import axios from 'axios';
import env from "react-dotenv";

const api = axios.create({
    baseURL:  env.REACT_APP_URL
});

export default api;
