import React from 'react'
import './style.css'

function LibraryForm({handleClick}) {
  return (
    <form action="" method="POST" >
        <div className="form_library" >
            <div className="library_block">
                <h1 htmlFor="" onClick={() => {handleClick()}}>New Library</h1>
                <div className="status">
                    <input type="text" className="input_library" placeholder="Name Library"/>
                    <button type="submit" name="add_library" className="button_addlibrary" >add</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default LibraryForm