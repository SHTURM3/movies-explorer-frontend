import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from '../../utils/auth';

import { regExpEmail } from "../../utils/constants";

import { useFormWithValidation } from "../../utils/formValidation";

import logo from '../../images/logo.svg';
import '../Login/Login.css';

function Login({setLoggedIn}){

    const history = useHistory();

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const [serverError, setServerError] = useState('');

//Авторизация пользователя
function handleLogin(email,password){
    return auth.authorize(email,password)
    .then((data) => {
        if(!data.token){
            setServerError('Токен передан неккоректно');
            return;
        } else{
            localStorage.setItem('jwt', data.token);
            setLoggedIn(true);
            history.push("/movies");    
        };
    })
    .catch((err) => {
        if(err.statusCode === 401){
            setServerError('Логин и пароль не верны');
        } else if(err.statusCode === 500) {
            setServerError('Сервер не отвечает');
        } else {
            setServerError('При авторизации пользователя произошла ошибка');
        }
    })
};

//Отправка формы    
    function handleSubmit(e){
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }

        handleLogin(values.email, values.password)
    };

    return(
        <section className="user-auth">
            <Link to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Рады видеть!
                </h1>
                <form id="login" className="user-auth__form" onSubmit={handleSubmit} noValidate>
                    <label className="user-auth__name-input">
                        E-mail

                        <input 
                            type="email" 
                            name="email"
                            id="email" 
                            value={values.email || ''} 
                            onChange={handleChange}
                            pattern={regExpEmail} 
                            placeholder='Введите E-mail' 
                            className={`user-auth__input ${errors.email ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />
                        
                        <span 
                            id="email-error" 
                            className="validation-error_active"  
                        >
                            {errors.email || ''}
                        </span>    
                    </label>
                    <label className="user-auth__name-input">
                        Пароль

                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            value={values.password || ''} 
                            onChange={handleChange} 
                            placeholder='Введите пароль' 
                            className={`user-auth__input ${errors.password ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            id="password-error" 
                            className="validation-error_active"
                        >
                            {errors.password || ''}
                        </span>    
                    </label>
                </form>
                <span className="server">{serverError}</span>
                <button form="login" type="submit" className={`user-auth__btn ${isValid ? '' : 'user-auth__btn_disabled'}`} disabled={isValid ? false : true}>Войти</button>
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

