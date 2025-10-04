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

    const addToBetSlip = (match) => {
        setBetSlip((prevMatches) => {
            const matchExist = prevMatches.find(item => item.id === match.id)
            if (matchExist) {
                return prevMatches.map((item) => 
                    item.id === match.id ? { ...item } : item
                )
            } else {
                
                return [...prevMatches, match]
            }
        })
    }

    const deleteFromSlip = (id) => {
        setBetSlip((prevMatches) => {
            return prevMatches.filter((item) => item.id !== id)
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