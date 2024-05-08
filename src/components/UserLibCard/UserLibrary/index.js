import React, {useEffect, useContext, useState} from 'react'
import './style.css'
import { Context } from '../../../index';
import { MdSettings, MdOutlineInventory, MdCopyAll} from "react-icons/md";

const UserLibrary = ({name, count, percent, id, handleTraining}) => {

    const store = useContext(Context)

    const handleClick = () => {
        store.setUserLibraryId(id)
        store.setMainComponent(store.mainComponents.userCards)
    }

    const handleTrainingClick = (event) => {
        event.stopPropagation()
        handleTraining(id)
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
                <a onClick={(event) => { event.stopPropagation();}}><span><MdCopyAll /></span></a>
                <a onClick={(event) => { event.stopPropagation();}}><span><MdSettings /></span></a>
                <a onClick={(event) => { handleTrainingClick(event)}}><span><MdOutlineInventory /></span></a>
            </div>
        </div>
  )
}

export default UserLibrary