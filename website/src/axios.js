import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

// in principe kunnen we dit telkens opnieuw gebruiken
export default axios.create({
   baseURL: BASE_URL
});


export const axiosPrivate = axios.create({
   baseURL: BASE_URL,
   headers:{'Content-Type': 'application/json'},
   withCredentials: true
});