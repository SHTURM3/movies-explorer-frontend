import React from "react";
import { Route, Switch } from "react-router-dom";

import design from '../../images/design.png';

import '../MoviesCard/MoviesCard.css';

function MoviesCard(){
    function isLiked(){
        const likeBtn = document.querySelector('.films__like');
        likeBtn.classList.toggle('films__like_active');
    }
    return(
    <>
        <li className="films__item">
            <div className="films__wrapper">
                <div className="films__info">
                    <h2 className="films__title">
                        33 слова о дизайне
                    </h2>
                    <p className="films__time">
                        1ч 42м
                    </p>    
                </div>
                <Switch>
                    <Route path="/movies">
                        <button type="button" onClick={() => isLiked()} className='films__like'></button>    
                    </Route>
                    <Route path="/saved-movies">
                        <button type="button" className="films__del"></button>    
                    </Route>    
                </Switch>
            </div>
            <img src={design} alt="33 слова о дизайне" className="films__img" />
        </li>
    </>
    );
}

export default MoviesCard;