// Modal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Styles/Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        {image && <img src={image} alt={image.tags} className={css.image} />}
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
