import React, {useState, useEffect} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";

import '../Profile/Profile.css';

function Profile({setCurrentUser, handleSignOut}){

//Подписка на контекст пользователя
    const currentUser = React.useContext(CurrentUserContext);

//Стейт переменные данных пользователя
    const [userName, setUserName] = useState(currentUser.name);
    const [userEmail, setUserEmail] = useState(currentUser.email);

    const [lastName, setLastName] = useState(currentUser.name);
    const [lastEmail, setLastEmail] = useState(currentUser.email);
    
//Стейт переменная блокировки кнопки отправки формы
    const [disabled, setDisabled] = useState(false);

//Стейт переменная ошибок с сервера
    const [profileError, setProfileError] = useState('');

//Обновление информации о пользователе  
    function handleUpdateUser(userInfo) {
        api.setUserInfo(userInfo.userName, userInfo.userEmail)
        .then(res => {
            setCurrentUser({...currentUser,
            name: res.name,
            email: res.email
            });
            setProfileError('Профиль обновлен.')
        })
        .catch(err => {
            if (err.statusCode === 409) {
                setProfileError('Пользователь с таким email уже существует');
              } else {
                setProfileError('При обновлении профиля произошла ошибка');
              }
        })
    };

//Отслеживание изменения инпутов и сохранение изменений в стейте
    function handleNameChange(event){
        const value = event.target.value;
        const validationMessage = event.target.validationMessage;

        setUserName(value);
        if (value !== lastName && !validationMessage) {
            setDisabled(false);
        } else {
            if(value !== lastName){
                setProfileError('Имя не отличается от прежнего')
                setDisabled(true);
            }
            setProfileError(validationMessage);
            setDisabled(true);
        }
    };

    function handleEmailChange(event){
        const value = event.target.value;
        const validationMessage = event.target.validationMessage;

        setUserEmail(value);
        if (value !== lastEmail && !validationMessage) {
            setDisabled(false);
        } else {
            if(value !== lastEmail){
                setProfileError('E-mail не отличается от прежнего')
                setDisabled(true);  
            }
            setProfileError(validationMessage);  
            setDisabled(true);
        }
    };

    function handleSubmit(event){
        event.preventDefault();
        localStorage.setItem('name', userName);
        localStorage.setItem('email', userEmail);
        handleUpdateUser({userName, userEmail});
        setDisabled(false);
    };
    
    useEffect(() =>{
        const localStorageName = localStorage.getItem('name');

        if (localStorageName) {
          setLastName(localStorageName);
        }
        const localStorageEmail = localStorage.getItem('email');

        if (localStorageEmail) {
          setLastEmail(localStorageEmail);
        }
    }, [handleSubmit]);

    useEffect(() => {
        setDisabled(true);
    }, []);

    return(
        <section className="user">
                <div className="user__wrapper">
                    <h1 className="user__title">
                        {`Привет, ${currentUser.name}!`}
                    </h1>
                    <form id="profile" onSubmit={handleSubmit} className="user__form" noValidate>
                        <label className="user__name-input">
                            Имя

                            <input 
                                type="text"
                                id="name" 
                                name="userName" 
                                onChange={handleNameChange}
                                minLength='2' 
                                maxLength='40'
                                pattern="^[A-Za-zА-Яа-яЁё\s-]+$" 
                                value={userName} 
                                placeholder='Введите имя' 
                                className="user__input"
                                autoComplete="off"
                                required={true} 
                            />
                        </label>
                       
                        <label className="user__name-input">
                            E-mail

                            <input 
                                type="email"
                                id="email" 
                                name="userEmail" 
                                onChange={handleEmailChange} 
                                value={userEmail} 
                                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                                placeholder='Введите E-mail' 
                                className="user__input"
                                autoComplete="off"
                                required={true} 
                            />
                        </label>
                    </form>

                    <span 
                        className="server"
                        id="server-error"
                    >
                            {profileError}
                    </span>
                    <button 
                        form="profile" 
                        type="submit" 
                        className={`user__change-btn ${disabled ? 'user__change-btn_disabled' : ''}`} 
                        disabled={disabled}
                    >
                        Редактировать
                    </button>
                    <button type="button" onClick={handleSignOut} className="user__exit-btn">Выйти из аккаунта</button>
                </div>
            </section>
    );
}

export default Profile;