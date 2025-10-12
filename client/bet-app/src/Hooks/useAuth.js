import useApi from "./useApi";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { useContext } from "react";

const AuthService = () => {
    const { isLoading, message, error, post, clearMessages } = useApi();
    const [authData, setAuthData, removeAuthData] = useLocalStorage('betperfect_auth', null);
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    // Register User 
    const handleRegister = async (formData) => {
        try {
            const result = await post('/api/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password
            });

            console.log('Verification code sent to your email:', result);

            // Redirect to verify-email url
            navigate('/verifyemail', {
                state: { email: formData.email }
            });

        } catch(err) {
            console.error('Registration failed:', error);
            console.error('Error during registration:', err.message);
        }
    };

    // Verify User
    const handleVerifyUser = async (formData) => {
        try {
            const result = await post('/api/auth/verifyemail', {
                email: formData.email,
                verificationCode: formData.verificationCode
            });

            console.log('User verification successful:', result);

            // Save auth data after verification
            const { token, data } = result;
            
            if (token && data?.user) {
                setAuthData({
                    token: token,
                    user: data.user,
                    isAuthenticated: true
                });
            }

            navigate('/login');

        } catch(err) {
            console.error('Verification failed:', error);
            console.error('Error during verification:', err.message);
        }
    };

    // User login 
    const handleUserLogin = async (formData) => {
        try {
            const result = await post('/api/auth/login', {
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password
            });

            console.log('Login result:', result);

            const { token, data } = result;

            login(token, data.user)
            
            if (token && data?.user) {
                // Save to localStorage
                setAuthData({
                    token: token,
                    user: data.user,
                    isAuthenticated: true
                });

                console.log('Token saved successfully');
                navigate('/');
            } else {
                console.error('Invalid response structure:', result);
            }

        } catch(err) {
            console.error('Login failed:', error);
            console.error('Error during login:', err.message);
        }
    };

    // User logout
    const handleLogout = async () => {
        try {
            await post('/api/auth/logout');
            removeAuthData(); // Clear localStorage
            navigate('/login');
        } catch(err) {
            // Even if logout fails, clear local data
            removeAuthData();
            navigate('/login');
        }
    };

    // User forgot password
    const handleForgotPassword = async (formData) => {
        try {
            const result = await post('/api/auth/forgotpassword', {
                email: formData.email
            });

            console.log('Reset code sent successfully:', result);
            
            navigate('/reset-password', {
                state: { email: formData.email }
            });

        } catch(err) {
            console.error('Error sending reset code:', error);
            console.error('Error during forgot password:', err.message);
        }
    };

    // Handle Reset Password
    const handleResetPassword = async (formData) => {
        try {
            const result = await post('/api/auth/resetpassword', {
                email: formData.email,
                resetCode: formData.resetCode,
                newPassword: formData.newPassword
            });

            console.log('Password reset successful:', result);
            
            // Optionally auto-login after password reset
            const { token, data } = result;
            
            if (token && data?.user) {
                setAuthData({
                    token: token,
                    user: data.user,
                    isAuthenticated: true
                });
            }
            
            navigate('/login');

        } catch(err) {
            console.error('Error during password reset:', error);
            console.error('Password reset error:', err.message);
        }
    };

    // Return all functions and states for use in components
    return {
        isLoading,
        message,
        error,
        clearMessages,
        authData,
        handleRegister,
        handleVerifyUser,
        handleUserLogin,
        handleLogout,
        handleForgotPassword,
        handleResetPassword
    };
};

export default AuthService;