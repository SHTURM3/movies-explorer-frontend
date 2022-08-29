import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList({movies, visibleMovies, handleLoadMore, saveMovie, likes, savedMovies, isMovieLiked}){
    
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
                        saveMovie={saveMovie}
                        likes={likes}
                        savedMovies={savedMovies}
                        isMovieLiked={isMovieLiked}
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