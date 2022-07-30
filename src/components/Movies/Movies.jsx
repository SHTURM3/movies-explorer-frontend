import React from "react";

import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import '../Movies/Movies.css';

function Movies(){

    return(
        <>
            <SearchForm />
            {/* <Preloader /> */}
            <MoviesCardList/>
        </>
    );
}

export default Movies;