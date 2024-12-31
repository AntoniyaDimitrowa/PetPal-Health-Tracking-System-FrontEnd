import React from 'react';
import styles from './StatisticsPanel.module.css';
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';

// Helper function to get current month and year
const getCurrentMonthYear = () => {
    const now = new Date();
    return {
        month: now.toLocaleString('default', { month: 'long' }), // Full month name
        year: now.getFullYear(),
    };
};

const PetStatistics = ({ pet }) => {
    console.log(pet);
    const { month, year } = getCurrentMonthYear();

    // Sample data for the current month (replace with actual data fetching logic)
    const foodData = [
        { date: 1, intake: 500, norm: 600 },
        { date: 2, intake: 550, norm: 600 },
        { date: 3, intake: 450, norm: 600 },
        { date: 4, intake: 600, norm: 600 },
        { date: 5, intake: 480, norm: 600 },
    ];

    const moodData = [
        { name: 'Happy', value: 60 },
        { name: 'Neutral', value: 25 },
        { name: 'Sad', value: 15 },
    ];

    const activityData = [
        { date: 1, level: 5, norm: 5 },
        { date: 2, level: 4, norm: 5 },
        { date: 3, level: 6, norm: 5 },
        { date: 4, level: 5, norm: 5 },
        { date: 5, level: 6, norm: 5 },
    ];

    return (
        <>
            <h2 className={styles.sectionTitle}>{pet.name}'s Statistics for {month} {year}</h2>

            <div className={styles.statisticsRow}>
                <div className={styles.statisticItem}>
                    <h3>Activity Level (Current Month)</h3>
                    <BarChart width={250} height={200} data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: 'Day', position: 'insideBottom', offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="level" fill="#66bf7b" name="Activity Level" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </BarChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Food Intake vs. Norm (Current Month)</h3>
                    <LineChart width={250} height={200} data={foodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: 'Day', position: 'insideBottom', offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            align="center"
                            layout="horizontal"
                            verticalAlign="bottom"
                            wrapperStyle={{ paddingTop: '15px', textAlign: 'right' }} />
                        <Line type="monotone" dataKey="intake" stroke="#4caf50" name="Food Intake" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </LineChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Water Intake vs. Norm (Current Month)</h3>
                    <LineChart width={250} height={200} data={foodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: 'Day', position: 'insideBottom', offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            align="center"
                            layout="horizontal"
                            verticalAlign="bottom"
                            wrapperStyle={{ paddingTop: '15px' }}
                        />
                        <Line type="monotone" dataKey="intake" stroke="#4caf50" name="Water Intake" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </LineChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Mood Distribution</h3>
                    <PieChart width={300} height={250}>
                        <Pie data={moodData} dataKey="value" outerRadius={80}>
                            {moodData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={['#4caf50', '#ff9800', '#f44336'][index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            align="right"
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={{ paddingLeft: '20px' }}  // Added space between legend and pie chart
                        />
                    </PieChart>
                </div>
            </div>
        </>
    );
};

export default PetStatistics;
