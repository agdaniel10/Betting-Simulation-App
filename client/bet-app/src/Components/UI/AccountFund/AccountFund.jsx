import { useState, useContext } from 'react'
import './AccountFund.css'
import { DepositContext } from '../../../Contexts/DepositContext/DepositContext';

const AccountFund = () => {

    const {accountBalance} = useContext(DepositContext)

    const [showAmount, setShowAmount] = useState(false)

    const formatCurrency = (amount) => {
        return Number(amount).toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
    });
};

    const handleShowAmount = () => {
        setShowAmount(!showAmount)
    }

    return (
        <div className='showamount-container'>
            <p>NGN {showAmount ? formatCurrency(accountBalance) : "****"}</p>
            <button onClick={handleShowAmount}>
                {showAmount ? <ion-icon name="eye-outline"></ion-icon> : <ion-icon name="eye-off-outline"></ion-icon>}
            </button>
        </div>
    )
}

export default AccountFund;