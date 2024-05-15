import React, { useEffect, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import { MdSettings, MdOutlineInventory, MdCopyAll } from "react-icons/md";

const UserLibrary = ({ name, count, code, id, handleTraining }) => {

    const store = useContext(Context)

    const handleClick = () => {
        store.setUserLibraryId(id)
        store.setMainComponent(store.mainComponents.userCards)
    }

    const handleTrainingClick = (event) => {
        event.stopPropagation()
        handleTraining(id)
    }

    const handleCopyClick = (event) => {
        event.stopPropagation()
        navigator.clipboard.writeText(code)
    }

    return (

        <div className={styles.status} onClick={(event) => { handleClick(id) }}>
            <div className={styles.info}>
                <h1>{name}</h1>
                <h2>{count} Cards</h2>
            </div>
            <div className={styles.settings_training}>
                <a onClick={(event) => {handleCopyClick(event)}}><span><MdCopyAll /></span></a>
                <a onClick={(event) => { event.stopPropagation(); }}><span><MdSettings /></span></a>
                <a onClick={(event) => { handleTrainingClick(event) }}><span><MdOutlineInventory /></span></a>
            </div>
        </div>
    )
}

export default UserLibrary