import React, {useState, useContext} from 'react'
import './style.css'
import { Context } from '../../index';

const AddCard = ({libId, callback}) => {

  const [formVisability, setFormVisability] = useState(false);
  const [value, setValue] = useState("")
  const [translation, setTranslation] = useState("")
  const store = useContext(Context)
  

  const handlePlusClick = () => {
    setFormVisability(!formVisability)
  }

  const handleAddClick = async () => {
    await store.createCard(libId, value, translation)
    setFormVisability(!formVisability)
    callback()
  }

  return (
   
    <div className={formVisability ? 'form_card' : 'add'} onClick={!formVisability ? () => {handlePlusClick()} : () => {}}>
      {formVisability ? (
            <div className="card_block">
                <h1>New Card</h1>
                <input type="text" className="input_card" placeholder="Value" onChange={(e) => {setValue(e.target.value)}}/>
                <input type="text" className="input_card" placeholder="Translation" onChange={(e) => {setTranslation(e.target.value)}}/>
                <div className="block_item">
                    <button className="button_addcard" onClick={() => {handlePlusClick()}}>Cancel</button>
                    <button className="button_addcard" onClick={() => {handleAddClick()}}>Add</button>
                </div>
            </div>
      ) : ( 
          <div className="plus">
            <h1 className="add_plus">+</h1>
          </div>
      )}
      
    </div>
  )
}

export default AddCard