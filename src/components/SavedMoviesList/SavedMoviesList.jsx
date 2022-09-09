import React from "react";

import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";

import "../MoviesCardList/MoviesCardList.css";

function SavedMoviesCardList({addMovies, handleMovieDelete}){
    
    return(
        <section className="films">
            <ul className="films__list">
                {addMovies.map((movie) => (
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