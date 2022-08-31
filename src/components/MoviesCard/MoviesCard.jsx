import React from "react";
import { useEffect } from "react";
//import { useState, useEffect } from "react";

import '../MoviesCard/MoviesCard.css';

function MoviesCard({movie, nameRU, duration, img, savedMovies, saveMovie, isMovieLike}){

// Подгонка продолжительности фильма под формат времени 'N'ч 'NN'м
    function translationTime(num){
        const hour = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hour}ч ${minutes}м`;
    };

    const iD = movie.id
    
    useEffect(() => {
        isMovieLike(savedMovies, iD);
    })

    
    return(
            <li className="films__item">
                <div className="films__wrapper">
                    <div className="films__info">
                        <h2 className="films__title">{nameRU}</h2>
                        <p className="films__time">{translationTime(duration)}</p>    
                    </div>
                    <button type="button" onClick={() => saveMovie(movie)} className={`films__like ${isMovieLike(savedMovies, iD) ? 'films__like_active' : ''}`}></button>    
                </div>
                <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                    <img src={`https://api.nomoreparties.co${img}`} alt={nameRU} className="films__img" />
                </a>
            </li>    
    );
}

export default MoviesCard;