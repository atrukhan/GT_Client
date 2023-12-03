import React, {useContext} from 'react'
import './style.css'
import { Context } from '../../index';
import { MdDashboard, MdForum, MdLocalLibrary, MdViewKanban, MdOutlineInventory, MdPersonOutline, MdInsights, MdOutlineReport, MdSettings, MdLogout } from "react-icons/md";

export const Aside = () => {

    const store = useContext(Context)

    const handleMenuClick = (num) => {
        store.setMainComponent(num)
    }


    return (
    <aside>
        <div className="sidebar">
            <a className={store.mainComponent == store.mainComponents.main ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.main)}}>
                <span><MdDashboard /></span>
                <h3>Main</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.chat ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.chat)}}>
                <span><MdForum /></span>
                <h3>Chat</h3>
                <span className="message-count">27</span>
            </a>
            <a className={store.mainComponent == store.mainComponents.library ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.library)}}>
                <span><MdLocalLibrary /></span>
                <h3>Libraries</h3>
            </a>
            <a>
                <span><MdViewKanban /></span>
                <h3>Test</h3>
            </a>
            <a>
                <span><MdOutlineInventory /></span>
                <h3>Rules</h3>
            </a>
            <a>
                <span><MdPersonOutline /></span>
                <h3>Friend</h3>
            </a>
            <a>
                <span><MdInsights /></span>
                <h3>Analytic</h3>
            </a>
            <a>
                <span><MdOutlineReport /></span>
                <h3>Reports</h3>
            </a>
            <a>
                <span><MdSettings /></span>
                <h3>Settings</h3>
            </a>
            <a>
                <span><MdLogout /></span>
                <h3>Logout</h3>
            </a>
        </div>
    </aside>
    )
}

export default Aside