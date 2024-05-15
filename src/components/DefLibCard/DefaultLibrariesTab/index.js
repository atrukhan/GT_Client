import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import DefaultLibrary from '../DefaultLibrary'
import axios from "../../../api/axios";

const DefaultLibrariesTab = ({ title, isUserLibs, handleOpenLibrary }) => {

    const [libraryId, setLibraryId] = useState(-1)
    const [libraries, setLibraries] = useState(null)


    const getDefaultLibs = async () => {

        try {
            const response = await axios.post('/api/user/def_libs')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }

    }

    useEffect(() => {
        getDefaultLibs().then(result => setLibraries(result))
    }, []);

    const handleShowCards = (id) => {
        setLibraryId(id)
    }

  

    return (
        <div className={styles.main_wrapper}>
            <h1>All Libraries</h1>
            <div className={`${styles.analyse} ${styles.analyse_lib}`}>

                {libraries?.map((element) => {
                    return (<DefaultLibrary name={element.title} count={element.cardsCount} code={element.code}  handleClick={handleOpenLibrary} id={element.id} key={element.id} />)
                })}

            </div>

        </div>
    )
}

export default DefaultLibrariesTab