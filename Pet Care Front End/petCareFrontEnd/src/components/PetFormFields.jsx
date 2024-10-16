import React from 'react';
import Select from 'react-select';
import customStyles from './CustomStyles'; // Your custom select styles

function PetFormFields({ petData, breedOptions, handleChange, handleBreedChange, isLoadingBreeds }) {
    return (
        <>
            <div className="inputGroup">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={petData.name}
                    onChange={handleChange}
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="breed">Breed:</label>
                <Select
                    id="breed"
                    name="breed"
                    options={breedOptions}
                    value={breedOptions.find((option) => option.value === petData.breedId)}
                    onChange={handleBreedChange}
                    isClearable
                    isLoading={isLoadingBreeds}
                    placeholder="Select or type a breed..."
                    className="selectField"
                    styles={customStyles}
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="birthdate">Birthdate:</label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={petData.birthdate}
                    onChange={handleChange}
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    min={0.05}
                    step={0.01}
                    id="weight"
                    name="weight"
                    value={petData.weight}
                    onChange={handleChange}
                    className="inputField"
                />
            </div>

            <div className="inputGroup">
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={petData.gender}
                    onChange={handleChange}
                    className="dropdown"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </>
    );
}

export default PetFormFields;
