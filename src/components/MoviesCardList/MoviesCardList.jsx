import React, {useState, useEffect} from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

//Импорт хуков
import { useCurrentWidth } from '../../hooks/useCurrentWidth';

import { getMoreFilms } from '../../utils/getMoreFilms';

import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList({movies, addMovies, saveMovie, handleMovieDelete}){

//Переменная с текущей шириной экрана
    const width = useCurrentWidth();
    
//Стейт-переменная видимости количества фильмов
    const [visibleMovies, setVisibleMovies] = useState(getMoreFilms(width));    

//Подгрузка фильмов
    function handleLoadMore(){
        setVisibleMovies((prevCount) => prevCount + getMoreFilms(width));        
    };

// Проверка наличия лайка
    function isLike(id){
        const likedMovies = addMovies.some((addMovie) => addMovie.movieId === id);
        return likedMovies;
    };

// Удаление фильма
    function deleteMovie(id){
        const checkAddMovies = addMovies.find((item) => item.movieId === id);

        handleMovieDelete(checkAddMovies._id);
    };

    useEffect(() => {
        setVisibleMovies(getMoreFilms(width));
    }, [width]);

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
                        addMovies={addMovies}
                        saveMovie={saveMovie}
                        handleMovieDelete={handleMovieDelete}
                        isLike={isLike}
                        deleteMovie={deleteMovie}
                    />      
                ))}
            </ul>
            {visibleMovies < movies.length && (
                <button type="button" onClick={handleLoadMore} className="films__btn-more">Ещё</button>    
            )}
        </section>
    );
}

export default MoviesCardList;