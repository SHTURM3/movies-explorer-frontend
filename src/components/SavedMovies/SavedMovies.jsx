import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import { shortMovieDuration } from "../../utils/constants";

import api from '../../utils/MainApi';
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesList/SavedMoviesList";

import '../Movies/Movies.css';

function SavedMovies({ addMovies, setAddMovies, handleMovieDelete }){

//Используется для отображения информации компонента с поиском фильмов согласно страницам, где он находится
  const location = useLocation();

//Стейт перменная введенных в строку поика данных
  const [searchValue, setSearchValue] = useState('');

//Стейт переменная чекбокса
  const [checkbox, setCheckbox] = useState(false);

//Стейт переменная ошибок
  const [error, setError] = useState('');

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
              return movie.duration <= shortMovieDuration;
          });

          if(filteredByDuration.length === 0){
            setError('Ничего не найдено');
            return;
          } else{
            setAddMovies(filteredByDuration);  
          }
        } else{
            setAddMovies(filterBySearch);
        };  
    };
  };

  function handleSubmit(event){
    event.preventDefault();

    setAddMovies([]);
    
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

  useEffect(() => {
    if(addMovies.length === 0){
      return;
    } else {
      api.getMovies()
        .then(res => {
          if(res) {
            setAddMovies(res);
          } else {
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
          }
        })
        .catch((err) => {
            console.log(err);
        })  
    }
    
  }, [addMovies.length, setAddMovies]);

    return(
        <>
            <SearchForm
              handleSubmit={handleSubmit}
              setSearchValue={setSearchValue}
              setCheckbox={setCheckbox} 
              locationSavedMovies={location.pathname}
            />

            <span className="server">{error || ''}</span>

            <SavedMoviesCardList addMovies={addMovies} handleMovieDelete={handleMovieDelete} />
        </>
    );
}

export default SavedMovies;