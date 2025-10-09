import { useState, createContext, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/auth/getMe`,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.status === 'success') {
                    setIsAuthenticated(true);
                    setUser(response.data.data.user);
                }

            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);

            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);


    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = async () => {
        const token = localStorage.getItem('token');

        try {
            if (token) {
                await axios.post(
                    `${API_BASE_URL}/api/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

        } catch(error) {
            console.error('Logout Error:', error);

        } finally {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};