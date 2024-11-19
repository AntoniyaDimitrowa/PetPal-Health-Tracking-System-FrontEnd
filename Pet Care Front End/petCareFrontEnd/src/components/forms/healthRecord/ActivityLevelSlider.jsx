import React from 'react';
import formStyles from '../../forms/Form.module.css';

const ActivityLevelSlider = ({ activityLevel, onActivityChange }) => {
    const handleSliderChange = (e) => {
        const value = e.target.value;
        const percentage = ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
        e.target.style.background = `linear-gradient(to right, #66BF7B ${percentage}%, #e5e5e5 ${percentage}%)`;
        onActivityChange(value);
    };

    return (
        <div>
            <label className={formStyles.label}>Activity Level:</label>            
            <div className={formStyles.slider}>
            <input
                type="range"
                min="1"
                max="10"
                value={activityLevel}
                onChange={(e) => handleSliderChange(e)}
            />
            <strong className={formStyles.levelLable}>{activityLevel}</strong>
            </div>
            
        </div>
    );
};

export default ActivityLevelSlider;
