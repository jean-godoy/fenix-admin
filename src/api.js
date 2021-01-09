import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fenix-faccoes.herokuapp.com',
    // baseURL: 'http://localhost:8000',
});

export default api;
