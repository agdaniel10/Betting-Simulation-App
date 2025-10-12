import './Deposit.css';
import { useState, useEffect } from 'react';
import useApi from '../../Hooks/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaypal,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from '@fortawesome/free-brands-svg-icons';

const Deposit = () => {

    const { isLoading, message, error, post, clearMessages } = useApi()
    const [showMessage, setShowMessage] = useState(false)

    const [depositAmount, setDepositAmount] = useState('')

    const handleAmountChange = (e) => { 
        const value = e.target.value

        if (value === '') {
            setDepositAmount('')
            return
        }

        const numValue = Number(value)
        if (isNaN(numValue) || numValue < 0) return 

        setDepositAmount(numValue)
    }

    useEffect(() => {

        if (message) {
            setShowMessage(true)
        } 

        if (error) {
            setShowMessage(true)
        }
        const messageTimeout = setTimeout(() => {
            setShowMessage(false)
        }, 5000);

        return () => clearTimeout(messageTimeout);

    }, [message, error])


    const handleDeposit =  async () => {
        
        clearMessages()

        if (!depositAmount || depositAmount <= 0) {
            alert('Please enter a valid amount')
            return
        }

        try {

            const response = await post('/api/deposit/deposit', {depositAmount})

            if (response.status === 'success') {
                setDepositAmount('')
                console.log('Deposit successful', response)
            }

        }catch (error) {
            console.error('Deposit failed', error)
        }
    }

    return (
        <div className='deposit-container'>

            <div className='main-deposit-header'>
                <h1>Deposit</h1>
            </div>
            

            <div className='deposit-input-container'>
                <div className='second-title'>
                    <p>Deposit</p>
                    <span><ion-icon name="help-circle-outline"></ion-icon></span>
                </div>

                <div className='container-amount-input'>
                    <p>Amount (NGN)</p>
                    <input 
                        type="number" 
                        value={depositAmount}
                        className='deposit-input'
                        onChange={(e) => handleAmountChange(e)}
                    />

                    <button
                        onClick={handleDeposit}
                        className='deposit-button'
                    >
                        {isLoading ? 'Depositing...' : 'Deposit'}
                    </button>

                    {error && showMessage &&  (
                        <div>
                            <p>{error}</p>
                        </div>
                    )}

                    {message && showMessage && (
                        <div>
                            <p>{message}</p>
                        </div>
                    )}
                </div>

                <div className='comming-soon'>
                    <p>Coming soon ...</p>
                    <h4>Accept, Process & Deposit payments</h4>

                    <div className='payment-icons'>
                        <FontAwesomeIcon icon={faPaypal} size="3x" />
                        <FontAwesomeIcon icon={faCcVisa} size="3x" />
                        <FontAwesomeIcon icon={faCcMastercard} size="3x" />
                        <FontAwesomeIcon icon={faCcAmex} size="3x" />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Deposit;