import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";

const AddCardNew = ({ type, card, libId, visability, handleAddCard, handleEditCard, handleDeleteCard, setVisability }) => {

    const [value, setValue] = useState("");
    const [translation, setTranslation] = useState("");
    const [example, setExample] = useState("");
    const [valueDirty, setValueDirty] = useState(false);
    const [translationDirty, setTranslationDirty] = useState(false);
    const [exampleDirty, setExampleDirty] = useState(false);
    const [valueError, setValueError] = useState('Значение карточки не может быть пустым');
    const [translationError, setTranslationError] = useState('Перевод карточки не может быть пустым');
    const [exampleError, setExampleError] = useState('');
    const [validation, setValidation] = useState(false);

    const translateRef = useRef(null)


    useEffect(() => {

        if (type === 'Edit' && visability == true) {

            setValue(card.value)
            setValueError('')
            setTranslation(card.translation)
            setTranslationError('')
            setExample(card.example)
            setExampleError('')
        }

    }, [visability]);

    useEffect(() => {

        if (valueError || translationError || exampleError) {
            setValidation(false)
        } else {
            setValidation(true)
        }


    }, [valueError, translationError, exampleError]);


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

    const editCard = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_card_update/${libId}/${card.id}`, { "value": value, "transcription": null, "translation": translation, "example": example })
            if (response.status == 200)
                return response.data
            else
                return null
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const deleteCard = async () => {
        try {
            const response = await axios.post(`/api/user/user_lib_card_delete/${libId}/${card.id}`)
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
            if (result != null) {
                setTranslation(result.translations["possible-translations"][0])
            }
        })
    }

    const handleBtnClick = async () => {
        if (type === 'Add') {
            createCard().then(result => handleAddCard(result))
        }

        if (type === 'Edit') {
            editCard().then(result => handleEditCard(result))
        }

        handleClose()
    }

    const handleDeleteClick = async () => {

        deleteCard().then(result => handleDeleteCard(result))


        handleClose()
    }

    const valueHandler = (e) => {
        setValue(e.target.value)
        if (e.target.value.length < 1) {
            setValueError('Значение карточки не может быть пустым')
        } else {
            if (e.target.value.length > 25) {
                setValueError('Значение карточки не может быть длинее 25 символов')
            } else {
                setValueError('')
            }
        }
    }

    const translationHandler = (e) => {
        setTranslation(e.target.value)
        if (e.target.value.length < 1) {
            setTranslationError('Перевод карточки не может быть пустым')
        } else {
            if (e.target.value.length > 25) {
                setTranslationError('Перевод карточки не может быть длинее 25 символов')
            } else {
                setTranslationError('')
            }
        }
    }

    const exampleHandler = (e) => {
        setExample(e.target.value)

        if (e.target.value.length > 50) {
            setExampleError('Пример карточки не может быть длинее 50 символов')
        } else {
            setExampleError('')
        }

    }

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'value':
                setValueDirty(true)
                break
            case 'translation':
                setTranslationDirty(true)
                break
            case 'example':
                setExampleDirty(true)
                break
        }
    }

    const handleClose = () => {
        setVisability(false)
        setValue("")
        setTranslation("")
        setExample("")

        setValueDirty(false)
        setTranslationDirty(false)
        setExampleDirty(false)
        setValueError('Значение карточки не может быть пустым')
        setTranslationError('Перевод карточки не может быть пустым')
        setExampleError('')
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_card}>
                    <div className={styles.card_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>{type === 'Add' ? 'Добавить' : 'Изменить'} карточку</h1>
                        {(valueDirty && valueError) && <p className={styles.validation_text}>{valueError}</p> ||
                            (translationDirty && translationError) && <p className={styles.validation_text}>{translationError}</p> ||
                            (exampleDirty && exampleError) && <p className={styles.validation_text}>{exampleError}</p>}
                        <input onBlur={e => blurHandle(e)} name='value' type="text" className={styles.input_card} value={value} placeholder="Название" onChange={e => valueHandler(e) } />
                        <input onBlur={e => blurHandle(e)} name='translation' type="text" className={styles.input_card} value={translation} placeholder="Перевод" onChange={e =>  translationHandler(e) } />
                        <textarea onBlur={e => blurHandle(e)} name='example' type="text" className={styles.inputtext_card} value={example} placeholder="Пример" onChange={e =>  exampleHandler(e) } ></textarea>
                        <div className={styles.block_item}>
                            <p className={styles.create_example} onClick={() => { handleTranslateClick() }}><a className={styles.link}>Автоперевод</a></p>
                            {type === 'Edit' && <button className={styles.button_addcard} onClick={() => { handleDeleteClick() }}>Удалить</button>}
                            <button disabled={!validation} className={styles.button_addcard} onClick={() => { handleBtnClick() }}>{type === 'Add' ? 'Добавить' : 'Изменить'}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default AddCardNew