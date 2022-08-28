import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

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
        </Switch>       
    );
}

export default Header;