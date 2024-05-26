import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss'
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
    const [addFormType, setAddFormType] = useState('Add')
    const [addFormLibId, setAddFormLibId] = useState(-1)
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

    const handleEditLib = (lib) => {
        setLibraries(libraries.map(e => {
            if(e.id == lib.id) 
                return lib
            else
                return e
        }))
    }

    const handleDeleteLib = (lib) => {
        setLibraries(libraries.filter(e => e.id != lib.id))
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

    const handleAddLibraryClick = () => {
        setAddFormType('Add')
        setAddFormVisability(true)
    }

    const handleEditClick = (id) => {
        setAddFormType('Edit')
        setAddFormLibId(id)
        setAddFormVisability(true)
    }

    const getLibById = (id) => {
        return libraries?.find(e => e.id == id)
    }

    return (
        <div className={styles.main_wrapper}>
            <h1>Мои наборы</h1>

            <div className={`${styles.analyse} ${styles.analyse_lib}`}>

                <AddLibrary handleClick={handleAddLibraryClick}/>

                {libraries?.map((element) => {
                    return (<UserLibrary name={element.title} count={element.cardsCount} code={element.code} isFavorite={false} id={element.id} handleEdit={handleEditClick} handleTraining={handleTraining} key={element.id} />)
                })}

            </div>
            <AddLibraryNew type={addFormType} visability={addFormVisability} lib={getLibById(addFormLibId)} handleEditLib={handleEditLib} handleDeleteLib={handleDeleteLib} handleAddLib={handleAddLib} setVisability={setAddFormVisability}/>
            {loadTrainingsFormComponent()}
            
        </div>
    )
}

export default UserLibrariesTab