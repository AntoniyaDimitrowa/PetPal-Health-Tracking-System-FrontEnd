import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import formStyles from '../Form.module.css';
import { createBreedHealthInfo, getBreeds } from '../../../services/BreedsService';
import ErrorMessage from '../../messages/ErrorMessge';
import SubmitButton from '../SubmitButton';
import { validateBreedHealthInfo } from '../../../validations/BreedHealthInfoValidation';
import customStyles from '../CustomStyles';
import { AuthContext } from '../../../context/AuthContext';

const AddBreedHealthInfoForm = ({ onSuccess }) => {
    const { claims } = useContext(AuthContext);
    
    const [healthInfo, setHealthInfo] = useState({
        breedId: '',
        ageRangeStart: '',
        ageRangeEnd: '',
        normalFoodIntake: '',
        normalWaterIntake: '',
        weightRangeMin: '',
        weightRangeMax: ''
    });
    const [errors, setErrors] = useState({});
    const [breedOptions, setBreedOptions] = useState([]);
    const [isLoadingBreeds, setIsLoadingBreeds] = useState(true);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breeds = await getBreeds();
                setBreedOptions(breeds.map((b) => ({ value: b.id, label: b.name })));
            } catch (err) {
                console.error('Error fetching breeds:', err);
            } finally {
                setIsLoadingBreeds(false);
            }
        };

        fetchBreeds();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHealthInfo({ ...healthInfo, [name]: value });
    };

    const handleBreedChange = (selectedOption) => {
        setHealthInfo({ ...healthInfo, breedId: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        console.log(healthInfo);

        const validationErrors = validateBreedHealthInfo(healthInfo);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await createBreedHealthInfo(healthInfo);
            if (onSuccess) onSuccess();
            setHealthInfo({
                breedId: '',
                ageRangeStart: '',
                ageRangeEnd: '',
                normalFoodIntake: '',
                normalWaterIntake: '',
                weightRangeMin: '',
                weightRangeMax: ''
            });
        } catch (error) {
            console.error('Error adding breed health info:', error);
            setErrors({ submit: 'Failed to add breed health info. Please try again.' });
        }
    };

    const dynamicPadding = Object.keys(errors).length > 0 ? '15rem' : '10rem';

    return (
        <>
        {claims?.roles.includes("Veterinarian") ? (
            <div className={formStyles.pageContainer} style={{ padding: `${dynamicPadding} 0` }}>
            <div className={formStyles.box}>
                <h1 className={formStyles.title}>Add Breed Health Info</h1>
                <ErrorMessage errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.inputGroup}>
                        <label htmlFor="breed" className={formStyles.label}>Breed:*</label>
                        <Select
                            id="breed"
                            name="breed"
                            options={breedOptions}
                            value={breedOptions.find(option => option.value === healthInfo.breedId) || null}
                            onChange={handleBreedChange}
                            isClearable
                            isLoading={isLoadingBreeds}
                            placeholder="Select or type a breed..."
                            className={formStyles.selectField}
                            styles={customStyles}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Age Range Start:*</label>
                        <input
                            type="number"
                            name="ageRangeStart"
                            value={healthInfo.ageRangeStart}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Age Range End:*</label>
                        <input
                            type="number"
                            name="ageRangeEnd"
                            value={healthInfo.ageRangeEnd}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Normal Food Intake (grams):*</label>
                        <input
                            type="number"
                            name="normalFoodIntake"
                            value={healthInfo.normalFoodIntake}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Normal Water Intake (grams):*</label>
                        <input
                            type="number"
                            name="normalWaterIntake"
                            value={healthInfo.normalWaterIntake}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Weight Range Min (kg):*</label>
                        <input
                            type="number"
                            name="weightRangeMin"
                            value={healthInfo.weightRangeMin}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label className={formStyles.label}>Weight Range Max (kg):*</label>
                        <input
                            type="number"
                            name="weightRangeMax"
                            value={healthInfo.weightRangeMax}
                            onChange={handleChange}
                            className={formStyles.inputField}
                        />
                    </div>
                    <SubmitButton type="submit">Add Health Info</SubmitButton>
                </form>
            </div>
        </div>
        ) : (<></>)}
        
        </>
        
    );
};

export default AddBreedHealthInfoForm;
