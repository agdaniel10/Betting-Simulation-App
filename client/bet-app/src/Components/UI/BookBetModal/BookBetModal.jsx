import { generateBookingCode } from '../../../Utils/generateBookingCode';
import './BookBetModal.css';
import { useState, useEffect } from 'react';

const BookBetModal = ({ isOpen, onClose }) => {
  const [bookingCode, setBookingCode] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      const randomCode = generateBookingCode()
      setBookingCode(randomCode);
    }
  }, [isOpen]);

  if (!isOpen) return null; 

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal-btn">
          <button onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <div className='booking-code-h1'>
             <h1>Booking Code</h1>
        </div>

        <div className="booking-code-box">
            
            <h1>{bookingCode}</h1>
            <button onClick={handleCopy}>
            <ion-icon name="copy-outline"></ion-icon>
            </button>
        </div>

        <div className='booking-code-date'>
            <h5>{new Date().toLocaleString()}</h5>
        </div>
      </div>
    </div>
  );
};

export default BookBetModal;
