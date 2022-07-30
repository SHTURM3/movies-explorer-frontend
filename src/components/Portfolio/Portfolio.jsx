import React from "react";

import arrow from '../../images/top-right-btn.svg';
import '../Portfolio/Portfolio.css';

function Portfolio(){
    return(
        <section className="portfolio">
            <div className="portfolio-wrapper">
                <h2 className="portfolio__title">
                    Портфолио
                </h2>
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <a href="https://github.com/SHTURM3/how-to-learn" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Статичный сайт  
                            </p>
                            <img src={arrow} alt="Кнопка в виде стрелки" className="portfolio__btn" />
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/SHTURM3/russian-travel" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Адаптивный сайт  
                            </p>
                            <img src={arrow} alt="Кнопка в виде стрелки" className="portfolio__btn" />
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://github.com/SHTURM3/react-mesto-api-full" target='_blank' rel="noreferrer" className="portfolio__link">
                            <p className="portfolio__name">
                                Одностраничное приложение  
                            </p>
                            <img src={arrow} alt="Кнопка в виде стрелки" className="portfolio__btn" />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Portfolio;