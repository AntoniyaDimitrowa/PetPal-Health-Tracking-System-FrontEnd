import React, { useState } from 'react';
import formStyles from '../../forms/Form.module.css';

const ActivityLevelSlider = ({ activityLevel, onActivityChange }) => {
    const [thumbPosition, setThumbPosition] = useState(0);

    const hoursMapping = [
        '15 min', '30 min', '45 min', '1 hr',
        '1.5 hrs', '2 hrs', '2.5 hrs', '3 hrs',
        '4 hrs', '5+ hrs'
    ];

    const handleSliderChange = (e) => {
        const value = e.target.value;
        const percentage = ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
        e.target.style.background = `linear-gradient(to right, #66BF7B ${percentage}%, #e5e5e5 ${percentage}%)`;
        setThumbPosition(percentage);
        onActivityChange(value);
    };

    return (
        <>
            <label className={formStyles.label}>Activity Level:</label>

            <div className={formStyles.sliderContainer}>
                <div className={formStyles.sliderWrapper}>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={activityLevel}
                        onChange={(e) => handleSliderChange(e)}
                        className={formStyles.slider}
                    />
                    <div
                        className={formStyles.floatingLabel}
                        style={{ left: `calc(${thumbPosition}% - 20px)` }} // Dynamically position
                    >
                        {hoursMapping[activityLevel - 1]}
                        <div className={formStyles.triangle}></div>
                    </div>
                </div>
                <strong className={formStyles.levelLabel}>{activityLevel}</strong>
            </div>
        </>

    );
};

export default ActivityLevelSlider;
