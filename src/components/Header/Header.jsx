import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
    return(
            <Switch>
                <Route exact path="/">
                    <header className="header" id="header">
                        <Link exact to='/'>
                            <img src={logo} alt="Логотип" className="header__logo"></img>   
                        </Link>
                        <div className="header__btns">
                            <Link to='/signup' className="header__signup">Регистрация</Link>
                            <Link to='/signin' className="header__signin">Войти</Link>
                        </div>
                    </header>        
                </Route>
                <Route path="/(movies|saved-movies|profile)/">
                    <header className="header header_white">
                        <div className="header__wrapper">
                            <Link to='/'>
                                <img src={logo} alt="Логотип" className="header__logo"></img>   
                            </Link>
                            <nav className="header__nav">
                                <NavLink to="/movies" activeClassName="header__link header__link_active" className="header__link">
                                    Фильмы
                                </NavLink>
                                <NavLink to="/saved-movies" activeClassName="header__link header__link_active" className="header__link">
                                    Сохранённые фильмы
                                </NavLink>
                            </nav>
                        </div>
                        <Link to="/profile" className="header__account">
                            <p className="header__text">Аккаунт</p>
                            <div className="header__img"></div>
                        </Link>
                        <Navigation />
                    </header>
                </Route>
            </Switch>
    );
}

export default Header;