import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
// Модальное окно (componentDidMount и componentWillUnmount)
// - Проблема z-index, как решать без костылей (порталы)
// - Слушатель на keydown для Escape
// - Слушатель на клик по Backdrop

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
        console.log('pressed ESC, modal should be closed');
      this.props.onClose();
    }
  };

  handleBackdropClick = (event)=> {
    if(event.currentTarget === event.target){
        this.props.onClose();
    };
      }

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
