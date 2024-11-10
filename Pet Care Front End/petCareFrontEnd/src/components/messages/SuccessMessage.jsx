import React from 'react';
import PropTypes from 'prop-types';
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className={styles.successContainer}>
            {message}
        </div>
    );
};

SuccessMessage.propTypes = {
    message: PropTypes.string, // A single success message
};

export default SuccessMessage;
