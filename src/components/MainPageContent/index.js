import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Aside from '../Aside';
import styles from './styles.module.scss'
import { Context } from '../../index';
import UserLibrariesTab from '../UserLibCard/UserLibrariesTab';
import DefaultLibrariesTab from '../DefLibCard/DefaultLibrariesTab';
import DefaultCardsTab from '../DefLibCard/DefaultCardsTab';
import UserCardsTab from '../UserLibCard/UserCardsTab';
import TestsTab from '../TestsTab';
import AnalyticTab from '../AnalyticTab'
import SettingsTab from '../SettingsTab';
import MessengerTab from '../Messenger/MessengerTab';
import axios from "../../api/axios";
import TrainingTab from '../TrainingTab';

const MainPageContent = ({ user, setUser }) => {

    const store = useContext(Context)
    const [update, setUpdate] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        store.setCallbackMainComponent((v) => { setUpdate(v) })
    }, [])




    const loadMainComponent = () => {
        switch (store.mainComponent) {
            case store.mainComponents.allLibraries:
                return <DefaultLibrariesTab />;
            case store.mainComponents.defaultCards:
                return <DefaultCardsTab libId={store.defaultLibraryId} />;
            case store.mainComponents.myLibraries:
                if (user != null)
                    return <UserLibrariesTab/>;
                else {
                    navigate('/auth')
                    store.setMainComponent(store.mainComponents.allLibraries)
                }
            case store.mainComponents.userCards:
                if (user != null)
                    return <UserCardsTab libId={store.userLibraryId} />;
                else {
                    navigate('/auth')
                    store.setMainComponent(store.mainComponents.allLibraries)
                }
            case store.mainComponents.tests:
                return <TestsTab />;
            case store.mainComponents.messenger:
                if (user != null)
                    return <MessengerTab />;
                else {
                    navigate('/auth')
                    store.setMainComponent(store.mainComponents.allLibraries)
                }
            case store.mainComponents.analytic:
                if (user != null)
                    return <AnalyticTab />;
                else {
                    navigate('/auth')
                    store.setMainComponent(store.mainComponents.allLibraries)
                }
            case store.mainComponents.settings:
                if (user != null)
                    return <SettingsTab />;
                else {
                    navigate('/auth')
                    store.setMainComponent(store.mainComponents.allLibraries)
                }
            case store.mainComponents.training:
                return <TrainingTab trainingId={store.trainingId} />
        }
    }

    return (
        <div className={styles.page_container}>
            <Aside user={user} setUser={setUser}/>
            <main>
                {loadMainComponent()}
            </main>
            
        </div>


    )
}

export default MainPageContent