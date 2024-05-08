import React, {useContext} from 'react'
import './style.css'
import { Context } from '../../index';
import { MdDashboard, MdForum, MdLocalLibrary, MdViewKanban, MdOutlineInventory, MdPersonOutline, MdInsights, MdOutlineReport, MdSettings, MdLogout } from "react-icons/md";

export const Aside = ({user, setUser}) => {

    const store = useContext(Context)

    const handleMenuClick = (num) => {
        store.setMainComponent(num)
    }

    const handleLogoutClick = () => {
        setUser(null)
        store.logout()
    } 

    const loadLogoutComponent = () => {
        if (user != null) {
            return (
            <a className='last-child' onClick={()=>{handleLogoutClick()}}>
                <span><MdLogout /></span>
                <h3>Logout</h3>
            </a>
            ); 
        }
      }


    return (
    <aside>
        <div className="sidebar">
            <a className={store.mainComponent == store.mainComponents.allLibraries ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.allLibraries)}}>
                <span><MdDashboard /></span>
                <h3>All Libraries</h3>
            </a>
          
            <a className={store.mainComponent == store.mainComponents.myLibraries ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.myLibraries)}}>
                <span><MdLocalLibrary /></span>
                <h3>My Libraries</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.tests ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.tests)}}>
                <span><MdViewKanban /></span>
                <h3>Tests</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.messenger ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.messenger)}}>
                <span><MdForum /></span>
                <h3>Messenger</h3>
                <span className="message-count">27</span>
            </a>
            <a className={store.mainComponent == store.mainComponents.friends ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.friends)}}>
                <span><MdPersonOutline /></span>
                <h3>Friends</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.analytic ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.analytic)}}>
                <span><MdInsights /></span>
                <h3>Analytic</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.settings ? 'active' : ''} onClick={()=>{handleMenuClick(store.mainComponents.settings)}}>
                <span><MdSettings /></span>
                <h3>Settings</h3>
            </a>
            {loadLogoutComponent()}
            
        </div>
    </aside>
    )
}

export default Aside