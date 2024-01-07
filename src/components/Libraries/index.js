import React, {useState, useContext, useEffect} from 'react'
import './style.css'
import { Context } from '../../index';
import LibraryItem from '../LibrariesItem'
import AddLibrary from '../AddLibrary'
import Card from '../Cards';

const Libraries = ({handleOpenLibrary}) => {


    
    const [libraryId, setLibraryId] = useState(-1)

    
    const store = useContext(Context)

    useEffect(() => {
       
        if (store.isAuth == true){
            store.getUserLibs((id) => {handleShowCards(id)});
        }
        
    },[]);

    const handleShowCards = (id) => {
        setLibraryId(id)
    }

    return (
    <div className='main'>
        <h1>Libraries</h1>
        
        <div className="analyse analyse_lib">
            <AddLibrary callback={(id) => {handleShowCards(id)}}/>
            
            {
            store.libraries?.map((element) => {
              return ( <LibraryItem name={element.title} count={element.cardsCount} percent={element.learnedPercentage} handleClick={handleOpenLibrary} id={element.id} key={element.id} />)  
            })
            }
       
        </div>
        
    </div>
    )
}

export default Libraries