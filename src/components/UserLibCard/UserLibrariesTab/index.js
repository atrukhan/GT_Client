import React, { useState, useContext, useEffect } from 'react'
import './style.css'
import UserLibrary from '../../UserLibCard/UserLibrary'
import AddLibrary from '../AddLibrary'
import axios from "../../../api/axios";
import AddLibraryNew from '../AddLibraryNew';
import TrainingForm from '../TrainingForm';
import { Context } from '../../../index';

const UserLibrariesTab = ({handleAddClick}) => {

    const store = useContext(Context)

    const [libraryId, setLibraryId] = useState(-1)
    const [libraries, setLibraries] = useState(null)
    const [trainingLibId, setTrainingLibId] = useState(-1)
    const [addFormVisability, setAddFormVisability] = useState(false)
    const [trainingFormVisability, setTrainingFormVisability] = useState(false)

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

    const handleAddLib = (lib) => {
        setLibraries([...libraries, lib])
    }

    const handleTraining = (libId) => {
        setTrainingLibId(libId)
        setTrainingFormVisability(true)
    }

    const handleStartTraining = (id) => {
        store.setTrainingId(id)
        store.setMainComponent(store.mainComponents.training)
    }

    const loadTrainingsFormComponent = () => {
        if(trainingFormVisability){
            return (
                <TrainingForm libId={trainingLibId} visability={trainingFormVisability} handleStartTraining={handleStartTraining} setVisability={setTrainingFormVisability}/>
            )
        }
    }


    return (
        <div className='main-wrapper'>
            <h1>My Libraries</h1>

            <div className="analyse analyse_lib">

                <AddLibrary handleClick={setAddFormVisability}/>

                {libraries?.map((element) => {
                    return (<UserLibrary name={element.title} count={element.cardsCount} percent={element.learnedPercentage} isFavorite={false} id={element.id} handleTraining={handleTraining} key={element.id} />)
                })}

            </div>
            <AddLibraryNew visability={addFormVisability} handleAddLib={handleAddLib} setVisability={setAddFormVisability}/>
            {loadTrainingsFormComponent()}
            
        </div>
    )
}

export default UserLibrariesTab