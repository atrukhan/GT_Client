import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import DefaultCard from '../DefaultCard'
import axios from "../../../api/axios";
import { MdArrowBackIos } from "react-icons/md";
import { useTranslation } from "react-i18next";

const DefaultCardsTab = ({ libId }) => {

    const [update, setUpdate] = useState(false)
    const [cards, setCards] = useState(null)
    const [filteredCards, setFilteredCards] = useState(null)
    const [filterCardValue, setFilterCardValue] = useState("")
    const store = useContext(Context)
    const { t, i18n } = useTranslation();

    const getDefaultCards = async (libId) => {
        try {
            const response = await axios.post(`/api/user/def_lib_cards/${libId}`)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {

        getDefaultCards(libId).then(result => {
            setCards(result)
            setFilteredCards(result)
            setFilterCardValue("")
        });


    }, []);

    const handleCloseLibrary = () => {
        store.setMainComponent(store.mainComponents.allLibraries)
    }

    const filterCards = (val) => {
        setFilterCardValue(val)
        setFilteredCards(cards.filter(el => el.value.toLowerCase().startsWith(val.toLowerCase())))
    }

    return (
        <div className={styles.main_wrapper}>
            <div className={styles.filter_wrapper}>
                <div className={styles.title}>
                    <a className={styles.back} onClick={() => { handleCloseLibrary() }}>
                        <span><MdArrowBackIos /></span>
                    </a>
                    <h1 style={{ width: '20%' }}>{t('def_lib_card.def_cards_tab.title')}</h1>
                </div>
                <div className={styles.input_box}>
                    <input type="text" placeholder={t('search')} onChange={e => filterCards(e.target.value)} />
                </div>
            </div>


            <div className={`${styles.analyse} ${styles.analyse_cards}`}>

                {

                    filteredCards?.map((element) => {
                        return (<DefaultCard value={element.value} translation={element.translation} example={element.example} key={element.id} />)
                    })
                }
            </div>
        </div>
    )
}

export default DefaultCardsTab