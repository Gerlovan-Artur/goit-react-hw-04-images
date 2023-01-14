import { useEffect } from 'react';
import style from '../Modal/Modal.module.css';

export function Modal({ closeModal, selectedImg }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  function handleBackdrop(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  return (
    <div className={style.overlay} onClick={handleBackdrop}>
      <div className={style.modal}>
        <img src={selectedImg} alt={selectedImg} />
      </div>
    </div>
  );
}