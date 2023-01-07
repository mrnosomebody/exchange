import {createContext} from 'react';
import axios from "axios";

export const AuthContext = createContext();

export const setAuthToken = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export const removeAuthToken = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => {
    return localStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('http://localhost:8001/api/token/refresh/', {
            refresh: refreshToken
        });
        const newAccessToken = res.data.access;
        setAuthToken(newAccessToken, refreshToken);
    } catch (err) {
        console.error(err);
    }
};