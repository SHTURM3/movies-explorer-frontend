import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList(){
    return(
        <section className="films">
            <ul className="films__list">
                <MoviesCard />    
            </ul>
            <button type="button" className="films__btn-more">Ещё</button>
        </section>
    );
}

export default MoviesCardList;