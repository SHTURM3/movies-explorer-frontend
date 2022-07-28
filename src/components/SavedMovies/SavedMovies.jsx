import React from "react";

import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import '../Movies/Movies.css';

function SavedMovies(){
    
    return(
        <>
            <SearchForm />
            <MoviesCardList />
        </>
    );
}

export default SavedMovies;