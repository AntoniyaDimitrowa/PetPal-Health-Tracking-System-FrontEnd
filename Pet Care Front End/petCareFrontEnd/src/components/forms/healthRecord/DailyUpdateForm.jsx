import React, { useState, useRef } from 'react';
import formStyles from '../../forms/Form.module.css';
import MoodSelector from './MoodSelector';
import ActivityLevelSlider from './ActivityLevelSlider';
import SocialDropdown from './SocialDropdown';
import { addHealthRecordToPet } from '../../../services/PetService';
import { validateDailyUpdateForm } from '../../../validations/DailyUpdateFormValidation';
import ErrorMessage from '../../messages/ErrorMessge';
import styles from '../../account/PetInfo.module.css';

const DailyUpdateForm = ({ pet }) => {
    const [foodIntake, setFoodIntake] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [mood, setMood] = useState(null);
    const [activityLevel, setActivityLevel] = useState(5);
    const [socialInteraction, setSocialInteraction] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const formRef = useRef(null); // Ref for scrolling to the top of the form

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

        const validationErrors = validateDailyUpdateForm(healthRecord);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // Scroll to the top of the form to display errors
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        setErrors({});

        try {
            await addHealthRecordToPet(pet.id, healthRecord);
            alert('Health record saved successfully!');
        } catch (err) {
            console.error('Error saving health record:', err);
            alert('Failed to save health record.');
        }
    };

    const dynamicPadding = Object.keys(errors).length > 0 ? '15rem' : '10rem';

    return (
        <div className={formStyles.pageContainer} style={{ padding: `${dynamicPadding} 0` }}>
            <div className={formStyles.box} ref={formRef}>
                <h1 className={formStyles.title}>Daily Update</h1>
                <ErrorMessage errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.photoPlusInputs}>
                        <img
                            src={`data:image/jpeg;base64,${pet.image}` || "/assets/default-pet.jpg"}
                            alt={pet.name}
                            className={styles.petImage}
                        />
                        <div>
                            <div className={formStyles.inputGroup}>
                                <label className={formStyles.label}>Food intake (grams):*</label>
                                <input
                                    type="number"
                                    value={foodIntake}
                                    onChange={(e) => setFoodIntake(e.target.value)}
                                    className={formStyles.inputField}
                                />
                            </div>
                            <div className={formStyles.inputGroup}>
                                <label className={formStyles.label}>Water intake (ml):*</label>
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
