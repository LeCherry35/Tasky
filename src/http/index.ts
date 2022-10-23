import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
export const API_URL = 'https://tasky-server35.herokuapp.com/api'
// export const API_URL = 'http://localhost:5000/api'


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status == 401 && error.config && !error.config.isRetry ) {
        originalRequest.isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch {
            console.log('User is not authorized');
        }
    }
    throw error
})
export default $api