import React, { useState, useEffect } from 'react';
import { getBreeds } from '../../services/BreedsService'; // Add this service
import styles from './Table.module.css';

const BreedList = () => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const data = await getBreeds();
                setBreeds(data);
            } catch (error) {
                console.error('Error fetching breeds:', error);
                alert('Failed to fetch breeds. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBreeds();
    }, []);

    if (loading) {
        return <div>Loading breeds...</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.recordsTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Normal Mood</th>
                        <th>Exercise (hrs/day)</th>
                        <th>Health Problems</th>
                    </tr>
                </thead>
                <tbody>
                    {breeds.map((breed) => (
                        <tr key={breed.id}>
                            <td>{breed.name}</td>
                            <td>{breed.description}</td>
                            <td>{breed.normalMood.name}</td>
                            <td>{breed.minimumExercisePerDay}</td>
                            <td>{breed.commonHealthProblems.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BreedList;
