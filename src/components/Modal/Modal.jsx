import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ handlerCloseModal, modalData }) => {
  const overlayClick = event => {
    if (event.target === event.currentTarget) {
      handlerCloseModal();
    }
  };

  useEffect(() => {
    const keyEscDown = event => {
      if (event.keyCode === 27) {
        handlerCloseModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keyEscDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', keyEscDown);
    };
  });

  return (
    <div className={css.overlay} onClick={overlayClick}>
      <div className={css.modal}>
        <div className="modal-content">
          <img
            className={css.img}
            src={modalData.largeImageURL}
            alt={modalData.tags}
          />
        </div>
      </div>
    </div>
  );
};
