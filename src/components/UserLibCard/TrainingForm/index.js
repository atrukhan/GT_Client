import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const TrainingForm = ({ libId, visability, handleStartTraining, setVisability }) => {

    const [trainings, setTrainings] = useState(null)

    const getTrainings = async () => {
        try {
            const response = await axios.get(`/api/user/trainings/${libId}`)
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    useEffect(() => {

        getTrainings().then(result => setTrainings(result))
        

    }, []);

    const handleClose = () => {
        setVisability(false)
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_training}>
                    <div className={styles.training_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>Trainings</h1>

                        {trainings?.map((element) => {
                            console.log(element)
                            return (
                                <div className={styles.input_library} disabled={!element.available} 
                                    onClick={() => {handleStartTraining(element.id)}} key={element.id}>
                                    Repetition period: {element.period} days 
                                    Training date: {new Date(element.nextDate).toLocaleString("en", {year: 'numeric', month: 'long', day: 'numeric', timezone: 'UTC'})} 
                                    Missed days: {Math.floor((Date.now() - Date.parse(element.nextDate)) / (1000*60*60*24))}
                                </div>
                            )
                        })}

                        {/* <input type="text" className={styles.input_library} placeholder="Name Library" disabled />
                        <input type="text" className={styles.input_library} placeholder="Name Library" />
                        <input type="text" className={styles.input_library} placeholder="Name Library" />
                        <input type="text" className={styles.input_library} placeholder="Name Library" />
                        <input type="text" className={styles.input_library} placeholder="Name Library" /> */}
                        {/* <div className={styles.block_item}>
                            <button className={styles.button_addlibrary}>Add</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default TrainingForm