import React from 'react';
import formStyles from '../../forms/Form.module.css';

const SocialDropdown = ({ socialInteraction, onSocialChange }) => {
    const options = ['Played with another pet', 'Interacted with a human', 'Stayed alone'];

    return (
        <div>
            <label className={formStyles.label}>Social Interactions:</label>
            <select
                value={socialInteraction}
                onChange={(e) => onSocialChange(e.target.value)}
                className={formStyles.dropdown}
            >
                <option value="">Select...</option>
                {options.map((option, idx) => (
                    <option key={idx} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SocialDropdown;
