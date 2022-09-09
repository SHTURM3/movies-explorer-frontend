import React from "react";
import { Link, NavLink } from "react-router-dom";


import '../Navigation/Navigation.css';

function Navigation(){
    
    function openMenu(){
        document.querySelector('.hamburger').classList.add('hamburger_active');
    }

    function closeMenu(){
        document.querySelector('.hamburger').classList.remove('hamburger_active');
    }

    return(
        <>
            <button type="button" onClick={ () => openMenu()} className="hamburger-menu-open-btn"></button>
            <div className="hamburger">
                <div className="hamburger-menu-overlay"></div>
                <div className="hamburger-menu">
                    <div className="hamburger-menu__wrapper">
                        <div className="navigation">
                            <button type="button" onClick={() => closeMenu()} className="hamburger-menu__close-btn"></button>
                            <nav className="hamburger-menu__nav">
                                <NavLink exact to="/" activeClassName="hamburger-menu__link hamburger-menu__link_active" className="hamburger-menu__link">
                                    Главная
                                </NavLink>
                                <NavLink to='/movies' activeClassName="hamburger-menu__link hamburger-menu__link_active" className="hamburger-menu__link">
                                    Фильмы
                                </NavLink>
                                <NavLink to='/saved-movies' activeClassName="hamburger-menu__link hamburger-menu__link_active" className="hamburger-menu__link">
                                    Сохранённые фильмы
                                </NavLink>
                            </nav>    
                        </div>
                        <Link to='/profile' className="header__account header__account_adaptive">
                            <p className="header__text">Аккаунт</p>
                            <div className="header__img"></div>
                        </Link>
                    </div>
                </div>
            </div>    
        </>
    );
}

export default Navigation;