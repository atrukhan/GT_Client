import React, { useState } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const AddCardNew = ({libId, visability, handleAddCard, setVisability }) => {

    const [value, setValue] = useState("");
    const [translation, setTranslation] = useState("");
    const [example, setExample] = useState("");

    const createCard = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_card_create/${libId}`, { "value": value, "transcription": null, "translation": translation, "example": example })
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const translateValue = async () => {
        try {
            const response = await axios.get(`/api/user/translate/en/${value}`)
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const handleTranslateClick = async () => {
        translateValue().then(result => {
            if(result != null){
                const json_obj = JSON.parse(result)
                setTranslation(JSON.stringify(json_obj.get("translations").get("possible-translations")[0]))
            }
        })
    }

    const handleAddClick = async () => {
        createCard().then(result => handleAddCard(result))
    }

    const handleClose = () => {
        setVisability(false)
        setValue("")
        setTranslation("")
        setExample("")
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_card}>
                    <div className={styles.card_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>New Card</h1>
                        <input type="text" className={styles.input_card} placeholder="Name Card" onChange={(e) => { setValue(e.target.value) }} />
                        <input type="text" className={styles.input_card} placeholder="Translate Library" onChange={(e) => { setTranslation(e.target.value) }} />
                        <textarea type="text" className={styles.inputtext_card} placeholder="Example Library" onChange={(e) => { setExample(e.target.value) }} ></textarea>
                        <div className={styles.block_item}>
                            <p className={styles.create_example} onClick={() => { handleTranslateClick() }}><a className={styles.link}>GoogTranslate</a></p>
                            <button className={styles.button_addcard} onClick={() => { handleAddClick() }}>add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default AddCardNew