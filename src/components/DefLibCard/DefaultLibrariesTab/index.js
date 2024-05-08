import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../../index';
import LibraryItem from '../DefaultLibrary'
import axios from "../../../api/axios";

const DefaultLibrariesTab = ({ title, isUserLibs, handleOpenLibrary }) => {

    const [libraryId, setLibraryId] = useState(-1)
    const [libraries, setLibraries] = useState(null)


    const getDefaultLibs = async () => {

        try {
            const response = await axios.post('/api/user/def_libs')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }

    }

    useEffect(() => {
        getDefaultLibs().then(result => setLibraries(result))
    }, []);

    const handleShowCards = (id) => {
        setLibraryId(id)
    }

  

    return (
        <div className='main-wrapper'>
            <h1>All Libraries</h1>
            <div className="analyse analyse_lib">

                {libraries?.map((element) => {
                    return (<LibraryItem name={element.title} count={element.cardsCount} code={element.code}  handleClick={handleOpenLibrary} id={element.id} key={element.id} />)
                })}

            </div>

        </div>
    )
}

export default DefaultLibrariesTab