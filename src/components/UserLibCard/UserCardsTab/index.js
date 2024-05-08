import React, {useContext, useState, useEffect} from 'react'
import './style.css'
import { Context } from '../../../index';
import UserCard from '../UserCard'
import AddCard from '../AddCard'
import AddCardNew from '../AddCardNew';
import axios from "../../../api/axios";
import { MdArrowBackIos } from "react-icons/md";

const UserCardsTab = ({libId}) => {

    const [update, setUpdate] = useState(false)
    const [addFormVisability, setAddFormVisability] = useState(false)
    const [cards, setCards] = useState(null)
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

    return (
    <div className='main-wrapper'>
        <div className='title'>
            <a className="back" onClick={() => {handleCloseLibrary()}}>
                <span><MdArrowBackIos /></span>
            </a>
            <h1>Cards</h1>
        </div>
        
        <div className="analyse analyse_cards">
            <AddCard handleClick={setAddFormVisability}/>
            
            {
         
            cards?.map((element) => {
                return ( <UserCard value={element.value} translation={element.translation} example={element.example} key={element.id} />)  
            })
            }
        </div>
        <AddCardNew libId={libId} visability={addFormVisability} handleAddCard={handleAddCard} setVisability={setAddFormVisability}/>
    </div>
    )
}

export default UserCardsTab