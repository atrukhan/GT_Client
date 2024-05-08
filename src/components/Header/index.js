import React, { useContext, useRef, useEffect, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import 'font-awesome/css/font-awesome.min.css'
import { Context } from '../../index'
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md"

const Header = ({ user }) => {

    const store = useContext(Context)

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        store.setCallbackDarkMode((v) => { setUpdate(v) })
    }, [])

    const handleDarkMode = () => {
        store.setDarkMode(!store.isDarkMode)
    }

    return (
        <div className={styles.header}>
            <div className={styles.toggle} >
                <div className={styles.logo}>
                    <img alt='logo' src="/logo.svg" />
                    <h2>Grammer<span className={styles.danger}>Trakker</span></h2>
                </div>
            </div>

            <div className={styles.nav}>
                <div className={styles.dark_mode} onClick={handleDarkMode}>
                    <span className={store.isDarkMode ? '' : styles.active}><MdLightMode /></span>
                    <span className={store.isDarkMode ? styles.active : ''}><MdDarkMode /></span>
                </div>

                {user != null ? (
                    <div className={styles.profile}>
                        <div>
                            <p>Hey, <b>{user.nickname}</b></p>
                        </div>
                        <div className={styles.profile_photo}>
                            <img src="/default_avatar.jpg" />
                        </div>
                    </div>
                ) : (
                    <div className={styles.profile}>
                        <Link to="/auth"><button className={styles.button_avatar}>Sign In</button></Link>
                    </div>
                )}

            </div>
        </div>

    )
}

export default Header