import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { mainApi } from "../../utils/MainApi.js";

import Main from "../Main/Main";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import SidebarMenu from "../SidebarMenu/SidebarMenu";

import "./App.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {

  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  const [movies, setMovies] = useState([]);

  const [statusMessage, setStatusMessage] = useState(true);

  const [tooltipMessage, setTooltipMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  // Получаем данные пользователя
  useEffect(() => {
    if (isLoggedIn)
      mainAapi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res)
          setIsLoggedIn(true)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  // Получаем сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn)
      mainApi
        .getMovies()
        .then((moviesList) => {
          
          if (moviesList) {
            setMovies(moviesList)
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  const movieList = movies.map((item) => {
    return (
      <MoviesCard
        key={item._id}
        card={item}
        // onCardClick={handleCardClick}
        // onCardLike={handleCardLike}
        // onCardDelete={handleCardDelete}
      />
    );
  });

  function handleUpdateUser(userData) {
    mainApi
      .updateUser(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogin(data) {
    const { email, password } = data;
    return mainApi
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setStatusMessage(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function onRegister(data) {
    return mainApi
      .createUser(data)
      .then(() => {
        history.push("/signin");
        setStatusMessage(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        setStatusMessage(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(() => {
        handleInfoTooltipClick();
      });
  }

  function onSignout() {
    mainApi
   .logout()
   .then(()=> {
     setIsLoggedIn(false);
     history.push("/signin");
   });
 }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header isLoggedIn={isLoggedIn} />
            <Movies />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <SidebarMenu></SidebarMenu>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
