import React, { useState, useContext, useEffect } from 'react'
import './style.css'
import { Context } from '../../index';
import LibraryItem from '../LibrariesItem'
import AddLibrary from '../AddLibrary'
import axios from "../../api/axios";

const Libraries = ({ title, isUserLibs, handleOpenLibrary }) => {

    const [libraryId, setLibraryId] = useState(-1)
    const [libraries, setLibraries] = useState(null)

    const getUserLibs = async () => {
        try {
            const response = await axios.post('/api/user/user_libs')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    useEffect(() => {
   
        getUserLibs().then(result => setLibraries(result))

    }, []);

    const handleShowCards = (id) => {
        setLibraryId(id)
    }


    return (
        <div className='main-wrapper'>
            <h1>{title}</h1>

            <div className="analyse analyse_lib">

                <AddLibrary callback={(id) => { handleShowCards(id) }} />

                {libraries?.map((element) => {
                    return (<LibraryItem name={element.title} count={element.cardsCount} percent={element.learnedPercentage} isFavorite={false} handleClick={handleOpenLibrary} id={element.id} isUserLibs={isUserLibs} key={element.id} />)
                })}

            </div>

        </div>
    )
}

export default Libraries