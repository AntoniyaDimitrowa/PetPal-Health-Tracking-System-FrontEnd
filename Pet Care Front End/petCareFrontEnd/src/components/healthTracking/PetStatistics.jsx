import React, { useEffect, useState } from "react";
import styles from "./StatisticsPanel.module.css";
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
} from "recharts";
import { getHealthDataForCurrentMonth } from "../../services/HealthTrackingService";

const PetStatistics = ({ pet }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const healthData = await getHealthDataForCurrentMonth(pet.id);
                setData(healthData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pet.id]);

    const renderNoDataMessage = () => (
        <>
            <h2 className={styles.sectionTitle}>
                {pet.name}'s Statistics for {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
            </h2>

            <div className={styles.noDataMessage}>
                <p>No health data available for {pet.name} for this month.</p>
            </div>
        </>

    );

    const renderCharts = () => (
        <>
            <h2 className={styles.sectionTitle}>
                {pet.name}'s Statistics for {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
            </h2>

            <div className={styles.statisticsRow}>
                <div className={styles.statisticItem}>
                    <h3>Activity Level (Current Month)</h3>
                    <BarChart width={250} height={200} data={data.activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: "Day", position: "insideBottom", offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="level" fill="#66bf7b" name="Activity Level" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </BarChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Food Intake vs. Norm (Current Month)</h3>
                    <LineChart width={250} height={200} data={data.foodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: "Day", position: "insideBottom", offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="intake" stroke="#4caf50" name="Food Intake" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </LineChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Water Intake vs. Norm (Current Month)</h3>
                    <LineChart width={250} height={200} data={data.waterData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: "Day", position: "insideBottom", offset: -4 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="intake" stroke="#4caf50" name="Water Intake" />
                        <Line type="monotone" dataKey="norm" stroke="#f44336" name="Norm" />
                    </LineChart>
                </div>

                <div className={styles.statisticItem}>
                    <h3>Mood Distribution</h3>
                    <PieChart width={300} height={250}>
                        <Pie data={data.moodData} dataKey="value" outerRadius={80}>
                            {data.moodData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={["#4caf50", "#ff9800", "#f44336"][index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            align="right"
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={{ paddingLeft: "20px" }}
                        />
                    </PieChart>
                </div>
            </div>
        </>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return data.activityData.length > 0 ? renderCharts() : renderNoDataMessage();
};

export default PetStatistics;
