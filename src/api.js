import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fenix-faccoes.herokuapp.com',
});

export default api;
