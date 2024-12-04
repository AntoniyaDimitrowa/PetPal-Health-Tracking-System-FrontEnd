import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import formStyles from '../../forms/Form.module.css';
import {createMood} from '../../../services/MoodService';

const AddMoodForm = ({ onMoodAdded }) => {
    const [mood, setMood] = useState({
        name: '',
        emoji: '',
    });
    const [showPicker, setShowPicker] = useState(false);
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

    const handleEmojiSelect = (emoji) => {
        setMood({ ...mood, emoji: emoji.native }); // Set the selected emoji
        setShowPicker(false); // Hide the picker after selection
    };

    return (
        <form onSubmit={handleSubmit} className={formStyles.box}>
            <h2 className={formStyles.title}>Add New Mood</h2>

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Name:*</label>
                <input
                    type="text"
                    className={formStyles.inputField}
                    value={mood.name}
                    onChange={(e) => setMood({ ...mood, name: e.target.value })}
                    required
                />
            </div>

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Emoji:*</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        className={formStyles.inputField}
                        value={mood.emoji}
                        onClick={() => setShowPicker(!showPicker)}
                        readOnly
                        placeholder="Click to pick an emoji"
                    />
                    <button
                        type="button"
                        className={formStyles.secondaryButton}
                        onClick={() => setShowPicker(!showPicker)}
                        style={{ marginLeft: '10px' }}
                    >
                        {showPicker ? 'Close' : 'Pick Emoji'}
                    </button>
                </div>
                {showPicker && (
                    <div style={{ position: 'absolute', zIndex: 100 }}>
                        <Picker
                            onEmojiSelect={handleEmojiSelect} // Updated method name
                        />
                    </div>
                )}
            </div>

            <button type="submit" className={formStyles.actionButton} disabled={loading}>
                {loading ? 'Adding...' : 'Add Mood'}
            </button>
        </form>
    );
};

export default AddMoodForm;
