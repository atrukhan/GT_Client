import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const LibsForm = ({type, visability, handleStart, setVisability}) => {

    const [ids, setIds] = useState([])
    const [libs, setLibs] = useState(null)

    useEffect(() => {

        if (visability == true) {
            getLibs().then(res => {
                setLibs(res)
            })
        }

    }, [visability]);

    useEffect(() => {

        if (visability == true) {
            getLibs().then(res => {
                setLibs(res)
            })
        }

    }, []);

    const getLibs = async () => {
        try {
            const response = await axios.post('/api/user/user_libs')
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const handleClose = () => {
        setVisability(false)
        setIds([])
    }
    
    const handleCheckbox = (e, id) => {
        if(e.target.value == 1){
            setIds([...ids, id])
        }else{
            setIds(ids?.map(el => {
                if(el.id == id)
                    return el
            }))
        }
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_checkboxlist}>
                    <div className={styles.library_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>Выберите наборы</h1>
                        <div className={styles.block_checkbox}>
                            {libs?.map(el => {
                                return (
                                    <label className={styles.tasks_list_item} key={el.id}>
                                        <input type="checkbox" value="1" className={styles.tasks_list_cb} onChange={e => handleCheckbox(e, el.id)}/>
                                        <span className={styles.tasks_list_mark}></span>
                                        <span className={styles.tasks_list_desc}>{el.title}</span>
                                    </label>
                                )
                            })}

                        </div>
                        <div className={styles.block_item}>
                            <button className={styles.button_addlibrary} onClick={() => handleStart(type, ids)}>Начать</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default LibsForm