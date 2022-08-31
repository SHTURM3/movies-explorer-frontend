export function getMoreFilms(width){
    if(width >= 768){
        return 7;
    }else if(width <= 470){
        return 5;    
    } 
};
