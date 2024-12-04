import React, { useState, useEffect } from 'react';
import formStyles from '../../forms/Form.module.css';
import { getMoods } from '../../../services/MoodService'; 

const MoodSelector = ({ selectedMood, onMoodChange }) => {
    const [moods, setMoods] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const fetchedMoods = await getMoods();
                setMoods(fetchedMoods); 
            } catch (error) {
                console.error("Error fetching moods:", error);
                alert("Failed to fetch moods. Please try again later.");
            } finally {
                setLoading(false); 
            }
        };

        fetchMoods();
    }, []);

    if (loading) {
        return <div>Loading moods...</div>; // Loading state
    }

    return (
        <div>
            <label className={formStyles.label}>Mood:*</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        type="button"
                        className={`${formStyles.actionButton} ${formStyles.moodButton} ${
                            selectedMood === mood.id ? formStyles.selected : ''
                        }`}
                        onClick={() => onMoodChange(mood.id)}
                        title={mood.name} // Tooltip for mood name
                    >
                        {mood.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;
