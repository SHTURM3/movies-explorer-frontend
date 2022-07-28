import React from "react";
import { useHistory } from "react-router-dom";

import '../Profile/Profile.css';

function Profile(){
    const history = useHistory();
    return(
        <section class="user">
                <div class="user__wrapper">
                    <h1 class="user__title">
                        Привет, Владимир!
                    </h1>
                    <form class="user__form">
                        <label class="user__name-input">
                            Имя
                            <input type="text" placeholder='Введите имя' class="user__input" required={true} />
                        </label>
                        <label class="user__name-input">
                            E-mail
                            <input type="email" placeholder='Введите E-mail' class="user__input" required={true} />
                        </label>
                    </form>
                    <button type="submit" class="user__change-btn">Редактировать</button>
                    <button type="button" onClick={() => history.goBack()} class="user__exit-btn">Выйти из аккаунта</button>
                </div>
            </section>
    );
}

export default Profile;