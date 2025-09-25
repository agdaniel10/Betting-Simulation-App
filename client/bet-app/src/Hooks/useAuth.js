import useApi from "./useApi";
import { useNavigate } from 'react-router-dom';

const AuthService = () => {
    const { isLoading, message, error, post, clearMessages } = useApi();
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
            console.log('Success Message:', message);

            // Redirect to verify-email url
            navigate('/verify-email', {
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
            console.log('Success Message:', message);

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

            console.log('Login successful:', result);
            
            // Handle successful login - set auth data here
            setAuthData({
                user: result.data.user,
                token: result.token,
                isAuthenticated: true
            });

            navigate('/home');

        } catch(err) {
            console.error('Login failed:', error);
            console.error('Error during login:', err.message);
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
            navigate('/login');

        } catch(err) {
            console.error('Error during password reset:', error);
            console.error('Password reset error:', err.message);
        }
    };

    
    return {
        isLoading,
        message,
        error,
        clearMessages,
        handleRegister,
        handleVerifyUser,
        handleUserLogin,
        handleForgotPassword,
        handleResetPassword
    };
};

export default AuthService;