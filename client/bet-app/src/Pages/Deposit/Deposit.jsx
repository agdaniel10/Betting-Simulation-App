import './Deposit.css';
import { useState, useContext } from 'react';
import { DepositContext } from '../../Contexts/DepositContext/DepositContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaypal,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcStripe,
  faApplePay,
  faGooglePay
} from '@fortawesome/free-brands-svg-icons';

const Deposit = () => {

    const { addDeposit } = useContext(DepositContext);

    const [amount, setAmount] = useState('')

    const handleAmountChange = (e) => { 
        const value = e.target.value

        if (value === '') {
            setAmount('')
            return
        }

        const numValue = Number(value)
        if (isNaN(numValue) || numValue < 0) return 

        setAmount(numValue)
    }

    const handleDeposit = () => {
        addDeposit(amount)
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
                        value={amount}
                        className='deposit-input'
                        onChange={(e) => handleAmountChange(e)}
                    />

                    <button
                        onClick={handleDeposit}
                        className='deposit-button'
                    >
                        Deposit
                    </button>
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