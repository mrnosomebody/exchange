import axios from "axios";

export const API_URL = `http://localhost:8001/`

const $api = axios.create({
        withCredentials: true,
        baseURL: API_URL
    }
)

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            let refresh = localStorage.getItem('refreshToken')
            const response = await axios.post(
                `${API_URL}api/token/refresh/`,
                {refresh}
            )
            localStorage.setItem('accessToken', response.data.access)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Unauth')
        }
    }
    throw error
})

export default $api