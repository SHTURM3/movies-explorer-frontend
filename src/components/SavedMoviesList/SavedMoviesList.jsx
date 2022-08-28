import React from "react";

import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";

import "../MoviesCardList/MoviesCardList.css";

function SavedMoviesCardList({savedMovies, handleMovieDelete}){
    
    return(
        <section className="films">
            <ul className="films__list">
                {savedMovies.map((movie) => (
                    <SavedMovieCard
                        key={movie.movieId}
                        film={movie}
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        img={movie.image}
                        handleMovieDelete={handleMovieDelete} 
                    />  
                ))}
               
            </ul>
        </section>
    );
}

export default SavedMoviesCardList;