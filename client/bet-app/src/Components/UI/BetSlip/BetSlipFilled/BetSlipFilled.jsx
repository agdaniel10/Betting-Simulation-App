import { useContext } from 'react';
import './BetSlipFilled.css'
import { BetslipContext } from '../../../../Contexts/BetslipContext/BetslipContext';


const BetSlipFilled = ({betSlip}) => {

    const {deleteFromSlip, resetBetSlip } = useContext(BetslipContext)

    return (
        <div className='betslip-filled-container'>
            <div>
                <button
                    onClick={() => resetBetSlip()}
                >
                    Remove All
                </button>

                <ul>
                    {betSlip.map((pick) => (
                        <li key={pick.matchId}>
                            <div className='pick-container'>
                                <div className='check-and-delete'>
                                    <div>
                                        <p><ion-icon name="checkmark-outline"></ion-icon></p>
                                        <p>{pick.odds}</p>
                                    </div>

                                    <button 
                                        onClick={() => deleteFromSlip(pick.matchId)}
                                    >
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </div>

                                <div>
                                    <p>{pick.teams.home} v {pick.teams.away}</p>
                                </div>

                                <div>
                                    <p>{pick.selection}: {pick.odds}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BetSlipFilled;