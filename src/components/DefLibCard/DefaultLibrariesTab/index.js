import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import DefaultLibrary from '../DefaultLibrary'
import axios from "../../../api/axios";
import { useTranslation } from "react-i18next";

const DefaultLibrariesTab = ({ title, isUserLibs, handleOpenLibrary }) => {

    const [libraryId, setLibraryId] = useState(-1)
    const [libraries, setLibraries] = useState(null)
    const [filterLibraries, setFilterLibraries] = useState(null)
    const [filterLibTitle, setFilterLibTitle] = useState("")

    const { t, i18n } = useTranslation();

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
        getDefaultLibs().then(result => {
            setLibraries(result)
            setFilterLibraries(result)
            setFilterLibTitle("")
        })
    }, []);

    const handleShowCards = (id) => {
        setLibraryId(id)
    }

    const filterLibs = (val) => {
        setFilterLibTitle(val)
        setFilterLibraries(libraries.filter(el => el.title.toLowerCase().startsWith(val.toLowerCase())))
    }


    return (
        <div className={styles.main_wrapper}>
            <div className={styles.filter_wrapper}>
                <h1 style={{ width: '20%' }}>{t('def_lib_card.def_libs_tab.title')}</h1>
                <div className={styles.input_box}>
                    <input type="text" placeholder={t('search')} onChange={e => filterLibs(e.target.value)} />
                </div>
            </div>

            <div className={`${styles.analyse} ${styles.analyse_lib}`}>

                {filterLibraries?.map((element) => {
                    return (<DefaultLibrary name={element.title} count={element.cardsCount} code={element.code} handleClick={handleOpenLibrary} id={element.id} key={element.id} />)
                })}

            </div>

        </div>
    )
}

export default DefaultLibrariesTab