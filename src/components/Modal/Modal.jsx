import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  keyEscDown = event => {
    if (event.keyCode === 27) {
      this.props.handlerCloseModal();
    }
  };

  overlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.handlerCloseModal();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.keyEscDown);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.keyEscDown);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.overlayClick}>
        <div className={css.modal}>
          <div className="modal-content">
            <img
              className={css.img}
              src={this.props.modalData.largeImageURL}
              alt={this.props.modalData.tags}
            />
          </div>
        </div>
      </div>
    );
  }
}
