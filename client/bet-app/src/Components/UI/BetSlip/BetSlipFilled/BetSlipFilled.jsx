import { useContext, useState } from 'react';
import './BetSlipFilled.css'
import { BetslipContext } from '../../../../Contexts/BetslipContext/BetslipContext';
import BookBet from '../../Bookbet/Bookbet';
import PrintBookedBet from '../../PrintBookedBet/PrintBookedBet';
import PlaceBet from '../../PlaceButton/PlaceBet';


const BetSlipFilled = ({betSlip}) => {

    const {deleteFromSlip, resetBetSlip } = useContext(BetslipContext)

    const MAX_STAKE = 2000000

    const [stake, setStake] = useState(100)

    const totalOdds = betSlip.reduce((total, bet) => {
        return total + bet.odds * parseFloat(bet.odds);
    }, 1).toFixed(2)

    const initialWinning = stake * totalOdds
    const maxBonus = 0.25 * initialWinning  
    const potentialWinning = initialWinning + maxBonus

    const handleStakeChange = (e) => {
        const value = e.target.value
        
        if (value === '') {
            setStake(0)
            return
        }
        
        const numValue = Number(value)
        
        if (isNaN(numValue) || numValue < 0) return
        if (numValue > MAX_STAKE) {
            setStake(MAX_STAKE)
            return
        }
        
        setStake(numValue)
    }

    return (
        <div className='betslip-filled-container'>
            <div>
                <div className='remove-btn-container'>
                    <button
                        className='remove-btn'
                        onClick={() => resetBetSlip()}
                    >
                        Remove All
                    </button>
                </div>

                <div className='betplaced'>
                    <ul>
                        {betSlip.map((pick) => (
                            <li key={pick.matchId}>
                                <div className='pick-container'>
                                    <div className='check-and-delete'>
                                        <div className='check-tick-selection'>
                                            <p><ion-icon name="checkmark-outline"></ion-icon></p>
                                            <p><ion-icon name="football-outline"></ion-icon></p>
                                            <p>{pick.selection.charAt(0).toUpperCase() + pick.selection.slice(1)}</p>
                                        </div>

                                        <button 
                                            onClick={() => deleteFromSlip(pick.matchId)}
                                        >
                                            <ion-icon name="close-outline"></ion-icon>
                                        </button>
                                    </div>

                                    <div className='teams'>
                                        <p>{pick.teams.home} v {pick.teams.away}</p>
                                    </div>

                                    <div className='odds-display'>
                                        <p>{pick.odds}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div  className='main-bet-details'>
                    <div className='type-number-stake'>
                        <div className='type'>
                            <p>Type</p>
                            <p>Multiple</p>
                        </div>

                        <div className='number'>
                            <p>No.</p>
                            <p>1</p>
                        </div>

                        <div className='stake'>
                            <p>Stake(NGN)</p>
                            <input
                                type="text" 
                                className='stake-input'
                                placeholder='min. 10'
                                value={stake}
                                onChange={(e) => handleStakeChange(e)}
                            />
                        </div>
                    </div>

                    {stake >= MAX_STAKE && (
                            <p className='stake-limit'> <ion-icon name="alert-circle-outline"></ion-icon> Total stake cannot exceed {MAX_STAKE}</p>
                        )}
                </div>

                <div className='odds-stake-bonus-potential'> 
                    <div className='total-odds'>
                        <p>Odds</p>
                        <p>{totalOdds}</p>
                    </div>

                    <div className='total-stake'>
                        <p>Total Stake</p>
                        <p>{stake.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>

                    <div className='max-bonus'>
                        <p>Max bonus</p>
                        <p>{maxBonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>

                    <div className='potential'>
                        <p>Potential Win</p>
                        <p>{potentialWinning.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>

                    <PlaceBet />

                    <div className='print-book'>
                        <BookBet 
                            totalOdds={totalOdds}
                            stake={stake}
                            potentialWinning={potentialWinning}
                        />
                        <PrintBookedBet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BetSlipFilled;