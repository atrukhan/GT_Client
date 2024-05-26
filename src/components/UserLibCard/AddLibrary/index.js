import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'

function AddLibrary({handleClick}) {

    return (
        <div className={styles.add} onClick={() => { handleClick()}}>
            <div>
                <h1>+</h1>
            </div>
        </div>
    )
}

export default AddLibrary