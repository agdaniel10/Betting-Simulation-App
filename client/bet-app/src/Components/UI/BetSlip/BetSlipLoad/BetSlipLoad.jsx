import './BetSlipLoad.css'
import axios from 'axios';
import { useState } from 'react';


const BetSlipLoad = () => {

    const [enteredCode, setEnteredCode] = useState('')

    const handleCodeChange = (e) => {
        const value = e.target.value.toUpperCase()
        setEnteredCode(value)
    }
    
    return(
        <div className="betslip-details-container">
            <p>To place a bet, click on the odds. Or insert a booking code</p>

            <input 
                type="text" 
                className="code-input"
                placeholder="Booking Code"
                value={enteredCode}
                onChange={(e) => handleCodeChange(e)}
            />

            <button className="load-btn">Load</button>
            <p>A booking code enables one to transfer a betslip between different devices.</p>
        </div>
    )
}

export default BetSlipLoad;