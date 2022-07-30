import React from "react";

import '../Techs/Techs.css';

function Techs(){
    return(
        <section className="technologies">
            <h2 className="section-title">
                Технологии
            </h2>
            <div className="technologies-info">
                <h1 className="technologies-info__title">
                    7 технологий
                </h1>
                <p className="technologies-info__text">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
            </div>
            <ul className="technologies__list">
                <li className="technologies__item">
                    <p className="technologies__name">
                        HTML
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        CSS
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        JS
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        React
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        Git
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        Express.js
                    </p>
                </li>
                <li className="technologies__item">
                    <p className="technologies__name">
                        mongoDB
                    </p>
                </li>
            </ul>
        </section>
    );
}

export default Techs;