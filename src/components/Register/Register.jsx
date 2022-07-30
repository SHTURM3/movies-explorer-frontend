import React from "react";
import { Link } from "react-router-dom";

import logo from '../../images/logo.svg'
import '../Register/Register.css';

function Register(){
    return(
        <section className="user-auth">
            <Link exact to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Добро пожаловать!
                </h1>
                <form className="user-auth__form">
                    <label className="user-auth__name-input">
                        Имя
                        <input type="text" placeholder="Введите имя" className="user-auth__input" required={true} />
                        <span className="validation-error"></span>
                    </label>
                    <label className="user-auth__name-input">
                        E-mail
                        <input type="email" placeholder='Введите E-mail' className="user-auth__input user-auth__input_bold user-auth__input_green" required={true} />
                        <span className="validation-error"></span>
                    </label>
                    <label className="user-auth__name-input">
                        Пароль
                        <input type="password" placeholder='Введите пароль' className="user-auth__input user-auth__input_error" required={true} />
                        <span className="validation-error validation-error_active">Что-то пошло не так...</span>
                    </label>
                </form>
                <button type="submit" className="user-auth__btn">Зарегистрироваться</button>
                <div className="user-auth__link-wrapper">
                    <p className="user-auth__link-text">
                        Уже зарегистрированы?
                    </p>
                    <Link to="/signin" className="user-auth__link">
                        Войти
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Register;