import React, { useState, useRef } from 'react';
import formStyles from '../../forms/Form.module.css';
import { createBreed } from '../../../services/BreedsService';
import MoodSelector from '../healthRecord/MoodSelector';
import { validateAddBreedForm } from '../../../validations/AddBreedFormValidation';
import ErrorMessage from '../../messages/ErrorMessge';

const AddBreedForm = ({ onBreedAdded }) => {
    const [breed, setBreed] = useState({
        name: '',
        description: '',
        normalMoodId: null,
        minimumExercisePerDay: 0,
        commonHealthProblems: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const formRef = useRef(null); // Ref for smooth scrolling

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateAddBreedForm(breed);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // Scroll to the top of the form to display errors
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        setErrors({});
        setLoading(true);

        const breedData = {
            ...breed,
            commonHealthProblems: breed.commonHealthProblems.split(',').map((problem) => problem.trim()),
        };

        try {
            await createBreed(breedData); // Use the `createBreed` service
            alert('Breed created successfully!');
            setBreed({
                name: '',
                description: '',
                normalMoodId: null,
                minimumExercisePerDay: 0,
                commonHealthProblems: '',
            });
            if (onBreedAdded) onBreedAdded();
        } catch (error) {
            console.error('Error creating breed:', error);
            alert('Failed to create breed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={formStyles.box} ref={formRef}>
            <h2 className={formStyles.title}>Add New Breed</h2>
            <ErrorMessage errors={errors} />

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Name:*</label>
                <input
                    type="text"
                    className={formStyles.inputField}
                    value={breed.name}
                    onChange={(e) => setBreed({ ...breed, name: e.target.value })}
                />
            </div>

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Description:*</label>
                <textarea
                    className={formStyles.inputField}
                    value={breed.description}
                    onChange={(e) => setBreed({ ...breed, description: e.target.value })}
                />
            </div>

            <MoodSelector
                selectedMood={breed.normalMoodId}
                onMoodChange={(moodId) => setBreed({ ...breed, normalMoodId: moodId })}
            />

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Minimum Exercise Per Day (hrs):*</label>
                <input
                    type="number"
                    className={formStyles.inputField}
                    value={breed.minimumExercisePerDay}
                    onChange={(e) => setBreed({ ...breed, minimumExercisePerDay: parseFloat(e.target.value) })}
                    min="0"
                    step="0.1"
                />
                
            </div>

            <div className={formStyles.inputGroup}>
                <label className={formStyles.label}>Common Health Problems (comma-separated):</label>
                <input
                    type="text"
                    className={formStyles.inputField}
                    value={breed.commonHealthProblems}
                    onChange={(e) => setBreed({ ...breed, commonHealthProblems: e.target.value })}
                />
            </div>

            <button type="submit" className={formStyles.actionButton} disabled={loading}>
                {loading ? 'Adding...' : 'Add Breed'}
            </button>
        </form>
    );
};

export default AddBreedForm;
