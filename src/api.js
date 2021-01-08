import axios from 'axios';

const api = axios.create({
    baseURL: 'http://fenix-faccoes.herokuapp.com/',
});

export default api;
