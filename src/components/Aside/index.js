import React, {useContext} from 'react'
import styles from './styles.module.scss'
import { Context } from '../../index';
import { MdDashboard, MdForum, MdLocalLibrary, MdViewKanban, MdOutlineInventory, MdPersonOutline, MdInsights, MdOutlineReport, MdSettings, MdLogout } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const Aside = ({user, setUser}) => {

    const store = useContext(Context)

    const { t, i18n } = useTranslation()

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
            <a className={styles.last_child} onClick={()=>{handleLogoutClick()}}>
                <span><MdLogout /></span>
                <h3>{t('aside.logout')}</h3>
            </a>
            ); 
        }
      }


    return (
    <aside className={styles.aside}>
        <div className={styles.sidebar}>
            <a className={store.mainComponent == store.mainComponents.allLibraries ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.allLibraries)}}>
                <span><MdDashboard /></span>
                <h3>{t('aside.def_libs')}</h3>
            </a>
          
            <a className={store.mainComponent == store.mainComponents.myLibraries ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.myLibraries)}}>
                <span><MdLocalLibrary /></span>
                <h3>{t('aside.my_libs')}</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.tests ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.tests)}}>
                <span><MdViewKanban /></span>
                <h3>{t('aside.tests')}</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.messenger ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.messenger)}}>
                <span><MdForum /></span>
                <h3>{t('aside.messenger')}</h3>
                {/* <span className="message-count">27</span> */}
            </a>
            <a className={store.mainComponent == store.mainComponents.analytic ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.analytic)}}>
                <span><MdInsights /></span>
                <h3>{t('aside.analytic')}</h3>
            </a>
            <a className={store.mainComponent == store.mainComponents.settings ? styles.active : ''} onClick={()=>{handleMenuClick(store.mainComponents.settings)}}>
                <span><MdSettings /></span>
                <h3>{t('aside.settings')}</h3>
            </a>
            {loadLogoutComponent()}
            
        </div>
    </aside>
    )
}

export default Aside