import React from "react";

import '../FilterCheckbox/FilterCheckbox.css';

function FilterCheckbox(){
    return(
        <div className="search__checkbox"> 
            <label className="search__checkbox-name">
                <input type="checkbox" className="search__checkbox-input" /> 
                <span className="search__box"></span>
                Короткометражки
            </label>
        </div>
    );
}

export default FilterCheckbox;