import React from 'react';
import './Button.scss';

function Button({ onClick, className = '', text, ...props }) {
  return (
    <button className={`button ${className}`} onClick={onClick} {...props}>
      {text}
    </button>
  );
}

export default Button;