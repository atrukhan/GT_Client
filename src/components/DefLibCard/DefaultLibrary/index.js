import React, {useEffect, useContext, useState} from 'react'
import styles from './style.module.scss'
import { Context } from '../../../index';
import { MdOutlineInventory, MdCopyAll} from "react-icons/md";

const DefaultLibrary = ({name, count, code, id}) => {

    const store = useContext(Context)

    const handleClick = () => {
        store.setDefaultLibraryId(id)
        store.setMainComponent(store.mainComponents.defaultCards)
    }
    
    const handleCopyClick = (event) => {
        event.stopPropagation()
        navigator.clipboard.writeText(code)
    }



  return (

        <div className={styles.status} onClick={(event) => {handleClick(id)}}>
            <div className={styles.info}>
                <h1>{name}</h1>
                <h2>{count} Карточек</h2>
            </div>
            <div className={styles.settings_training}>
                <a onClick={(event) => {handleCopyClick(event)}}><span><MdCopyAll /></span></a>
            </div>
        </div>
  )
}

export default DefaultLibrary