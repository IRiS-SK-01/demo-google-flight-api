import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    },
});

export default apiClient;