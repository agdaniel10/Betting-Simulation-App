import { generateBookingCode } from '../../../Utils/generateBookingCode';
import './BookBetModal.css';
import { useState, useEffect, useRef } from 'react';

const BookBetModal = ({ isOpen, onClose, bookingCode }) => {

  const [showCopied, setShowCopied] = useState(false)
  const timerRef = useRef(null)

  if (!isOpen) return null; 

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setShowCopied(true)

    timerRef.current = setTimeout(() => {
      setShowCopied(false)
    }, 1000)

    useEffect(() => {
      return () => {
        if (timerRef.current){
          clearTimeout(timerRef.current)
        }
      }
    }, [])
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
            {showCopied && <h4>copied!</h4>}
        </div>

        <div className='booking-code-date'>
            <h5>{new Date().toLocaleString()}</h5>
        </div>
      </div>
    </div>
  );
};

export default BookBetModal;
