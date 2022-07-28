import React from "react";
import { Link } from "react-router-dom";

import logo from '../../images/logo.svg';

function Login(){
    return(
        <section className="user-auth">
            <Link exact to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Рады видеть!
                </h1>
                <form className="user-auth__form">
                    <label className="user-auth__name-input">
                        E-mail
                        <input type="email" placeholder='Введите E-mail' className="user-auth__input user-auth__input_bold" />
                        <span className="validation-error"></span>
                    </label>
                    <label className="user-auth__name-input">
                        Пароль
                        <input type="password" placeholder='Введите пароль' className="user-auth__input" />
                        <span className="validation-error">Что-то пошло не так...</span>
                    </label>
                </form>
                <button type="submit" className="user-auth__btn">Войти</button>
                <div className="user-auth__link-wrapper">
                    <p className="user-auth__link-text">
                        Ещё не зарегистрированы?
                    </p>
                    <Link to="/signup" className="user-auth__link">
                        Регистрация
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Login;

