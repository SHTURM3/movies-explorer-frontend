import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

import { shortMovieDuration } from "../../utils/constants";

import api from '../../utils/MainApi';
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import '../Movies/Movies.css';

function Movies({addMovies, setAddMovies, handleMovieDelete}){

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

//Сохранение фильмов
    function saveMovie(movie){
        const img = `https://api.nomoreparties.co${movie.image.url}`;
        const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
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
                if(res){
                    setAddMovies([res, ...addMovies]);    
                } else {
                    return;
                }      
            })
            .catch((err) => {
            console.log(err);
            })
    };

//Сортировка фильмов
    function sortMovies(films){
        const filterBySearch = films.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(searchValue);
        });

        const localCheckbox = localStorage.getItem('checkbox');
        const localCheckboxParse = JSON.parse(localCheckbox);
        
        if(filterBySearch.length === 0){
            setPreloader(false);
            setError('Ничего не найдено');
            return;
        } else {
            if(localCheckboxParse){
                const filteredByDuration = filterBySearch.filter((movie) => {
                    return movie.duration <= shortMovieDuration;
                });

                if(filteredByDuration.length === 0){
                    setError('Ничего не найдено');
                    return; 
                } else{
                    setMovies(filteredByDuration);
                    localStorage.setItem('filterMovies', JSON.stringify(filteredByDuration));
                }
                
            } else{
                setMovies(filterBySearch);
                localStorage.setItem('filterMovies', JSON.stringify(filterBySearch)); 
            };    
        };
    };

//Отправка формы
    function handleSubmit(event){
        event.preventDefault();

        setMovies([]);

        setPreloader(true);

        if(searchValue === ''){
            setPreloader(false);
            setError('Нужно ввести ключевое слово');
            return;
        } else {
            setError('');

            localStorage.setItem('searchValue', searchValue); //сохраняем результат поиска фильмов в localStorage

            localStorage.setItem('checkbox', checkbox); //сохраняем состояние чекбокса в localStorage при отправки формы

            if(JSON.parse(localStorage.getItem('movies'))){
                setPreloader(false);
                const localFilms = localStorage.getItem('movies');
                const localFilmsParse = JSON.parse(localFilms);
                sortMovies(localFilmsParse);
            } else{
                moviesApi.getMovies()
                    .then(movies => {
                        localStorage.setItem('movies', JSON.stringify(movies));
                        sortMovies(movies);
                    })
                    .finally(() => setPreloader(false))
                    .catch(() => {
                        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                    })
            };
        };
    };

//Отображение ранее введенной информации при монтировании компонента
    useEffect(() => {
        setPreloader(false);
        const localMovies = localStorage.getItem('filterMovies');
        const localMoviesParse = JSON.parse(localMovies);

        if(localMoviesParse){
            setMovies(localMoviesParse);   
        } else{
            setError('Начните первый поиск нужных вам фильмов');
        }   
    }, []);

    useEffect(() => {
        const localMovies = localStorage.getItem('filterMovies');
        const localMoviesParse = JSON.parse(localMovies);

        if(localMoviesParse){
            if(checkbox){
                const filteredByDuration = localMoviesParse.filter((movie) => {
                    return movie.duration <= shortMovieDuration;
                });
    
                if(filteredByDuration.length === 0){
                    setError('Ничего не найдено');
                    return; 
                } else{
                    setMovies(filteredByDuration);
                }
            } else{
                setMovies(localMoviesParse);
                localStorage.setItem('filterMovies', JSON.stringify(localMoviesParse));
            }   
        } else{
            setError('Начните первый поиск нужных вам фильмов');
        }

        localStorage.setItem('checkbox', checkbox); //сохраняем состояние чекбокса в localStorage при обычном нажатии

    }, [checkbox])

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
                addMovies={addMovies}
                setAddMovies={setAddMovies}
                saveMovie={saveMovie}
                handleMovieDelete={handleMovieDelete}
            />

            }
        </>
    );
}

export default Movies;