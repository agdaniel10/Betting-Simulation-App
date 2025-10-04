import './BetSlipLoad.css'

const BetSlipLoad = () => {
    
    return(
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
    )
}

export default BetSlipLoad;