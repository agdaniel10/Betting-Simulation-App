import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './Register.css'
import AuthService from '../../Hooks/useAuth';

const Register = () => {

  const {
    isLoading,
    message,
    error,
    clearMessages,
    handleRegister
  } = AuthService();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  })

  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
  const allFilled =
    formData.firstName &&
    formData.lastName &&
    formData.phoneNumber &&
    formData.email &&
    formData.password;
  setIsFilled(allFilled);
}, [formData]);

  const [click, setClick] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear previous messages
    clearMessages()

    // form validation
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return
    }

    // handle register AuthService
    await handleRegister(formData)

  }

  const handlePassClick = () => {
    setClick(!click)
  }

  return (
    <>
    <div className='register-main-header'>
      <h1>Bet<span>P</span>erfect.ng</h1>
    </div>

    <div className='register-container'>
      <div className='header'>
        <h1 className='register-header'>Sign Up</h1>
      </div>

      {message && (
        <div className='success-message'>
          <p>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='sign-up-form'>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            placeholder='Enter your first name'
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            placeholder='Enter your last name'
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder='Enter your phone number'
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {error.toLocaleLowerCase().includes("phone") && (
            <p className='error-display'>{error}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="text"
            id="email"
            placeholder='Enter your email'
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.toLocaleLowerCase().includes("email") && (
            <p className='error-display'>{error}</p>
          )}
        </div>

        <div className="form-group password">
          <label htmlFor="password">Password *</label>
          <input
            type={click ? 'password' : 'text'}
            id="password"
            name="password"
            placeholder='Create your password'
            value={formData.password}
            onChange={handleChange}
            className='password-input'
          />

          {formData.password.length >= 6 ? (
            <span className='password-check'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
          ): formData.password.length > 0 && <span className='password-bad'><ion-icon name="alert-circle-outline"></ion-icon></span>
        }

          <button 
            type='button'
            className='password-btn' 
            onClick={handlePassClick}
          >
            { click ? (
              <ion-icon name="eye-outline"></ion-icon>
              ) : (
              <ion-icon name="eye-off-outline"></ion-icon>
              )}
          </button>
        </div>

        {formData.password.length > 0 && formData.password.length < 6 && (
          <p className='password-length'>Password must me be at least 6 characters</p>
        )}

        <button
         type='submit' 
         className={isFilled? "submit-btn": "filled"}
         disabled={isLoading || !isFilled}
        >
          {isLoading ? (
            <span className="loader">Creating account...</span>
          ) : 'Submit'}
        </button>

        <div className='register-end-button'>
          <p>already have an account?</p>
          <p className='login-link'>
            <NavLink
              to={'/login'}
            >
              Login
            </NavLink>
          </p>
        </div>

        <div className='termandc'>
          <p className='term-condition'>By creating an account, you agree to our <span> Terms & Conditions </span> and confirm that you are at least 18 years old or over and all information given is true.</p>
        </div>
      </form>
    </div>
  </>
  )
}

export default Register;
