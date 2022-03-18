import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-psi-geadv.herokuapp.com/',
})

export default api;