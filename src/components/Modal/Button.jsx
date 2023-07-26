//Button.jsx
import React from 'react';
import css from './Styles/Modal.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
