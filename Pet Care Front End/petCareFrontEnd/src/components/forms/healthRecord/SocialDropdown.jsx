import React from 'react';
import formStyles from '../../forms/Form.module.css';

const SocialDropdown = ({ socialInteraction, onSocialChange }) => {
    // Updated social interaction options
    const options = [
        { value: 'played_with_pets', label: 'Played with other pets' },
        { value: 'interacted_with_humans', label: 'Interacted with humans' },
        { value: 'social_all_day', label: 'Social all day (people & pets)' },
        { value: 'brief_social', label: 'Brief social interactions' },
        { value: 'relaxed_responsive', label: 'Relaxed but responsive' },
        { value: 'unsocial_all_day', label: 'Unsocial the whole day' },
        { value: 'unsocial_aggressive', label: 'Unsocial and aggressive' },
        { value: 'anxious_avoiding', label: 'Anxious and avoided others' },
        { value: 'fearful', label: 'Fearful of humans or pets' },
        { value: 'clingy', label: 'Excessively clingy to humans' },
        { value: 'erratic', label: 'Erratic and unpredictable' },
    ];

    return (
        <div>
            <label className={formStyles.label}>Social Interactions:</label>
            <select
                value={socialInteraction}
                onChange={(e) => onSocialChange(e.target.value)}
                className={formStyles.dropdown}
            >
                <option value="">Select...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SocialDropdown;
