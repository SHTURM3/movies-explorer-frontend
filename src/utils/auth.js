export const BASE_URL = 'https://api.movies.vizetann.nomoredomains.sbs';

const checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
  
    return response.json().then((res) => {
      throw res.message[0].messages[0].message;
    })
  }
export const register = ( name, email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
        if(err.statusCode === 400){
            console.log('Некорректно заполнено одно из полей.')
        }
    })
  };

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .catch((err) => {
        if(err.statusCode === 400){
            console.log('Не передано одно из полей.')
        } else if(err.statusCode === 401) {
            console.log('Пользователь с email не найден!')
        }
    })
  };

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .catch((err) => {
        if(err.statusCode === 400){
            console.log('Токен не передан или передан не в том формате.')
        } else if(err.statusCode === 401) {
            console.log('Переданный токен неккоректен.')
        }
    })
  }