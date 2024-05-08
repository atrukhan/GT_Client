import React, {useEffect, useContext, useState} from 'react'
import './style.css'
import { Context } from '../../../index';
import { MdOutlineInventory, MdCopyAll} from "react-icons/md";

const DefaultLibrary = ({name, count, code, id}) => {

    const store = useContext(Context)

    const handleClick = () => {
        store.setDefaultLibraryId(id)
        store.setMainComponent(store.mainComponents.defaultCards)
    }
    
    const handleCopyClick = (event) => {
        event.stopPropagation()
        navigator.clipboard.writeText(code)
    }

    const handleTraining = (event) => {
        event.stopPropagation()
        store.setDefaultLibraryId(id)
        store.setMainComponent(store.mainComponents.trainingDefault)
    }

  return (

        <div className="status" onClick={(event) => {handleClick(id)}}>
            <div className="info">
                <h1>{name}</h1>
                <h2>{count} Cards</h2>
            </div>
            {/* <div className="progresss">
                <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                    <p>{percent}%</p>
                </div>
            </div> */}
            <div className='settings-training'>
                <a onClick={(event) => {handleCopyClick(event)}}><span><MdCopyAll /></span></a>
                <a onClick={(event) => { handleTraining(event)}}><span><MdOutlineInventory /></span></a>
            </div>
        </div>
  )
}

export default DefaultLibrary