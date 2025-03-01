import React from 'react';
import Button from '../../Main/Button/Button';
import './Modal.scss';

function Modal({ title, children, onConfirm, onCancel, showCancel = true }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleConfirmClick = (e) => {
    e.stopPropagation();
    if (onConfirm) onConfirm(e);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    if (onCancel) onCancel();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        {title && <h3 className="modal__title">{title}</h3>}
        <div className="modal__content">{children}</div>
        <div className="modal__buttons">
          {onConfirm && (
            <Button
              onClick={handleConfirmClick}
              className="modal__confirm-btn"
              text="Подтвердить"
            />
          )}
          {showCancel && onCancel && (
            <Button
              onClick={handleCancelClick}
              className="modal__cancel-btn"
              text="Отмена"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;