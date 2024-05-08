import React, { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { registerables, Chart } from "chart.js";


const AnalyticTab = () => {

    Chart.register(...registerables);

    const barData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
        datasets: [
            {
                label: "My Revenue",
                data: [380, 200, 500, 300, 200, 400, 100],
                backgroundColor: ["rgb(135,73,227)"],
                hoverBackgroundColor: "#540be8",
            },
        ],
    }

    const doughnutData = {
        labels: ["Fashion", "Gadjet", "Other"],
        datasets: [
            {
                label: "My Revenue",
                data: [380, 200, 500],
                backgroundColor: [
                    "rgba(155,128,151,1)",
                    "rgba(254,111,162,1)",
                    "rgba(244,164,111,1)",
                ],
                hoverBackgroundColor: "#ff90b8",
            },
        ],
    }

    const lineData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Monthly Income",
                data: [2235, 3250, 1890, 5400, 20240, 6254,  12325, 4856, 10325, 2254, 22356, 8486],
                backgroundColor: "#5D2BFF",
                borderColor: "#5D2BFF",
                borderRadius: 6,
                cubicInterpolationMode: 'monotone',
                fill: false,
                borderSkipped: false,
            },
        ],
    }

    const lineOptions = {
        interaction: {
            intersect: false,
            mode: 'index'
        },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                padding: {bottom: 8},
                font: {
                    size: 0,
                    weight: "normal",
                },
            },
            tooltip: {
                backgroundColor: "whitesmoke",
                bodyColor: "#272626",
                yAlign: "bottom",
                cornerRadius: 4,
                titleColor: "#272626",
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        if (context.parsed.y !== null) {
                            const label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            return label;
                        }
                        return null;
                    }
                }
            },
        },
        scales: {
            x: {
                border: {
                    dash: [4, 4],
                },
                title: {
                    text: "2023",
                },
            },
            y: {
                grid: {
                    color: "#27292D",
                },
                border: {
                    dash: [1, 2],
                },
                title: {
                    display: true,
                    padding: {bottom: 0}
                },
            },
        },
    }

    return (
        <div>
            {/* https://ftapi.pythonanywhere.com/translate?sl=ru&dl=en&text=%D1%80%D0%B0%D0%B1 */}
            <div className={styles.grid}>
                <div className={`${styles.grid_item} ${styles.big}`}>
                    <div className={styles.big_flex}>
                        <h1 className={styles.title_date}>Date</h1>
                        <Bar
                            data={barData}
                            width={100}
                            height={50}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }} />
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.tiny}`}>
                    <div className={styles.tiny_flex}>
                        <h1 className={styles.title_themes}>Themes</h1>
                        <Doughnut data={doughnutData}
                            options={{
                                responsive: true,
                            }} />
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_words}>Your Words</h1>
                        <p className={styles.number_words}>4,122</p>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_result}>Today's Result</h1>
                        <p className={styles.number_result}>100–120</p>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.long}`}>
                    <div className={styles.block_activity}>
                        <h1 className={styles.title_activity}>Activity</h1>
                        <div className={styles.widget}>
                        <Line data={lineData}
                            options={lineOptions} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_level}>Language Lavel</h1>
                        <p className={styles.number_level}>A1</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticTab