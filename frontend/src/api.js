import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const generateQR = (jwtToken) => axios.get(`${API_URL}/qr/generateQR`,{headers:{'Authorization':`Bearer ${jwtToken}`}});