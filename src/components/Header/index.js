import React, {useContext, useRef, useEffect, useState, useLayoutEffect} from 'react'
import './style.css'
import {useNavigate} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import { Context } from '../../index'
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md"




const Header = () => {

    const store = useContext(Context)
    const navigate = useNavigate();
    const avatar_ref = useRef(null);

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        store.setCallbackDarkMode((v) => {setUpdate(v)})
    }, [])

    const handleLoginBtn = () => {
        store.setAuthType('login')
        navigate('auth', {replace: true})
    }

    const handleRegisterBtn = () => {
        store.setAuthType('register')
        navigate('auth', {replace: true})
    }

    const handleDarkMode = () => {
      store.setDarkMode(!store.isDarkMode)
    }

    return (
      <div className='header'>
        <div className="toggle" >
            <div className="logo">
                <img src="/logo.svg"/>
                <h2>Grammer<span className="danger">Trakker</span></h2>
            </div>
            <div className="close" id="close-btn">
                <span><MdClose/></span>
            </div>
            <button id="menu-btn">
                <span><MdMenu/></span>
            </button>
        </div>

        <div className="nav">
            <div className="dark-mode" onClick={handleDarkMode}>
                <span className={store.isDarkMode ? '' : 'active'}><MdLightMode/></span>
                <span className={store.isDarkMode ? 'active' : ''}><MdDarkMode/></span>
            </div>

            <div className="profile">
                <div className="info">
                    <p>Hey, <b>Egor</b></p>
                    <small className="text-muted">Admin</small>
                </div>
                <div className="profile-photo">
                    <img src="/avatar.jpg"/>
                </div>
            </div>
        </div>
      </div>
      
    )
}

export default Header