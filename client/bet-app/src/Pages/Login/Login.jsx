import React, { useState } from "react";
import './Login.css'
import { NavLink } from "react-router-dom";
import AuthService from "../../Hooks/useAuth";

const Login = ({isOpen, onClose}) => {

    if (!isOpen) return null

    const {
        isLoading,
        message,
        error,
        clearMessages,
        handleUserLogin
    } = AuthService()

    const [formData, setFormData] = useState({
        emailOrPhone: '', 
        password: ''
    })

    const handleChange = (e) => {
        
        const { name, value} = e.target
        setFormData((prev) => ({
            ...prev, [name] : value
        }))
    }

    const [click, setClick] = useState(false)

    const handlePasswordView = () => {
        setClick(!click)
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        clearMessages()

        if (!formData.emailOrPhone || !formData.password) {
            alert('All fields are required')
            return 
        }

        const isEmail = formData.emailOrPhone.includes('@')

        const loginData = {
            password: formData.password,
            ...(isEmail
                    ? {email: formData.emailOrPhone}
                    : {phoneNumber: formData.emailOrPhone}
            )
        }

        // handle form submission
        await handleUserLogin(loginData)


    }

    return (

        <div className="login-backdrop">
            <div className="login-container">

                <div className="remove-page">
                    <button onClick={onClose} className="remove-page"><ion-icon name="close-outline"></ion-icon></button>
                </div>
                <div className="login-header">
                    <h1>Login</h1>
                </div>

                    
                    {isLoading && <div className='loading-message'><p>Logging in...</p></div>}
                    {message && <div className='success-message'><p>{message}</p></div>}
                    {error && <div className='error-message'><p>{error}</p></div>}

                <form onSubmit={handleLoginSubmit} className="login-form">
                    <div className="form-group-Login">
                        <label htmlFor="emailOrPhone">Email or Phone Number</label>
                        <input 
                            type="text"
                            name="emailOrPhone"
                            placeholder="Enter Email or Phone Number"
                            disabled={isLoading}
                            value={formData.emailOrPhone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group-Login password">
                        <label htmlFor="password">Password</label>
                        <input 
                            type={click ? 'text' : "password"}
                            id='email or phoneNumber'
                            placeholder="Password"
                            name="password"
                            className="password-input"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            className="password-btn"
                            onClick={handlePasswordView}
                        >
                            {click ? (
                                <ion-icon name="eye-outline"></ion-icon>
                            ): (
                                <ion-icon name="eye-off-outline"></ion-icon>
                            )}

                        </button>
                    </div>

                    <div className="forgot-password-container">
                        <p className="forgot-password-link">
                            <NavLink
                                to={'/forgotpassword'}
                            >
                                Forgot Password? 
                            </NavLink>
                        </p>
                    </div>

                    <button 
                        type='submit' 
                        className="login-btn" 
                        disabled={isLoading}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login