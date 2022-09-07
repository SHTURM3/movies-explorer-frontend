import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

//Импорт утилит
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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

//Запрос данных пользователя
  function getUserInfo(){
    api.getProfile()
    .then(user => {
      if(user){
        setCurrentUser(user);
      }
    })
    .catch((err) => {
        console.log(err);
    })
  };
  
//Проверка токена
    function checkToken() {
      let jwt = localStorage.getItem('jwt');

      if(jwt) {
        auth.getContent(jwt)
          .then((res) => {
            if(res.name && res.email){
              setLoggedIn(true);
            } else {
              setLoggedIn(false);
              handleSignOut();
            }
          })
          .catch((err) => {
            console.log(err);
          })   
      } else{
        console.log('Unable token');
      };
    };

//Запросы данных пользователя и проверка токена
  useEffect(() => {
    checkToken();  
  }, [history]);

  useEffect(() => {
    if(loggedIn){
      getUserInfo();
    } else{
      checkToken();
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

            <Switch>

              <Route exact path="/">
                {loggedIn ? <HeaderAfterAuth /> : <Header />}
                <Main />
                <Footer />
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

              <ProtectedRoute path="/movies" loggedIn={loggedIn}>
                <HeaderAfterAuth />
                <Movies
                  addMovies={addMovies}
                  setAddMovies={setAddMovies}
                  handleMovieDelete={handleMovieDelete}
                />
                <Footer />
              </ProtectedRoute> 

              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                <HeaderAfterAuth />
                <SavedMovies
                  addMovies={addMovies}
                  setAddMovies={setAddMovies} 
                  handleMovieDelete={handleMovieDelete}
                  currentUser={currentUser}
                  getSavedMovies={getSavedMovies}
                />
                <Footer />
              </ProtectedRoute>

              <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                <HeaderAfterAuth />
                <Profile setCurrentUser={setCurrentUser} handleSignOut={handleSignOut} />
              </ProtectedRoute>

              <Route path='*'>
                <PageNotFound />
              </Route>

            </Switch>    

        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
