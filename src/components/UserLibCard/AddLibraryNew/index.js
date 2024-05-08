import React, { useState } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const AddLibraryNew = ({ visability, handleAddLib, setVisability }) => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const createLib = async () => {
        try {
            const response = await axios.post('/api/user/user_lib_create', { "title": title })
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const copyLib = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_create/${code}`, { "title": title })
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const handleAddClick = async () => {
        if(code === '')
            createLib().then(result => handleAddLib(result))
        else
            copyLib().then(result => handleAddLib(result))
    }

    const handleClose = () => {
        setVisability(false)
        setCode("")
        setTitle("")
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_library}>
                    <div className={styles.library_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>New Library</h1>
                        <input type="text" className={styles.input_library} placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
                        <input type="text" className={styles.input_library} placeholder="Copy by code" onChange={(e) => { setCode(e.target.value) }} />
                        <div className={styles.block_item}>
                            <button className={styles.button_addlibrary} onClick={() => { handleAddClick() }}>Add</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => {handleClose()}}></div>
        </div>
    )
}

export default AddLibraryNew