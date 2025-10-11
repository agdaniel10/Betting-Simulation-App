import { useState, createContext, useEffect } from "react";

export const DepositContext = createContext({
    accountBalance: 0,
    addDeposit: () => {},
    betPlacedSubtraction: () => {}
});

const MAX_STAKE = 2000000;

export const DepositProvider = ({ children }) => {
    const [accountBalance, setAccountBalance] = useState(() => {
        const saved = localStorage.getItem('accountBalance');
        return saved ? JSON.parse(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('accountBalance', JSON.stringify(accountBalance));
    }, [accountBalance]);

    const addDeposit = (amount) => {
        amount = Number(amount);
        if (accountBalance + amount > MAX_STAKE) {
            return 'Maximum deposit exceeded';
        } else {
            setAccountBalance(prevBalance => prevBalance + amount);
        }
    };

    const betPlacedSubtraction = (stake) => {
        stake = Number(stake);
        if (accountBalance >= stake) {
            setAccountBalance(prevBalance => prevBalance - stake);
        } else {
            return 'Insufficient balance, fund account to place bet';
        }
    };

    return (
        <DepositContext.Provider value={{ accountBalance, addDeposit, betPlacedSubtraction }}>
            {children}
        </DepositContext.Provider>
    );
};
