import React, {useContext, useState, useEffect} from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import DefaultCard from '../DefaultCard'
import axios from "../../../api/axios";
import { MdArrowBackIos } from "react-icons/md";

const DefaultCardsTab = ({libId}) => {

    const [update, setUpdate] = useState(false)
    const [cards, setCards] = useState(null)
    const store = useContext(Context)

    const getDefaultCards = async(libId) => {
        try {
            const response = await axios.post(`/api/user/def_lib_cards/${libId}`) 
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {
    
        getDefaultCards(libId).then(result => setCards(result)); 

    },[]);

    const handleCloseLibrary = () => {
        store.setMainComponent(store.mainComponents.allLibraries)
    }

    return (
    <div className={styles.main_wrapper}>
        <div className={styles.title}>
            <a className={styles.back} onClick={() => {handleCloseLibrary()}}>
                <span><MdArrowBackIos /></span>
            </a>
            <h1>Cards</h1>
        </div>
        
        <div className={`${styles.analyse} ${styles.analyse_cards}`}>
        
            {
         
            cards?.map((element) => {
                return ( <DefaultCard value={element.value} translation={element.translation} example={element.example} key={element.id} />)  
            })
            }
        </div>
    </div>
    )
}

export default DefaultCardsTab