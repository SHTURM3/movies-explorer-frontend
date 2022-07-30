import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Header />
        <main className="content">
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>

            <Route path='/signup'>
              <Register />
            </Route>

            <Route path='/signin'>
              <Login />
            </Route>

            <Route path='/movies'>
              <Movies />
            </Route> 

            <Route path='/saved-movies'>
              <SavedMovies />
            </Route>

            <Route path='/profile'>
              <Profile />
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
    </div>
  );
}

export default App;
