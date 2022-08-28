import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

//Импорт хуков
import useCurrentWidth from '../../hooks/useCurrentWidth';

import { getMoreFilms } from '../../utils/getMoreFilms';

import api from '../../utils/MainApi';
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import '../Movies/Movies.css';

function Movies({savedMovies, setSavedMovies, handleMovieDelete, isMovieLiked}){

//Используется для отображения информации компонента с поиском фильмов согласно страницам, где он находится
    const location = useLocation();
    
//Стейт-переменная с фильмами (фильмы из MoviesApi)
    const [movies, setMovies] = useState([]);

//Стейт переменная управление прелоадером
    const [preloader, setPreloader] = useState(true);

//Стейт перменная введенных в строку поика данных
    const [searchValue, setSearchValue] = useState('');

//Стейт переменная чекбокса
    const [checkbox, setCheckbox] = useState(false);

//Стейт переменная ошибок
    const [error, setError] = useState('');

//Переменная с текущей шириной экрана
    const width = useCurrentWidth(); 
    
//Стейт-переменная видимости количества фильмов
    const [visibleMovies, setVisibleMovies] = useState(getMoreFilms(width));    

//Подгрузка фильмов
    function handleLoadMore(){
        setVisibleMovies((prevCount) => prevCount + getMoreFilms(width));        
    };

//Сохранение фильмов
    function saveMovie(movie){
        const img = `https://api.nomoreparties.co${movie.image.url}`;
        const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        const like = isMovieLiked(savedMovies, movie.id);

        if(!like){
            api.createMovie(
            movie.country, 
            movie.director, 
            movie.duration, 
            movie.year, 
            movie.description, 
            img, 
            movie.trailerLink, 
            thumbnail, 
            movie.owner, 
            movie.id, 
            movie.nameRU, 
            movie.nameEN
            )
            .then((res) => {
                setSavedMovies([res, ...savedMovies]);        
            })
            .catch((err) => {
            console.log(err);
            })
        } else {
            savedMovies.find((item) => {
                if(item.movieId === movie.id){
                    handleMovieDelete(item._id);
                };
            });
        };
    };

//Сортировка фильмов
    function sortMovies(films){
        const filterBySearch = films.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(searchValue);
        });
        
        
        if(filterBySearch === []){
            setError('Ничего не найдено');
            return;
        } else if(searchValue === ''){
            setError('Нужно ввести ключевое слово');
            localStorage.removeItem('filterMovies');
            return;
        } else{
            if(checkbox){
                const filteredByDuration = filterBySearch.filter((movie) => {
                    return movie.duration <= 40;
                });
                setMovies(filteredByDuration);
                localStorage.setItem('filterMovies', JSON.stringify(filteredByDuration));
            } else{
                setMovies(filterBySearch);
                localStorage.setItem('filterMovies', JSON.stringify(filterBySearch)); 
            };  
        };
    };

    function handleSubmit(event){
        event.preventDefault();
        
        if(searchValue === null){
            setError('Нужно ввести ключевое слово');
        } else {
            setError('');
            localStorage.setItem('searchValue', searchValue);
            localStorage.setItem('checkbox', checkbox);
            moviesApi.getMovies()
                .then(movies => {
                    sortMovies(movies);
                    localStorage.setItem('movies', JSON.stringify(movies));
                })
                .finally(() => setPreloader(false))
                .catch(() => {
                    setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
        };
    };

//Отображение ранее введенной информации при монтировании компонента
    useEffect(() => {
        const localMovies = localStorage.getItem('filterMovies');
        const localMoviesParse = JSON.parse(localMovies);
        if(localMoviesParse){
            setMovies(localMoviesParse); 
            setPreloader(false);    
        } else{
            return;
        }   
    }, []);

    return(
        <>
            <SearchForm
                handleSubmit={handleSubmit}
                setSearchValue={setSearchValue}
                setCheckbox={setCheckbox}
                locationMovies={location.pathname}
            />

            <span className="server">{error || ''}</span>

            { preloader 
            
            ?
            
            <Preloader /> 
            
            :
            
            <MoviesCardList 
                movies={movies}
                visibleMovies={visibleMovies}
                handleLoadMore={handleLoadMore}
                saveMovie={saveMovie}
                savedMovies={savedMovies}
                isMovieLiked={isMovieLiked}
                handleMovieDelete={handleMovieDelete}
            />

            }
        </>
    );
}

export default Movies;