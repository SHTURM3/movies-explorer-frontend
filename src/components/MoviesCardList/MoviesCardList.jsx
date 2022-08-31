import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList({movies, savedMovies, visibleMovies, handleLoadMore, saveMovie, isMovieLike}){
    
    return(
        <section className="films">
            <ul className="films__list">
                {movies.slice(0, visibleMovies).map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        movie={movie} 
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        img={movie.image.url}
                        savedMovies={savedMovies}
                        saveMovie={saveMovie}
                        isMovieLike={isMovieLike}
                    />      
                ))}
            </ul>
            {visibleMovies < movies.length && (
                <button type="button" onClick={() => handleLoadMore()} className="films__btn-more">Ещё</button>    
            )}
        </section>
    );
}

export default MoviesCardList;