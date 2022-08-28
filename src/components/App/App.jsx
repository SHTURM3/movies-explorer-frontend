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
  const [savedMovies, setSavedMovies] = useState([]);
    
//Удаление карточки
  function handleMovieDelete(id) {
    api.deleteMovie(id)
      .then((movie) => {setSavedMovies((state) => state.filter((m) => m.id === m.movieId ? movie.remove() : m ))})
      .catch(err => console.log(err));
  }

//Выйти из профиля  
  function handleSignOut () {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('movies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('filterMovies');
    localStorage.removeItem('searchValue');
    setLoggedIn(false);
    history.push("/");
  }

//Проверка на наличие лайка в фильме
    function isMovieLiked(movies, id){
      return movies.find((item) => {
        return item.movieId === id;
      });
    }
  
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
      };
    };

//Запросы данных пользователя и проверка токена
  useEffect(() => {
    checkToken();
  }, [loggedIn, history]);

  useEffect(() => {
    if(loggedIn) {
      api.getProfile()
      .then(res => {
        setCurrentUser(res);
        history.goForward("/movies");
      })
      .catch( res => {
          console.log(res);
      })
      return;
    }
  }, [loggedIn, history, setCurrentUser]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          {loggedIn ? <HeaderAfterAuth /> : <Header />}
          
          <main className="content">
            <Switch>
              <ProtectedRoute loggedIn={loggedIn} path="/movies">
                <Movies
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  handleMovieDelete={handleMovieDelete}
                  isMovieLiked={isMovieLiked}
                />
              </ProtectedRoute> 

              <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
                <SavedMovies
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies} 
                  handleMovieDelete={handleMovieDelete}
                  currentUser={currentUser}
                />
              </ProtectedRoute>

              <ProtectedRoute loggedIn={loggedIn} path="/profile">
                <Profile setCurrentUser={setCurrentUser} handleSignOut={handleSignOut} />
              </ProtectedRoute>

              <Route exact path="/">
                <Main />
              </Route>

              <Route path="/signup">
                <Register />
              </Route>

              <Route path="/signin">
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn} 
                  setCurrentUser={setCurrentUser}
                />
              </Route>

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
