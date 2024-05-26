import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const AddLibraryNew = ({ type, visability, lib, handleAddLib, handleEditLib, handleDeleteLib, setVisability }) => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [titleDirty, setTitleDirty] = useState(false);
    const [codeDirty, setCodeDirty] = useState(false);
    const [titleError, setTitleError] = useState('Название набора не может быть пустым');
    const [codeError, setCodeError] = useState('');
    const [validation, setValidation] = useState(false);

    useEffect(() => {

        if(type === 'Edit' && visability == true){
            console.log(lib.title)
            setTitle(lib.title)
            setTitleError('')
        }

    }, [visability]);

    useEffect(() => {

        if(titleError || codeError){
            setValidation(false)
        }else{
            setValidation(true)
        }
        

    }, [titleError, codeError]);

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

    const editLib = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_update/${lib.id}`, { "title": title })
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const deleteLib = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_delete/${lib.id}`)
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const handleBtnClick = async () => {
        if(type === 'Add'){
            if (code === '')
                createLib().then(result => handleAddLib(result))
            else
                copyLib().then(result => handleAddLib(result))
        } 

        if(type === 'Edit'){
            editLib().then(result => handleEditLib(result))
        }

        handleClose()
    }

    const handleDeleteClick = async () => {
       
        deleteLib().then(result => handleDeleteLib(result))
        

        handleClose()
    }

    const handleClose = () => {
        setVisability(false)
        setCode("")
        setTitle("")
        setCodeDirty(false)
        setTitleDirty(false)
        setCodeError('')
        setTitleError('Название набора не может быть пустым')
    }

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                break
            case 'code':
                setCodeDirty(true)
                break
        }
    }

    const titleHandler = (e) => {
        setTitle(e.target.value)
        if (e.target.value.length < 1) {
            setTitleError('Название набора не может быть пустым')
        } else {
            if (e.target.value.length > 25) {
                setTitleError('Название набора не может быть длинее 25 символов')
            } else {
                setTitleError('')
            }
        }
    }

    const codeHandler = (e) => {
        setCode(e.target.value)
        if (e.target.value.length == 0) {
            setCodeError('')
        } else {
            if (e.target.value.length != 32) {
                setCodeError('Код должен состоять из 32 символов')
            }
        }
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_library} style={type === 'Edit' ? {height: '220px'} : {}}>
                    <div className={styles.library_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>{type === 'Add' ? 'Добавить' : 'Изменить'} набор</h1>
                        
                        {(titleDirty && titleError) && <p className={styles.validation_text}>{titleError}</p> || (codeDirty && codeError) && <p className={styles.validation_text}>{codeError}</p>}
                        <input type="text" onBlur={e => blurHandle(e)} name='title' className={styles.input_library} value={title} placeholder="Название" onChange={e => titleHandler(e)} />
                        {}
                        {type === 'Add' && <input type="text" onBlur={e => blurHandle(e)} name='code' className={styles.input_library} value={code} placeholder="Скопировать с помощью кода" onChange={e => codeHandler(e)} />}
                        <div className={styles.block_item}>
                            {type === 'Edit' && <button className={styles.button_addlibrary} onClick={() => { handleDeleteClick() }}>Удалить</button>}
                            <button disabled={!validation} className={styles.button_addlibrary} onClick={() => { handleBtnClick() }}>{type === 'Add' ? 'Добавить' : 'Изменить'}</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default AddLibraryNew