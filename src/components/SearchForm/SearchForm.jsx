import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import '../SearchForm/SearchForm.css';

function SearchForm(){
    return(
        <section className="search">
            <div className="search__wrapper">
                <div className="search__input-wrapper">
                    <div className="search__icon"></div>
                    <form className="search__form">
                        <input name="search" id="input__search" type="text" className="search__input" placeholder="Фильм" required={true} />   
                    </form>
                    <button type="submit" className="search__btn"></button>
                </div>
                <FilterCheckbox />
            </div>
        </section>
    );
}

export default SearchForm;