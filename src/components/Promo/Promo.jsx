import React from "react";

import web from '../../images/picture-web.svg';
import '../Promo/Promo.css';

function Promo(){
    return(
        <section className="main-page">
            <div className="main-page__wrapper">
                <div className="main-page__info">
                    <h1 className="main-page__title">
                        Учебный проект студента факультета Веб-разработки.
                    </h1>
                    <p className="main-page__text">
                        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                    </p>
                </div>
                <img src={web} alt="Иллюстрация планеты" className="main-page__img" />
            </div>
            <a href="#about-project" className="learn-more-btn">Узнать больше</a>
        </section>
    );
}

export default Promo;