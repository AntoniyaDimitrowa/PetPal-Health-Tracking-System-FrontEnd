// components/SubmitButton.js
import React from 'react';
import formStyles from '../styles/Form.module.css';

function SubmitButton({ handleSubmit }) {
    return (
        <button type="submit" onClick={handleSubmit} className={formStyles.actionButton}>
            Save
        </button>
    );
}

export default SubmitButton;
