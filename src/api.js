import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.fenix-faccoes.herokuapp.com',
});

export default api;
