import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import './VerifyEmail.css'


const OTP_DIGIT_COUNT= 6

const VerifyEmail = () => {

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


    return (
        <div className="verifyemail-container">
            <h1>Bet<span>P</span>erfect.ng</h1>

            <h2>Verify your email address</h2>

            <p>
                A verification code has been sent to the email {email}. 
                Kindly the code here below...
            </p>

            <div>
                {inputArr.map((input, index) => {
                    return (
                        <input 
                            className="otp-input" 
                            key={index} 
                            type="text"
                            value={inputArr[index]}
                            ref={(input) => (refArr.current[index] = input)}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            onKeyDown={(e) => onkeydown(e, index)}
                        />
                    )
                })}
            </div>

            <button>Verify my email</button>

            <button><ion-icon name="logo-twitter"></ion-icon></button>
            <button><ion-icon name="logo-facebook"></ion-icon></button>
            <button><ion-icon name="logo-github"></ion-icon></button>
        </div>
    )
}

export default VerifyEmail;