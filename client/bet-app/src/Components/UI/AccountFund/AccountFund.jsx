import { useState } from 'react'
import './AccountFund.css'


const AccountFund = () => {

    const [showAmount, setShowAmount] = useState(false)

    let amount = 445556778.45
    let secondAmount = '****'

    const handleShowAmount = () => {
        setShowAmount(!showAmount)
    }

    return (
        <div className='showamount-container'>
            <p>NGN {showAmount ? amount.toLocaleString() : secondAmount}</p>
            <button onClick={handleShowAmount}>
                {showAmount ? <ion-icon name="eye-outline"></ion-icon> : <ion-icon name="eye-off-outline"></ion-icon>}
            </button>
        </div>
    )
}

export default AccountFund;