import React from "react";

import avatar from '../../images/avatar.jpeg'
import '../AboutMe/AboutMe.css';

function AboutMe(){
    return(
        <section className="profile">
            <h2 className="section-title">
                Студент
            </h2>
            <div className="profile__wrapper">
                <div className="profile__info">
                    <h1 className="profile__name">
                        Владимир
                    </h1>
                    <p className="profile__short-desc">
                        Фронтенд-разработчик, 24 года
                    </p>
                    <p className="profile__desc">
                        Я проживаю в Балашихе, закончил факультет международных отношений МосГУ и факультет управления проектами университета Синергия. У меня есть жена и дочь. Я люблю слушать музыку, играть в компьютерные игры и ходить в спортзал. Недавно начал кодить. После того, как прошёл курс по веб-разработке, активно ищу работу веб-разработчиком.
                    </p>
                    <div className="profile__links">
                        <a href="https://ru-ru.facebook.com/" target='_blank' rel="noreferrer" className="profile__link">
                            Facebook
                        </a>
                        <a href="https://github.com/SHTURM3" target='_blank' rel="noreferrer" className="profile__link">
                            Github
                        </a>
                    </div>
                </div>
                <img src={avatar} alt="Фотография студента" className="profile__avatar" />
            </div>
        </section>
    );
}

export default AboutMe;