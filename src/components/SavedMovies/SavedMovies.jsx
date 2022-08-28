import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import api from '../../utils/MainApi';
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesList/SavedMoviesList";
// import Preloader from "../Preloader/Preloader";


import '../Movies/Movies.css';

function SavedMovies({ savedMovies, handleMovieDelete, setSavedMovies}){

//Используется для отображения информации компонента с поиском фильмов согласно страницам, где он находится
  const location = useLocation();

//Стейт перменная введенных в строку поика данных
  const [searchValue, setSearchValue] = useState('');

//Стейт переменная чекбокса
  const [checkbox, setCheckbox] = useState(false);

//Стейт переменная ошибок
  const [error, setError] = useState('');

//Запрос фильмов с сервера
  function getSavedMovies(){
    api.getMovies()
    .then(res => {
        setSavedMovies(res);
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
    
    if(filterBySearch === []){
        setError('Ничего не найдено');
        return;
    } else if(searchValue === ''){
        setError('Нужно ввести ключевое слово');
        localStorage.removeItem('filterSavedMovies');
        return;
    } else{
        if(checkbox){
            const filteredByDuration = filterBySearch.filter((movie) => {
                return movie.duration <= 40;
            });
            setSavedMovies(filteredByDuration);
            localStorage.setItem('filterSavedMovies', JSON.stringify(filteredByDuration));
        } else{
            setSavedMovies(filterBySearch);
            localStorage.setItem('filterSavedMovies', JSON.stringify(filterBySearch)); 
        };  
    };
  };

  function handleSubmit(event){
    event.preventDefault();
    
    if(searchValue === null){
        setError('Нужно ввести ключевое слово');
    } else {
        setError('');
        localStorage.setItem('searchValueSavedMovies', searchValue);
        localStorage.setItem('checkboxSavedMovies', checkbox);
        api.getMovies()
            .then(movies => {
                sortMovies(movies);
                localStorage.setItem('savedMovies', JSON.stringify(movies));
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
    };
};


  useEffect(() => {
    const localMovies = localStorage.getItem('filterSavedMovies');
        const localMoviesParse = JSON.parse(localMovies);
        if(localMoviesParse){
            setSavedMovies(localMoviesParse);     
        } else{
          getSavedMovies();
        }
  }, []);

    return(
        <>
            <SearchForm
              handleSubmit={handleSubmit}
              setSearchValue={setSearchValue}
              setCheckbox={setCheckbox} 
              locationSavedMovies={location.pathname}
            />

            <span className="server">{error || ''}</span>

            <SavedMoviesCardList savedMovies={savedMovies} handleMovieDelete={handleMovieDelete} />
        </>
    );
}

export default SavedMovies;