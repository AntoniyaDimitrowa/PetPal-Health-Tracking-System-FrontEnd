import React from 'react';
import formStyles from '../Form.module.css';
import Select from 'react-select';
import ImageUpload from '../ImageUpload';
import customStyles from '../CustomStyles';

const PetInputFields = ({ petData, breedOptions, isLoadingBreeds, handleChange, handleBreedChange, handleImageChange }) => (
    <>
        <div className={formStyles.photoPlusInputs}>
            <ImageUpload data={petData} handleImageChange={handleImageChange} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={formStyles.inputGroup}>
                    <label htmlFor="name" className={formStyles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={petData.name || ""}
                        onChange={handleChange}
                        className={formStyles.inputField}
                    />
                </div>

                <div className={formStyles.inputGroup}>
                    <label htmlFor="breed" className={formStyles.label}>Breed:</label>
                    <Select
                        id="breed"
                        name="breed"
                        options={breedOptions}
                        value={breedOptions.find(option => option.value === petData.breedId) || null}
                        onChange={handleBreedChange}
                        isClearable
                        isLoading={isLoadingBreeds}
                        placeholder="Select or type a breed..."
                        className={formStyles.selectField}
                        styles={customStyles}
                    />
                </div>

                <div className={formStyles.inputGroup}>
                    <label htmlFor="birthdate" className={formStyles.label}>Birthdate:</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={petData.birthdate || ""}
                        onChange={handleChange}
                        className={formStyles.inputField}
                    />
                </div>
            </div>
        </div>
        <div className={formStyles.inputGroup}>
            <label htmlFor="weight" className={formStyles.label}>Weight (kg):</label>
            <input
                type="number"
                min={0.05}
                step={0.01}
                id="weight"
                name="weight"
                value={petData.weight || ""}
                onChange={handleChange}
                className={formStyles.inputField}
            />
        </div>

        <div className={formStyles.inputGroup}>
            <label htmlFor="gender" className={formStyles.label}>Gender:</label>
            <select
                id="gender"
                name="gender"
                value={petData.gender ? petData.gender.toLowerCase() : ""}
                onChange={handleChange}
                className={formStyles.inputField}
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    </>
);

export default PetInputFields;
