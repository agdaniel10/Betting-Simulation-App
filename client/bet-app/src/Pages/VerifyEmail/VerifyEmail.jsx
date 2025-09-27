import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import AuthService from "../../Hooks/useAuth";
import './VerifyEmail.css'

const OTP_DIGIT_COUNT= 5;

const VerifyEmail = () => {

    const {
        isLoading,
        message,
        error,
        clearMessages,
        handleVerifyUser
    } = AuthService()

    const [inputArr, setInputArr] = useState(
        new Array(OTP_DIGIT_COUNT).fill('')
    )

    const refArr = useRef([]);

    useEffect(() => {
        refArr.current[0]?.focus()

    }, [])

    const onkeydown = (e, index) => {
        if(!e.target.value && e.key === 'Backspace') {
            refArr.current[index - 1]?.focus()
        }
    }

    const handleInputChange = (value, index) => {

        if (isNaN(value)) return

        const newValue = value.trim()
        const newArr = [...inputArr]
        newArr[index] = newValue.slice(-1);
        setInputArr(newArr);

        if (newValue && index < OTP_DIGIT_COUNT - 1) {
            refArr.current[index + 1]?.focus();
}


    }
    const location = useLocation();

    const email = location.state?.email;

    // console.log(email)
    console.log(inputArr)

    const handleVerifyEmail = async () => {

        if (inputArr.some(digit => digit === '')) {
            alert("Kindly enter verification code")
            return
        }

        clearMessages()

        const verificationCode = inputArr.join('');
        await handleVerifyUser({
            verificationCode: verificationCode
        })
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, OTP_DIGIT_COUNT);
        if (!/^\d+$/.test(pasteData)) return;
        
        const newArr = pasteData.split('').concat(new Array(OTP_DIGIT_COUNT).fill(''));
        setInputArr(newArr.slice(0, OTP_DIGIT_COUNT));
    };

    return (
        <>

        <div className="main-header">
            <h1>Bet<span>P</span>erfect.ng</h1>
        </div>
        
        <div className="verifyemail-container">

            <h2 className="verifyemail-header">Verify your email address</h2>

            <p>
                A verification code has been sent to the email {email}. 
                Kindly enter the code below...
            </p>

            <div>
                {inputArr.map((input, index) => {
                    return (
                        <input 
                            className="otp-input" 
                            key={index} 
                            type="text"
                            maxLength='1'
                            onPaste={index === 0 ? handlePaste : undefined}
                            value={inputArr[index]}
                            ref={(input) => (refArr.current[index] = input)}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            onKeyDown={(e) => onkeydown(e, index)}
                        />
                    )
                })}
            </div>

            {isLoading && (
                <div className='loading-message'>
                    <p>Verifying your email</p>
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

            <button 
                className="verify-btn"
                onClick={handleVerifyEmail}
                disabled={isLoading}
            >
                {isLoading ? "Verifying email": "Verify my email"}
            </button>

            <div className="contact-btns">
                <a 
                    href="https://www.linkedin.com/in/unogwu-agada-a04638215/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <button>
                    <ion-icon name="logo-linkedin"></ion-icon>
                    </button>
                </a>

                <a 
                    href="https://x.com/ag_daniel10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <button>
                    <ion-icon name="logo-twitter"></ion-icon>
                    </button>
                </a>

                <a 
                    href="https://github.com/agdaniel10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                >
                    <button>
                    <ion-icon name="logo-github"></ion-icon>
                    </button>
                </a>    
            </div>
        </div>
        </>
    )
}

export default VerifyEmail;