import './BookBet.css';
import { useState } from 'react';
import BookBetModal from '../BookBetModal/BookBetModal';

const BookBet = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>
        Book Bet
      </button>

      <BookBetModal 
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default BookBet;
