import React, {useContext, useRef, useEffect, useState, useLayoutEffect} from 'react'
import './style.css'
import {useNavigate} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { Context } from '../../index';




const Header = () => {

    const store = useContext(Context)
    const navigate = useNavigate();
    const avatar_ref = useRef(null);

    const [styles, setStyles] = useState({})
    const [profMenuVisibility, setProfMenuVisibility] = useState({display: 'none'})

    useEffect(() => {
      setStyles({
        transform: `translate(${avatar_ref?.current?.offsetLeft - 180 }px, 60px)`
      })
      const resizeListener = () => {
        setStyles({
          transform: `translate(${avatar_ref?.current?.offsetLeft - 180 }px, 60px)`
        })
      };
  
      window.addEventListener('resize', resizeListener);
  
      return () => {
        window.addEventListener('resize', resizeListener);
      };
    }, []);

    const handleLoginBtn = () => {
        store.setAuthType('login')
        navigate('auth', {replace: true})
    }

    const handleRegisterBtn = () => {
        store.setAuthType('register')
        navigate('auth', {replace: true})
    }

    return (
      <div className='header'>
        <div className='header__inner'>
          <div className='header__item header__logo'>
            <a href='/' className='link-logo'>
              <img src="./Frame.svg" alt="Mangalib"></img>
            </a>
          </div>
          

          <div className='header__item header__menu'>
              {!store.isAuth ? (
                  <div className='header__menu__item'>
                     <span className="search-link" aria-expanded="false">
                      <i className="fa fa-bars"></i>
                      Мои библиотеки
                     </span>
                    
                  </div>
              ) : null}
              <div className='header__menu__item'>
                <span className="search-link">
                  <i className="fa fa-search"></i> Поиск
                </span>
              </div>
          </div>


        
          {!store.isAuth ? (
            <div className='header__item header__auth'>

              <a onClick={handleLoginBtn} className="header-button header__sign header__sign-in" tabIndex="-1">Вход</a>
              <a  onClick={handleRegisterBtn} className="header-button header__sign header__sign-up">Регистрация</a>
  
              <div className="header__auth__item dropdown">
                <div className="header-button__icon tooltip" data-place="bottom-end" aria-label="Сменить тему" data-toggle-theme="">
                  <i className="fa fa-moon-o"></i>
                </div>
              </div>

            </div>
          ) : (
            <div className='header__item header__profile'>

              <div className="header__profile__item dropdown header__profile-button">
                <div className="header__profile-button__icon" data-dropdown="" data-tippy-placement="bottom-end" data-tippy-interactive="true" data-open-notifications="" aria-expanded="false">
                  <i className="fa fa-bell"></i>
                  <div className="notify__count notify__count_bell" data-counter="24">24</div>
                </div>
                <div className="menu-template"></div>
              </div>

              <a className="header__profile__item header__profile-button" >
                <div className="header__profile-button__icon">
                  <i className="fa fa-bookmark-o"></i>
                </div>
              </a>

              <div className="header__profile__item dropdown" ref={avatar_ref}>
                <img src="./Avatar1.svg" className="header__profile__avatar" data-dropdown="" data-tippy-placement="bottom-end" aria-expanded="false"/>
                <div className="menu-template"></div>
              </div>

            </div>
          )}
        
        </div>
        

        <div data-tippy-root="" id="tippy-6" className='tippy' style={{...profMenuVisibility, ...styles}}>
          <div className="tippy-box" data-state="visible" tabIndex="-1" data-theme="dropdown" data-animation="shift-toward" role="tooltip" data-placement="bottom-end">
            <div className="tippy-content" data-state="visible">
              <div className="menu header-dropdown">
                <a className="menu__item" href=""><i className="fa fa-user fa-fw"></i> Профиль пользователя</a>
                <a className="menu__item" href=""><i className="fa fa-bookmark fa-fw"></i> Избранное</a>
                <a className="menu__item" href=""><i className="fa fa-bell fa-fw"></i> Уведомления</a>
                <a className="menu__item" href=""><i className="fa fa-comment fa-fw"></i> Мессенджер</a>
                <a className="menu__item" href=""><i className="fa fa-users fa-fw"></i> Список друзей</a>

                <div className="divider menu__divider"></div>

                <a className="menu__item" href=""><i className="fa fa-cog fa-fw"></i> Настройки</a>
                <a className="menu__item text-danger" href="" id="logout-button"><i className="fa fa-sign-out fa-fw"></i> Выход</a>

              </div>
            </div>
          </div>
        </div>

      </div>
      
    )
}

export default Header