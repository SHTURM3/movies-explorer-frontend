import React from "react";
import '../Footer/Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__wrapper">
                <p className="footer__copyright">
                    © 2022
                </p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer" className="footer__link">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href='https://github.com/SHTURM3' target='_blank' rel="noreferrer" className="footer__link">
                            Github
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href='https://ru-ru.facebook.com/' target='_blank' rel="noreferrer" className="footer__link">
                            Facebook
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;