import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

import './App.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
        <Header 
        isLoggedIn={isLoggedIn}/>
        <Main />
        <Footer />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      
      <SidebarMenu></SidebarMenu>
    </div>
  );
}

export default App;
