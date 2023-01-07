import axios from 'axios';

export const login = (email, password) => {
    return axios.post('http://localhost:8001/api/token/', {
        email,
        password
    });
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
};