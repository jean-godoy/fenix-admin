import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/fenix_backend',
});

export default api;