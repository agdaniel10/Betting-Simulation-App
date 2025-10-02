import React from "react";
import './BetSlip.css'

const BetSlip = () => {

    return (
        <div className="betlip-container">
            <div className="betslip-container-header">
                <h2>BetSlip</h2>
            </div>

            <div className="betslip-details-container">
                <p>To place a bet, click on the odds. Or insert a booking code</p>

                <input 
                    type="text" 
                    className="code-input"
                    placeholder="Booking Code"
                />

                <button className="load-btn">Load</button>
                <p>A booking code enables one to transfer a betslip between different devices.</p>
            </div>
        </div>
    )
}

export default BetSlip;