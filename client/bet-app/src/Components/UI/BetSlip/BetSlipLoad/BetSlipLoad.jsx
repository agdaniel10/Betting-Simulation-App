import './BetSlipLoad.css'
import axios from 'axios';
import { useState, useContext } from 'react';
import { BetslipContext } from '../../../../Contexts/BetslipContext/BetslipContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BetSlipLoad = () => {

    const { addToBetSlip, resetBetSlip } = useContext(BetslipContext);
    const [enteredCode, setEnteredCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleCodeChange = (e) => {
        const value = e.target.value.toUpperCase()
        setEnteredCode(value)
    }

    const handleLoadBet = async () => {

        if(!enteredCode || enteredCode.length !== 6) {
            alert('Please provide a valid 6-digit booking code');
            return
        }

        setLoading(true)
        setError(null);

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/bookings/${enteredCode}`
            )

            if (response.data.status === 'success') {
                const bookedBet = response.data.data.bookedBet

                // clear current bets
                resetBetSlip();

                bookedBet.bets.forEach((bet) => {
                    addToBetSlip(bet)
                })
            }

        }catch (err) {
            console.error('Error loading ticket:', err);
            const errorMessage = err.response?.data?.message || 'Failed to load betslip. Please try again.';
            setError(errorMessage);
            alert(errorMessage);

        }finally {
            setLoading(false)
        }
    }


    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleLoadBet()
        }
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
                onKeyDown={handleEnterKey}
                maxLength={6}
            />

            <button 
                className="load-btn"
                onClick={handleLoadBet}
            >
                {loading ? 'Loading...' : 'Load'}
            </button>

            {error && <p className="error-message">{error}</p>}

            <p>A booking code enables one to transfer a betslip between different devices.</p>
        </div>
    )
}

export default BetSlipLoad;