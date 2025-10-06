import { generateBookingCode } from '../../../Utils/generateBookingCode';
import './BookBetModal.css';
import { useState, useEffect } from 'react';

const BookBetModal = ({ isOpen, onClose }) => {
  const [bookingCode, setBookingCode] = useState('');

  // Generate random 6-digit booking code whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const randomCode = generateBookingCode()
      setBookingCode(randomCode);
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render modal if it's closed

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

        <p className='booking-code-text'>Booking Code</p>

        <div className="booking-code-box">
          <h1>{bookingCode}</h1>
          <button onClick={handleCopy}>
            <ion-icon name="copy-outline"></ion-icon>
          </button>
        </div>

        <p>{new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BookBetModal;
