import React, {useContext, useState} from 'react'
import './style.css'
import { Context } from '../../index';
import Libraries from '../Libraries';
import Cards from '../Cards';

const LibraryTab = () => {

    const [libraryId, setLibraryId] = useState(-1)
    const store = useContext(Context)

    const handleOpenLibrary = (id) => {
        store.libraryId = id
        setLibraryId(id)
    }

    const handleCloseLibrary = () => {
        store.cards = null;
        setLibraryId(-1)
    }

    return (
        <div>
            {libraryId < 0 ? (
                <Libraries handleOpenLibrary={handleOpenLibrary}/>
            ) : ( 
                <Cards libId={libraryId} handleCloseLibrary={handleCloseLibrary}/>
            )}
        </div>
    )
}

export default LibraryTab