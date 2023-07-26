//Modal.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import css from './Styles/Modal.module.css';
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    // console.log(image);

    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          {image && <img src={image} alt={image.tags} className={css.image} />}
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
