import React, { useState, useEffect } from 'react';
import { getMoods } from '../../services/MoodService';
import styles from './Table.module.css';

const MoodList = () => {
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const data = await getMoods();
                setMoods(data);
            } catch (error) {
                console.error('Error fetching moods:', error);
                alert('Failed to fetch moods. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMoods();
    }, []);

    if (loading) {
        return <div>Loading moods...</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.recordsTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Emoji</th>
                    </tr>
                </thead>
                <tbody>
                    {moods.map((mood) => (
                        <tr key={mood.id}>
                            <td>{mood.name}</td>
                            <td>{mood.emoji}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MoodList;
