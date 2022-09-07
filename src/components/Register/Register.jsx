import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import * as auth from '../../utils/auth';

import { regExpEmail, regExpName } from "../../utils/constants";

import { useFormWithValidation } from "../../utils/formValidation";

import logo from '../../images/logo.svg'
import '../Register/Register.css';

function Register({setLoggedIn}){

//Стейт с ошибками регистрации
    const [registerError, setRegisterError] = useState('');

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const history = useHistory();

//Авторизация пользователся(в данной компоннте требуется для случая если регистрация пользователя прошла успешно)
function handleLogin(email,password){
    return auth.authorize(email,password)
    .then((data) => {
        console.log(data)
        if(!data.token){
            setRegisterError('Токен передан неккоректно');
        } else if(!data){
            setRegisterError('Такого пользователя не существует');
        } else{
            localStorage.setItem('jwt', data.token);
            setLoggedIn(true);
            history.push('/movies');    
        };
    })
    .catch((err) => {
        if(err.statusCode === 401){
            setRegisterError('Логин и пароль не верны');
        } else if(err.statusCode === 500) {
            setRegisterError('Сервер не отвечает');
        } else {
            setRegisterError('При авторизации пользователя произошла ошибка');
        }
    })
};
  
//Регистрация пользователя
    function handleRegister (name, email, password) {
        localStorage.setItem('userInfo', JSON.stringify({name, email, password}));
        return auth.register(name, email, password)
        .then((data) => {
            if(data){
                const localUserInfo = localStorage.getItem('userInfo');
                const localUserParse = JSON.parse(localUserInfo);
                console.log(localUserParse);
                handleLogin(localUserParse.email, localUserParse.password);
            } else{
                setRegisterError('Проверьте правильность введенных данных')
            };
        })
        .catch((err) => {
            if (err.statusCode === 409) {
                setRegisterError('Пользователь с таким email уже существует');
            } else if(err.code === 11000){
                setRegisterError('Такой пользователь уже существует');
            }else if(err.statusCode === 500) {
                setRegisterError('Сервер не отвечает');
            } else {
                setRegisterError('При регистрации пользователя произошла ошибка');
            }    
        })
    };
    
    
//Отправка формы
      function handleSubmit(e){
        e.preventDefault();
        let { name, email, password } = values;
        handleRegister( name, email, password )
          .catch((err) => {
            if (err.statusCode === 409) {
                setRegisterError('Пользователь с таким email уже существует');
            } else if(err.statusCode === 500) {
                setRegisterError('Сервер не отвечает');
            } else {
                setRegisterError('При регистрации пользователя произошла ошибка');
            } 
          });
      }

    return(
        <section className="user-auth">
            <Link exact to='/'>
                <img src={logo} alt="Логотип" className="header__logo header__logo_center" />    
            </Link>
            <div className="user-auth__wrapper">
                <h1 className="user-auth__title">
                    Добро пожаловать!
                </h1>
                <form id="register" onSubmit={handleSubmit} className="user-auth__form" noValidate>
                    <label className="user-auth__name-input">
                        Имя

                        <input 
                            type="text"
                            id="name" 
                            name="name" 
                            value={values.name || ''} 
                            onChange={handleChange} 
                            minLength='2' 
                            maxLength='40'
                            pattern={regExpName}
                            placeholder="Введите имя" 
                            className={`user-auth__input ${errors.name ? 'user-auth__input_error' : 'user-auth__input_green'}`}
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            className="validation-error_active"
                            id="name-error"
                        >
                            {errors.name || ''}
                        </span>
                    </label>
                    <label className="user-auth__name-input">
                        E-mail

                        <input 
                            type="email" 
                            name="email" 
                            value={values.email || ''} 
                            onChange={handleChange}
                            pattern={regExpEmail}
                            placeholder='Введите E-mail' 
                            className={`user-auth__input ${errors.email ? 'user-auth__input_error' : 'user-auth__input_green'}`} 
                            autoComplete="off" 
                            required={true} 
                        />

                        <span 
                            className="validation-error_active"
                            id="email-error"
                        >
                            {errors.email || ''}
                        </span>
                    </label>
                    <label className="user-auth__name-input">
                        Пароль

                        <input 
                            type="password" 
                            name="password" 
                            value={values.password || ''} 
                            onChange={handleChange} 
                            placeholder='Введите пароль' 
                            className={`user-auth__input ${errors.password ? 'user-auth__input_error' : 'user-auth__input_green' }`}
                            autoComplete="off" 
                            required={true}
                        />
                        <span 
                            className="validation-error_active"
                            id="password-error"
                        >
                            {errors.password || ''}
                        </span>
                    </label>
                    
                </form>
                <span 
                    className="register-error"
                >
                    {registerError || ''}
                </span>
                <button form="register" type="submit" className={`user-auth__btn ${isValid ? '' : 'user-auth__btn_disabled'}`} disabled={isValid ? false : true}>Зарегистрироваться</button>
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