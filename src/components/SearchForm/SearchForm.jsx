import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useEffect } from "react";

import '../SearchForm/SearchForm.css';

function SearchForm({handleSubmit, setSearchValue, setCheckbox, locationMovies, locationSavedMovies}){

//Управление поиском фильмов
    function handleChange(event){
        const value = event.target.value.toLowerCase();
        setSearchValue(value);    
    };

//Отображение ранее введенной информации при монтировании компонента
    useEffect(() => {
        if(locationMovies){
            const localValue = localStorage.getItem('searchValue');

            if(localValue === ''){
                return;
            } else{
                const input = document.getElementById('search');
                input.value = localValue;
                setSearchValue(localValue);
            }    
        }
    }, [locationMovies, setSearchValue]);

    return(
        <section className="search">
            <form onSubmit={handleSubmit} className="search__wrapper" noValidate>
                <div className="search__input-wrapper">
                    <div className="search__icon"></div>
                    <div className="search__form" >
                        <input 
                            name="search" 
                            onChange={handleChange} 
                            id="search" 
                            type="text" 
                            className="search__input" 
                            placeholder="Фильм" 
                            required={true}  />   
                    </div>
                    <button type="submit" className="search__btn"></button>
                </div>
                <FilterCheckbox setCheckbox={setCheckbox} locationMovies={locationMovies} locationSavedMovies={locationSavedMovies} />
            </form>
        </section>
    );
}

export default SearchForm;