import React, {useState, useContext} from 'react'
import './style.css'
import { Context } from '../../index';
import LibraryItem from '../LibrariesItem'
import LibraryForm from '../LibrariesForm'

const Library = () => {

    const [formVisability, setFormVisability] = useState(false);
    const store = useContext(Context)

    const handleAddClick = () => {
        setFormVisability(!formVisability)
    }

    return (
    <div className='main'>
        <h1>Libraries</h1>
        <div className="analyse">
            {formVisability ? (
                <LibraryForm handleClick={handleAddClick}/>
            ) : ( 
                <div className="add" onClick={() => {handleAddClick()}}>
                    <div className="plus">
                        <h1 className="add_plus">+</h1>
                    </div>
                </div>
            )}
            {store.libraries.map((element, index) => {
              return ( <LibraryItem name={element.name} count={element.cardsCount} percent={element.percent} key={index} />)  
            })}
         
        </div>
        
    </div>
    )
}

export default Library