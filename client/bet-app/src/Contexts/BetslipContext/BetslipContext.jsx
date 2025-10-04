import { createContext, useState, useEffect } from "react";

export const BetslipContext = createContext();

export function BetslipProvider({ children }) {

    const [betSlip, setBetSlip] = useState(() => {
        const savedBetSlip = localStorage.getItem('betSlip')
        return savedBetSlip ? JSON.parse(savedBetSlip) : []
    })

    const betSlipCount = betSlip.length;

    useEffect(() => {
        localStorage.setItem('betSlip', JSON.stringify(betSlip))
    }, [betSlip])

    /**
     * Add bet to slip
     * @param {object} bet - { matchId, match, selection: 'home'|'draw'|'away', odds, teams }
     */
    const addToBetSlip = (bet) => {
        setBetSlip((prevBets) => {

            const existingBetIndex = prevBets.findIndex(item => item.matchId === bet.matchId)
            
            if (existingBetIndex !== -1) {
                const existingBet = prevBets[existingBetIndex]
                
                if (existingBet.selection === bet.selection) {
                    return prevBets.filter(item => item.matchId !== bet.matchId)
                } else {
                    return prevBets.map((item, index) => 
                        index === existingBetIndex ? bet : item
                    )
                }
            } else {
                return [...prevBets, bet]
            }
        })
    }

    const deleteFromSlip = (matchId) => {
        setBetSlip((prevBets) => {
            return prevBets.filter((item) => item.matchId !== matchId)
        })
    }

    const resetBetSlip = () => {
        setBetSlip([])
        localStorage.removeItem('betSlip')
    }

    return (
        <BetslipContext.Provider value={{
            betSlip,
            betSlipCount,
            addToBetSlip,
            deleteFromSlip,
            resetBetSlip
        }}>
            {children}
        </BetslipContext.Provider>
    )

}