import React, {useContext, useState, useEffect} from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import UserCard from '../UserCard'
import AddCard from '../AddCard'
import AddCardNew from '../AddCardNew';
import axios from "../../../api/axios";
import { MdArrowBackIos } from "react-icons/md";

const UserCardsTab = ({libId}) => {

    const [update, setUpdate] = useState(false)
    const [addFormVisability, setAddFormVisability] = useState(false)
    const [addFormCardId, setAddFormCardId] = useState(-1)
    const [cards, setCards] = useState(null)
    const [addFormType, setAddFormType] = useState('Add')

    const store = useContext(Context)

    const getUserCards = async(libId) => {
        try {
            const response = await axios.post(`/api/user/user_lib_cards/${libId}`) 
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {
    
        getUserCards(libId).then(result => setCards(result)); 

    },[]);

    const handleCloseLibrary = () => {
        store.setMainComponent(store.mainComponents.myLibraries)
    }

    const handleAddCard = (card) => {
        setCards([...cards, card])
    }

    const handleEditClick = (id) => {
        setAddFormType('Edit')
        setAddFormCardId(id)
        setAddFormVisability(true)
    }

    const handleAddCardClick = () => {
        setAddFormType('Add')
        setAddFormVisability(true)
    }

    const getCardById = (id) => {
        return cards?.find(e => e.id == id)
    }

    const handleEditCard = (card) => {
        setCards(cards.map(e => {
            if(e.id == card.id) 
                return card
            else
                return e
        }))
    }

    const handleDeleteCard = (card) => {
        setCards(cards.filter(e => e.id != card.id))
    }

    return (
    <div className={styles.main_wrapper}>
        <div className={styles.title}>
            <a className={styles.back} onClick={() => {handleCloseLibrary()}}>
                <span><MdArrowBackIos /></span>
            </a>
            <h1>Карточки</h1>
        </div>
        
        <div className={`${styles.analyse} ${styles.analyse_cards}`}>
            <AddCard handleClick={handleAddCardClick}/>
            
            {
         
            cards?.map((element) => {
                return ( <UserCard id={element.id} value={element.value} translation={element.translation} example={element.example} handleEdit={handleEditClick} key={element.id} />)  
            })
            }
        </div>
        <AddCardNew type={addFormType} card={getCardById(addFormCardId)} libId={libId} visability={addFormVisability} handleAddCard={handleAddCard} handleEditCard={handleEditCard} handleDeleteCard={handleDeleteCard} setVisability={setAddFormVisability}/>
    </div>
    )
}

export default UserCardsTab