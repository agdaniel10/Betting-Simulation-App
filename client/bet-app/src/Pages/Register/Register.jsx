import React, { useState } from 'react'
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

      {isLoading && (
        <div className='loading-message'>
          <p>Creating your account</p>
        </div>
      )}

      {message && (
        <div className='success-message'>
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className='error-message'>
          <p>{error}</p>
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

        <button
         type='submit' 
         className='submit-btn'
         disabled={isLoading}
        >
          {isLoading ? 'Creating Account...': 'Submit'}
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
      </form>
    </div>
  </>
  )
}

export default Register;
