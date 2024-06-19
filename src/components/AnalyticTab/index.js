import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import axios from "../../api/axios";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { registerables, Chart } from "chart.js";
import { useTranslation } from "react-i18next";


const AnalyticTab = () => {

    Chart.register(...registerables);
    const [wordsCount, setWordsCount] = useState(0)
    const [mistakesPercent, setMistakesPercent] = useState(0)
    const [testsCount, setTestsCount] = useState(0)
    const [doughnutData, setDoughnutData] = useState({
        labels: [],
        datasets: [],
    })
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: [],
    })
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [],
    })

    const { t, i18n } = useTranslation();

    const getUserLibs = async () => {
        try {
            const response = await axios.post('/api/user/user_libs')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const getEntryDates = async () => {
        try {
            const response = await axios.get('/api/user/entry_dates')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const getTestData = async () => {
        try {
            const response = await axios.get('/api/user/test_data')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    useEffect(() => {
   
        getUserLibs().then(result => {
            let sum = 0
            result.map(e => {return e.cardsCount}).forEach(element => {
                sum += element
            });
            setWordsCount(sum)
            setDoughnutData({
                labels: result.map(e => {return e.title}), 
                datasets: [
                    {
                        label: t('analytic.charts.cards'),
                        data: result.map(e => {return e.cardsCount}),
                        backgroundColor: [
                            "rgba(155,128,151,1)",
                            "rgba(254,111,162,1)",
                            "rgba(244,164,111,1)",
                        ],
                        hoverBackgroundColor: "#ff90b8",
                    },
                ],
            })
        })

        getEntryDates().then(result => {
            let countByMonth = new Array(12).fill(0); 
  
            result.forEach(element => {
              let month = new Date(element.date).getMonth()
              countByMonth[month]++
            });

            setBarData({
                labels: [
                    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
                    t('months.may'), t('months.june'), t('months.july'), t('months.aug'),
                    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
                ],
                datasets: [
                    {
                        label: t('analytic.charts.entries'),
                        data: countByMonth,
                        backgroundColor: ["rgb(135,73,227)"],
                        hoverBackgroundColor: "#540be8",
                    },
                ],
            })
        })

        getTestData().then(result => {
            setTestsCount(result.length)
            let countByMonth = new Array(12).fill(0)
            let percent = 0

            result.forEach(element => {
              let month = new Date(element.date).getMonth()
              countByMonth[month]++
              percent += element.mistakesCount / element.cardsCount * 100
            });

            setMistakesPercent(percent / result.length)

            setLineData({
                labels: [
                    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
                    t('months.may'), t('months.june'), t('months.july'), t('months.aug'),
                    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
                ],
                datasets: [
                    {
                        label: t('analytic.charts.tests'),
                        data: countByMonth,
                        backgroundColor: "#5D2BFF",
                        borderColor: "#5D2BFF",
                        borderRadius: 6,
                        cubicInterpolationMode: 'monotone',
                        fill: false,
                        borderSkipped: false,
                    },
                ],
            })
        })
    }, []);

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
                // callbacks: {
                //     label: function(context) {
                //         if (context.parsed.y !== null) {
                //             const label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                //             return label;
                //         }
                //         return null;
                //     }
                // }
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

            <div className={styles.grid}>
                <div className={`${styles.grid_item} ${styles.big}`}>
                    <div className={styles.big_flex}>
                        <h1 className={styles.title_date}>{t('analytic.activity')}</h1>
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
                        <h1 className={styles.title_themes}>{t('analytic.sets')}</h1>
                        <Doughnut data={doughnutData}
                            options={{
                                responsive: true,
                            }} />
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_words}>{t('analytic.cards')}</h1>
                        <p className={styles.number_words}>{wordsCount}</p>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_result}>{t('analytic.completed_tests')}</h1>
                        <p className={styles.number_result}>{testsCount}</p>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.long}`}>
                    <div className={styles.block_activity}>
                        <h1 className={styles.title_activity}>{t('analytic.tests')}</h1>
                        <div className={styles.widget}>
                        <Line data={lineData}
                            options={lineOptions} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.grid_item} ${styles.regular}`}>
                    <div className={styles.block_item}>
                        <h1 className={styles.title_level}>{t('analytic.mistakes_percent')}</h1>
                        <p className={styles.number_level}>{mistakesPercent.toPrecision(4)}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticTab