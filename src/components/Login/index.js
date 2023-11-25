import React, {useState, useRef, useEffect, useContext} from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from '../../api/axios'
import {useNavigate} from 'react-router-dom'
import { Context } from '../../index';

const Login = () => {


    const [data, setData] = useState({
        nickname: "",
        email: "",
        password: "",
    });

    const store = useContext(Context)

    const navigate = useNavigate();
    const login_btn_ref = useRef(null);
    const register_btn_ref = useRef(null);
    const line_ref = useRef(null);
    const content_login_ref = useRef(null);
    const content_register_ref = useRef(null);
    let login_btn, register_btn, line, content_login, content_register;

    useEffect(() => {
        login_btn = login_btn_ref.current;
        register_btn = register_btn_ref.current;
        console.log(register_btn)
        line = line_ref.current;
        content_login = content_login_ref.current;
        content_register = content_register_ref.current;
    
    });

    useEffect(() => {
        if (store.authType === 'register'){
            handleShowRegister();
        }
    },[]);

    const handleShowRegister = () => {
        login_btn.classList.remove('tabs__item_active')
        register_btn.classList.add('tabs__item_active')

        line.classList.remove('tabs__line-login')
        line.classList.add('tabs__line-register')

        content_login.classList.remove('tabs__content_show')
        content_register.classList.add('tabs__content_show')

        setData({
            nickname: "",
            email: "",
            password: "",
        })
    }

    const handleShowLogin = () => {
        register_btn.classList.remove('tabs__item_active')
        login_btn.classList.add('tabs__item_active')

        line.classList.remove('tabs__line-register')
        line.classList.add('tabs__line-login')
        
        content_register.classList.remove('tabs__content_show')
        content_login.classList.add('tabs__content_show')

        setData({
            nickname: "",
            email: "",
            password: "",
        })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const isAuth = await store.login(data.email, data.password)
        if (isAuth == true){
            navigate('/')
        }else{

        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        store.registration(data.nickname, data.email, data.password)
        handleShowLogin();
    }

    const handleData = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const handleHome = () => {
        navigate('/')
    }

  return (
    <div className="auth-layout">
      <div className="auth-layout__row">
        <div className="auth-layout__cell">
            <div className="auth-form-title">Авторизация</div>
            <div className="auth-form tabs">
                <a onClick={handleHome} className="auth-form-back link-home">
                    <i className="fa fa-home"></i>
                </a>
                <ul className="tabs__list ul-login">
                    <li className="tabs__item tabs__item_active" ref={login_btn_ref} onClick={handleShowLogin}>
                        <span>Вход</span>
                    </li>
                    <li className="tabs__item" ref={register_btn_ref} onClick={handleShowRegister}>
                        <span>Регистрация</span>
                    </li>
                    <div className="tabs__line tabs__line-login" ref={line_ref} ></div>
                </ul>

                <div className="tabs__content tabs__content_show" ref={content_login_ref}>
                    <form method="POST" action="" acceptCharset="UTF-8" className='form-login'>
                        <div className="form__field">
                            <div className="form__input-wrap">
                                <input onChange={(e) => handleData(e)} id='email' value={data.email} type="text" name="email" className="form__input form__input_icon input-login" placeholder="Email" required=""/>
                                <span className="form__field-icon"><i className="fa fa-envelope"></i></span>
                            </div>
                        </div>
                        <div className="form__field">
                            <div className="form__input-wrap">
                                <input onChange={(e) => handleData(e)} id='password' value={data.password}  type="password" name="password" className="form__input form__input_icon input-login" placeholder="Пароль" required=""/>
                                <span className="form__field-icon"><i className="fa fa-lock"></i></span>
                            </div>
                        </div>
                        <div className="form__field">
                            <label className="control control_checkbox">
                                <input className="control__input input-login" type="checkbox" name="remember"/>
                                <span className="control__indicator control__indicator_checkbox control__indicator_sm"></span>
                                <span className="control__text">Запомнить меня</span>
                            </label>
                        </div>
                        <div className="form__footer">
                            <button type="submit" className="button-login button_primary-login button_md button_block" onClick={handleLoginSubmit}>Войти</button>
                        </div>

                        <div className="auth-footer">
                            <span className="auth-footer__label">
                                Вы забыли пароль?
                            </span>
                            <a href="/" className='link-login'>
                                Восстановить
                            </a>
                        </div>
                    </form>
                </div>
                <div className="tabs__content" ref={content_register_ref}>
                    <form method="POST" action="/" acceptCharset="UTF-8" className='form-login'>
                        {/* <input name="_token" type="hidden" />
                        <input type="hidden" name="from" /> */}
                        <div className="form__field">
                            <div className="form__input-wrap">
                                <input onChange={(e) => handleData(e)} id='nickname' value={data.nickname}  type="text" name="nickname" className="form__input form__input_icon input-login" placeholder="Никнейм" required=""/>
                                <span className="form__field-icon"><i className="fa fa-user"></i></span>
                            </div>
                        </div>
                        <div className="form__field">
                            <div className="form__input-wrap">
                                <input onChange={(e) => handleData(e)} id='email' value={data.email} type="text" name="email" className="form__input form__input_icon input-login" placeholder="Email" required=""/>
                                <span className="form__field-icon"><i className="fa fa-envelope"></i></span>
                            </div>
                        </div>
                        <div className="form__field">
                            <div className="form__input-wrap">
                                <input onChange={(e) => handleData(e)} id='password' value={data.password} type="password" name="password" className="form__input form__input_icon input-login" placeholder="Пароль" required=""/>
                                <span className="form__field-icon"><i className="fa fa-lock"></i></span>
                            </div>
                        </div>
                        
                        <div className="form__footer">
                            <button type="submit" className="button-login button_primary-login button_md button_block" onClick={handleRegisterSubmit}>Зарегистрироватся</button>
                        </div>

                        <div className="auth-footer">
                            <span className="auth-footer__label">
                                Вы забыли пароль?
                            </span>
                            <a href="/" className='link-login'>
                                Восстановить
                            </a>
                        </div>
                    </form>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login