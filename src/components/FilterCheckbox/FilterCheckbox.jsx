import React from "react";
import { useEffect } from "react";

import '../FilterCheckbox/FilterCheckbox.css';

function FilterCheckbox({setCheckbox, locationMovies, locationSavedMovies}){

//Изменение состояния чекбокса
    function handleCheckbox(event){
        const input = event.target.checked;
        setCheckbox(input);
    };

    useEffect(() => {
        if(locationMovies){
            const localCheckbox = localStorage.getItem('checkbox');
            const localCheckboxParse = JSON.parse(localCheckbox);

            if(localCheckboxParse === null){
                return;
            } else if(localCheckboxParse === true){
                const input = document.getElementById('checkbox');
                input.checked = true;
            } else{
                const input = document.getElementById('checkbox');
                input.checked = false;
            }    
        } else if(locationSavedMovies){
            const localCheckbox = localStorage.getItem('checkboxSavedMovies');
            const localCheckboxParse = JSON.parse(localCheckbox);

            console.log(localCheckboxParse);
            if(localCheckboxParse === null){
                return;
            } else if(localCheckboxParse === true){
                const input = document.getElementById('checkbox');
                input.checked = true;
            } else{
                const input = document.getElementById('checkbox');
                input.checked = false;
            }    
        }
    }, []);

    return(
        <div className="search__checkbox"> 
            <label className="search__checkbox-name">
                <input 
                    onChange={handleCheckbox}  
                    type="checkbox" 
                    id="checkbox" 
                    className="search__checkbox-input" 
                    /> 
                <span className="search__box"></span>
                Короткометражки
            </label>
        </div>
    );
}

export default FilterCheckbox;