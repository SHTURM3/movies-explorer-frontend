import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import api from '../../utils/MainApi';
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesList/SavedMoviesList";
// import Preloader from "../Preloader/Preloader";


import '../Movies/Movies.css';

function SavedMovies({ savedMovies, setSavedMovies, handleMovieDelete }){

//Используется для отображения информации компонента с поиском фильмов согласно страницам, где он находится
  const location = useLocation();

//Стейт перменная введенных в строку поика данных
  const [searchValue, setSearchValue] = useState('');

//Стейт переменная чекбокса
  const [checkbox, setCheckbox] = useState(false);

//Стейт переменная ошибок
  const [error, setError] = useState('');

  console.log(searchValue);

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
    
    if(filterBySearch.length === 0){
        setError('Ничего не найдено');
        return;
    } else{
        if(checkbox){
            const filteredByDuration = filterBySearch.filter((movie) => {
                return movie.duration <= 40;
            });
            setSavedMovies(filteredByDuration);
        } else{
            setSavedMovies(filterBySearch);
        };  
    };
  };

  function handleSubmit(event){
    event.preventDefault();

    setSavedMovies([]);
    
    if(searchValue === ''){
        setError('Нужно ввести ключевое слово');
    } else {
        setError('');
        api.getMovies()
            .then(movies => {
              if(movies){
                sortMovies(movies);  
              } 
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
    };
};

  useEffect(() => { getSavedMovies() }, [] );

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