import React from 'react';
import formStyles from '../../forms/Form.module.css';

const MoodSelector = ({ selectedMood, onMoodChange }) => {
    const moods = [
        { id: 1, emoji: '😀' },
        { id: 2, emoji: '😊' },
        { id: 3, emoji: '😐' },
        { id: 4, emoji: '😟' },
        { id: 5, emoji: '😭' },
    ];

    return (
        <div>
            <label className={formStyles.label}>Mood:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        type="button"
                        className={`${formStyles.actionButton} ${formStyles.moodButton} ${
                            selectedMood === mood.id ? formStyles.selected : ''
                        }`}
                        onClick={() => onMoodChange(mood.id)}
                    >
                        {mood.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;
