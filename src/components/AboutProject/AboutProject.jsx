import React from "react";



import '../AboutProject/AboutProject.css';

function AboutProject() {
    return(
        <section className="about" id="about-project">
            <h2 className="section-title">
                О проекте
            </h2>
            <div className="about-info">
                <ul className="about-info__list">
                    <li className="about-info__item">
                        <h3 className="about-info__item-title">
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className="about-info__item-text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </li>
                    <li className="about-info__item">
                        <h3 className="about-info__item-title">
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className="about-info__item-text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </li>
                </ul> 
            </div>
                
            <div className="about-periods">
                <div className="about-periods__first-block">
                    <p className="about-periods__text">
                        1 неделя
                    </p>
                </div>
                <div className="about-periods__second-block">
                    <p className="about-periods__text">
                        4 недели
                    </p>
                </div>
            </div>
            <div className="about-periods-names">
                <div className="about-periods-names__first-block">
                    <p className="about-periods-names__text">
                        Back-end
                    </p>
                </div>
                <div className="about-periods-names__second-block">
                    <p className="about-periods-names__text">
                        Front-end
                    </p>
                </div>
            </div>
        </section>        
    );
}

export default AboutProject;