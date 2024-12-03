import React, { useState } from 'react';
import formStyles from '../../forms/Form.module.css';
import { createMood } from '../../../services/MoodService';

const AddMoodForm = ({ onMoodAdded }) => {
    const [mood, setMood] = useState({
        name: '',
        emoji: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createMood(mood);
            alert('Mood created successfully!');
            setMood({ name: '', emoji: '' });
            if (onMoodAdded) onMoodAdded();
        } catch (error) {
            console.error('Error creating mood:', error);
            alert('Failed to create mood. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={formStyles.box}>
            <h2 className={formStyles.title}>Add New Mood</h2>
            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Name:</label>
                <input
                    type="text"
                    className={formStyles.inputField}
                    value={mood.name}
                    onChange={(e) => setMood({ ...mood, name: e.target.value })}
                    required
                />
            </div>

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Emoji:</label>
                <input
                    type="text"
                    className={formStyles.inputField}
                    value={mood.emoji}
                    onChange={(e) => setMood({ ...mood, emoji: e.target.value })}
                    required
                />
            </div>

            <button type="submit" className={formStyles.actionButton} disabled={loading}>
                {loading ? 'Adding...' : 'Add Mood'}
            </button>
        </form>
    );
};

export default AddMoodForm;
