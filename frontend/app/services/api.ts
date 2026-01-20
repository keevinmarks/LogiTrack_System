import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
    baseURL: "http://localhost:3000"
});

api.interceptors.request.use((config) => {
    const token = getCookie("token") as string;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;