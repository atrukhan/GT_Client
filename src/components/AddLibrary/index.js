import React, {useContext, useState} from 'react'
import './style.css'
import { Context } from '../../index';

function AddLibrary({callback}) {

  const [formVisability, setFormVisability] = useState(false);
  const [title, setTitle] = useState("");
  const store = useContext(Context)
  

  const handlePlusClick = () => {
    setFormVisability(!formVisability)
  }

  const handleAddClick = async () => {
    await store.createLib(title)
  
    setFormVisability(!formVisability)
    callback()
  }

  return (
   
    <div className={formVisability ? 'form_library' : 'add'} onClick={!formVisability ? () => {handlePlusClick()} : () => {}}>
      {formVisability ? (
        // <div className="library_block">
        //   <h1 htmlFor="">New Library</h1>
        //   <div className="status">
        //     <input type="text" className="input_library" placeholder="Name Library"/>
        //     <button type="submit" name="add_library" className="button_addlibrary" >Add</button>
        //   </div>
        // </div>
      

        <div className="card_block">
          <h1>New Library</h1>
          <input type="text" className="input_card" placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
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

export default AddLibrary