import React, { useContext } from 'react';
import './BetSlipFilled.css';
import { BetslipContext } from '../../../../Contexts/BetslipContext/BetslipContext';

const BetSlipFilled = ({ betSlip }) => {
    const { deleteFromSlip, resetBetSlip } = useContext(BetslipContext);

    // Calculate total odds
    const totalOdds = betSlip.reduce((total, bet) => {
        return total * parseFloat(bet.odds);
    }, 1).toFixed(2);

    // Calculate potential winnings (example stake of 100)
    const [stake, setStake] = React.useState(100);
    const potentialWin = (stake * totalOdds).toFixed(2);

    const getSelectionLabel = (selection) => {
        switch(selection) {
            case 'home': return '1';
            case 'draw': return 'X';
            case 'away': return '2';
            default: return selection;
        }
    };

    return (
        <div className="betslip-filled">
            <div className="betslip-items">
                {betSlip.map((bet) => (
                    <div key={bet.matchId} className="bet-item">
                        <button 
                            className="remove-bet"
                            onClick={() => deleteFromSlip(bet.matchId)}
                        >
                            ×
                        </button>
                        
                        <div className="bet-match">
                            <p className="teams">{bet.teams.home} vs {bet.teams.away}</p>
                            <div className="bet-selection">
                                <span className="selection-label">
                                    {getSelectionLabel(bet.selection)}
                                </span>
                                <span className="odds">{bet.odds}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="betslip-summary">
                <div className="stake-input">
                    <label>Stake:</label>
                    <input 
                        type="number" 
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        min="0"
                    />
                </div>

                <div className="odds-summary">
                    <p>Total Odds: <strong>{totalOdds}</strong></p>
                    <p>Potential Win: <strong>₦{potentialWin}</strong></p>
                </div>

                <div className="betslip-actions">
                    <button className="place-bet-btn">Place Bet</button>
                    <button className="clear-all-btn" onClick={resetBetSlip}>
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BetSlipFilled;