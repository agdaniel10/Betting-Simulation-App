import './BookBet.css';
import { useState, useContext } from 'react';
import BookBetModal from '../BookBetModal/BookBetModal';
import { generateBookingCode } from '../../../Utils/generateBookingCode';
import { BetslipContext } from '../../../Contexts/BetslipContext/BetslipContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BookBet = ({ totalOdds, stake, potentialWinning }) => {
  const [openModal, setOpenModal] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { betSlip } = useContext(BetslipContext);

  const handleBookBet = async () => {
    // Validation
    if (!betSlip || betSlip.length === 0) {
      alert('Please add bets to your betslip');
      return;
    }

    if (!stake || stake <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    setLoading(true);
    setError(null);

    const code = generateBookingCode();

    const totalOddsNum = Number(totalOdds);
    const formattedTotalOdds = parseFloat(totalOddsNum.toFixed(2));
    
    const betSlipData = {
      code: code,
      bets: betSlip,
      totalOdds: formattedTotalOdds,
      stake: parseFloat(stake),
      potentialWinning: parseFloat(potentialWinning.toFixed(2))
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/bookings`, 
        betSlipData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === 'success') {
        setBookingCode(code);
        setOpenModal(true);
        console.log('Booking saved successfully:', response.data);
      }
    } catch (err) {
      console.error('Error booking bet:', err);
      setError(err.response?.data?.message || 'Failed to book bet. Please try again.');
      
      // Show error to user
      alert(err.response?.data?.message || 'Failed to book bet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-bet-container">
      <button 
        onClick={handleBookBet} 
        disabled={loading || !betSlip || betSlip.length === 0}
        className="book-bet-button"
      >
        {loading ? 'Booking...' : 'Book Bet'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <BookBetModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        bookingCode={bookingCode}
      />
    </div>
  );
};

export default BookBet;