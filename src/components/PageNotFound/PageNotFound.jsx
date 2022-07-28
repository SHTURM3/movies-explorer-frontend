import React from "react";
import { useHistory } from "react-router-dom";


import '../PageNotFound/PageNotFound.css';

function PageNotFound(){
    const history = useHistory();
    return(
        <section className="not-found">
            <h1 className="not-found__title">
                404
            </h1>
            <p className="not-found__text">
                Страница не найдена
            </p>
            <button type="button" onClick={() => history.goBack()} className="not-found__btn">Назад</button>
        </section>
    );
}

export default PageNotFound;