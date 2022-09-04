import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

//Импорт утилит
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';

import CurrentUserContext from '../../contexts/CurrentUserContext';

//Импорты компонентов
import Header from '../Header/Header';
import HeaderAfterAuth from '../HeaderAfterAuth/HeaderAfterAuth';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//Импорт стилей
import './App.css';

function App() {

  const history = useHistory();

//Стейт переменная статуса пользователя
  const [loggedIn, setLoggedIn] = useState(false);

// Стейт переменная информации о пользователе
  const [currentUser, setCurrentUser ] = useState({});

//Стейт-переменная сохраненных фильмов (фильмы из MainApi)
  const [addMovies, setAddMovies] = useState([]);

  function getSavedMovies(){
    api.getMovies()
        .then(res => {
          if(res) {
            setAddMovies(res);
          } 
        })
        .catch((err) => {
            console.log(err);
        })
  }

//Удаление карточки
  function handleMovieDelete(id) {
    api.deleteMovie(id)
      .then((movie) => {
        if(movie){
          setAddMovies((state) => state.filter((m) => m.id === m.movieId ? movie.remove() : m ));
          getSavedMovies(); 
        } else {
          return;
        }
      })
      .catch(err => console.log(err));
  };

//Выйти из профиля  
  function handleSignOut () {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  };
  
//Проверка токена
    function checkToken() {
      if(localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');  
        auth.getContent(jwt)
          .then((res) => {
            if(res){
              setLoggedIn(true);
            }
          })
          .catch((err) => {
            console.log(err);
            history.push('/signin'); //если токен передан неккоректно, то запрос auth.getContent не вернет объект с данными пользователя
          })
      };
    };

//Запрос данных пользователя
    function getUserInfo(){
      api.getProfile()
      .then(res => {
        if(res){
          setCurrentUser(res);
          history.push('/movies'); 
        }
      })
      .catch((res) => {
          console.log(res);
      })
    }

//Запросы данных пользователя и проверка токена
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      getUserInfo();
    } else{
      history.push("/");
    }
  }, [history, loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          {loggedIn ? <HeaderAfterAuth /> : <Header />}
          
          <main className="content">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <Route path="/signup">
                <Register 
                  setLoggedIn={setLoggedIn}
                />
              </Route>

              <Route path="/signin">
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} 
                  setCurrentUser={setCurrentUser}
                />
              </Route>

              <ProtectedRoute path="/movies" loggedIn={loggedIn} >
                <Movies
                  addMovies={addMovies}
                  setAddMovies={setAddMovies}
                  handleMovieDelete={handleMovieDelete}
                />
              </ProtectedRoute> 

              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} >
                <SavedMovies
                  addMovies={addMovies}
                  setAddMovies={setAddMovies} 
                  handleMovieDelete={handleMovieDelete}
                  currentUser={currentUser}
                  getSavedMovies={getSavedMovies}
                />
              </ProtectedRoute>

              <ProtectedRoute path="/profile" loggedIn={loggedIn} >
                <Profile setCurrentUser={setCurrentUser} handleSignOut={handleSignOut} />
              </ProtectedRoute>

              <Route path='*'>
                <PageNotFound />
              </Route>

            </Switch>    
          </main>

          <Route path='/(|movies|saved-movies)/'>
            <Footer />
          </Route>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
