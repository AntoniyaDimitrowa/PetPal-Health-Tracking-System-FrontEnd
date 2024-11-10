import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errors, inline = false }) => {
    if (!errors || Object.keys(errors).length === 0) return null;

    return (
        <div className={inline ? styles.inlineErrorContainer : styles.errorContainer}>
            {Object.entries(errors).map(([field, message]) => (
                <div key={field} className={styles.errorMessage}>
                    {message}
                </div>
            ))}
        </div>
    );
};

ErrorMessage.propTypes = {
    errors: PropTypes.object, // An object where keys are field names and values are error messages
    inline: PropTypes.bool,  // Whether to display errors inline or grouped
};

export default ErrorMessage;
