import { useState, useContext, useEffect } from 'react'
import './AccountFund.css'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AccountFund = () => {

    const [walletBalance, setWalletBalance] = useState(0)
    const [showAmount, setShowAmount] = useState(false)
    const [loading, setLoading] = useState(false)

    const formatCurrency = (amount) => {
        return Number(amount).toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    };

    const fetchWallet = async () => {

        try {

            const authData = JSON.parse(localStorage.getItem('betperfect_auth'))
            const token = authData?.token

            const response = await axios.get(
                `${API_BASE_URL}/api/auth/getMe`,{
                    headers: { Authorization: `Bearer ${token}`}
                }
            )

            if (response.data.status === 'success') {
                setWalletBalance(response.data.data.user.wallet)
                console.log(response.data.data.user)
            }

        }catch (error) {
            console.error('Error fetching wallet: ', error)
        }
    }

    useEffect(() => {
        fetchWallet();
    }, [])

    const handleShowAmount = () => {
        setShowAmount(prev => !prev)
    }

    const refreshWalletBalance = async () => {
        setLoading(true)
        try {
            await fetchWallet()
        }catch(error) {
            console.log('Error refreshing wallet balance', error)
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className='showamount-container'>
            <p>NGN {showAmount ? formatCurrency(walletBalance) : "****"}</p>
            <button onClick={handleShowAmount} className='showamount-btn'>
                {!showAmount ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>}
            </button>

            <span>
                <button 
                    className='refreshbtn'
                    onClick={refreshWalletBalance}
                >
                    {loading ? (<ion-icon name="refresh-circle-outline"></ion-icon>) 
                    : 
                    (<ion-icon name="refresh-outline"></ion-icon>)}
                </button>
            </span>
        </div>
    )
}

export default AccountFund;

