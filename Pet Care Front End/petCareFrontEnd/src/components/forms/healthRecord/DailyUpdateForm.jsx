import React, { useState } from 'react';
import formStyles from '../../forms/Form.module.css';
import MoodSelector from './MoodSelector';
import ActivityLevelSlider from './ActivityLevelSlider';
import SocialDropdown from './SocialDropdown';
import { addHealthRecordToPet } from '../../../services/PetService'; 
import styles from '../../account/PetInfo.module.css'

const DailyUpdateForm = ({ pet }) => {
    // console.log(petId);
    const [foodIntake, setFoodIntake] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [mood, setMood] = useState(null);
    const [activityLevel, setActivityLevel] = useState(5);
    const [socialInteraction, setSocialInteraction] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const healthRecord = {
            foodIntake: parseFloat(foodIntake) || 0,
            waterIntake: parseFloat(waterIntake) || 0,
            moodId: mood,
            activityLevel: parseInt(activityLevel, 10),
            socialInteraction,
            notes,
        };
        try {
            await addHealthRecordToPet(pet.id, healthRecord);
            alert('Health record saved successfully!');
        } catch (err) {
            console.error('Error saving health record:', err);
            alert('Failed to save health record.');
        }
    };

    return (
        <div className={formStyles.pageContainer} style={{ padding: `10rem 0` }}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Daily Update</h1>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.photoPlusInputs}>
                    <img src={`data:image/jpeg;base64,${pet.image}` || "/src/assets/default-pet.jpg"} alt={pet.name} className={styles.petImage} />
                        <div>
                            <div className={formStyles.inputGroup}>
                                <label className={formStyles.label}>Food intake (grams):</label>
                                <input
                                    type="number"
                                    value={foodIntake}
                                    onChange={(e) => setFoodIntake(e.target.value)}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label className={formStyles.label}>Water intake (ml):</label>
                                <input
                                    type="number"
                                    value={waterIntake}
                                    onChange={(e) => setWaterIntake(e.target.value)}
                                    className={formStyles.inputField}
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    <MoodSelector selectedMood={mood} onMoodChange={setMood} />
                    <ActivityLevelSlider activityLevel={activityLevel} onActivityChange={setActivityLevel} />
                    <br />
                    <SocialDropdown socialInteraction={socialInteraction} onSocialChange={setSocialInteraction} />
                    <br />
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Notes:</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={formStyles.inputField}
                            rows="3"
                        ></textarea>
                    </div>

                    <button type="submit" className={formStyles.actionButton}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DailyUpdateForm;
