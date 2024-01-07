import React, {useContext, useState, useEffect} from 'react'
import './style.css'
import { Context } from '../../index';
import AddCard from '../AddCard'
import CardsItem from '../CardsItem'
import LibraryForm from '../AddLibrary';
import { MdArrowBackIos } from "react-icons/md";

const Cards = ({libId, handleCloseLibrary}) => {

    const [update, setUpdate] = useState(false)
    const store = useContext(Context)

    useEffect(() => {
        store.getCards(libId, () => {setUpdate(!update)}); 
    },[]);

    return (
    <div>
        <div className='title'>
            <a className="back" onClick={() => {handleCloseLibrary()}}>
                <span><MdArrowBackIos /></span>
            </a>
            <h1>Cards</h1>
        </div>
        
        <div className="analyse analyse_cards">
            <AddCard libId={libId} callback={() => {setUpdate(!update)}}/>
        
            {
            // store.libraries.filter((el) => el.id == libId)[0].cards?.map((element) => {
            store.cards?.map((element) => {
                return ( <CardsItem value={element.value} translation={element.translation} example={element.example} key={element.id} />)  
            })
            }
        </div>
    </div>
    )
}

export default Cards