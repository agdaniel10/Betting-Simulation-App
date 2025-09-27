import { useState, useCallback } from "react";
import axios from 'axios'
import useLocalStorage from "./useLocalStorage";

const API_BASE_URL =
    // import.meta.env.VITE_API_URL ||
    // process.env.REACT_APP_API_URL ||
    "http://localhost:3000";

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [authData, _setAuthData, removeAuthData] = useLocalStorage('betperfect_auth', null)

    const post = useCallback(
        async (endpoint, data, config = {}) => {
            setIsLoading(true)
            setMessage('')
            setError('')

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    ...config.headers
                };

                if (authData?.token) {
                    headers['Authorization'] = `Bearer ${authData.token}`
                }

                const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
                    headers,
                    ...config
                });
                
                setMessage(response.data.message || 'Request Successful');
                return response.data
            } catch(error) {
                const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Request failed'
                setError(errorMessage)
                
                if (error.response?.status === 401) {
                    removeAuthData();
                }
                
                throw error; 
            } finally {
                setIsLoading(false)
            }
        },
        [authData, removeAuthData]
    );

    const clearMessages = useCallback(() => {
        setMessage('')
        setError('');
    }, []);

    return { isLoading, message, error, post, clearMessages };
}

export default useApi;