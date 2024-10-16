import React from 'react';
import formStyles from './Form.module.css';

function SubmitButton({ type = "button", handleClick, children }) {
    return (
        <button 
            type={type} 
            onClick={handleClick} 
            className={formStyles.actionButton}
        >
            {children}
        </button>
    );
}

export default SubmitButton;
