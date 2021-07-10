import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';
import { registerables } from 'chart.js';

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
            
        fetchAPI();
    }, [setDailyData]);

    const lineChart = (
        dailyData.length
       ? (
        <Line
            data={{
                labels: dailyData.map(({ date })=> date),
                datasets: [{
                    data: dailyData.map(({ confirmed })=> confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths })=> deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backbroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }], /*two data sets istead of 3 because the API only offers deaths and cases but not recovered*/
            }}
        />) : null
    );

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;