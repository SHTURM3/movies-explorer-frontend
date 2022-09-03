import { moviesQuantityOnDesktop, moviesQuantityOnMobile} from "./constants";

export function getMoreFilms(width){
    if(width > 500){
        return moviesQuantityOnDesktop;
    }
    return moviesQuantityOnMobile;
};
