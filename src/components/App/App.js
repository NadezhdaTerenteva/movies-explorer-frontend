import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import * as auth from "../../utils/Auth";
import { mainApi } from "../../utils/MainApi";
import AuthError from "../../utils/errors/AuthError";
import ConflictError from "../../utils/errors/ConflictError";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";

import { CurrentUserContext } from "../../context/CurrentUserContext";

function App() {

  const {
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    resetUser,
    setReqIsProcessing,
  } = useContext(CurrentUserContext);



  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

  const [statusMessage, setStatusMessage] = useState(true);

  const [tooltipMessage, setTooltipMessage] = useState("");

  const history = useHistory();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  //Получаем сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn === true) {
      mainApi
        .getFavoriteMovies()
        .then((moviesList) => {
          if (moviesList) {
            setFavoriteMovies(moviesList);
          }
        })
        .catch((err) => {
          processAuthError(err);
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // добавление фильма в сохраненные
  function handleAddMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => setFavoriteMovies([newMovie, ...favoriteMovies]))
      .catch((err) => {
        processAuthError(err);
        console.log(err);
      });
  }

  //удаление фильма из сохраненных
  function handleDeleteMovie(movie) {
    const savedMovie = favoriteMovies.find((item) => item.id === movie.id);

    if (!savedMovie) return;

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        setFavoriteMovies((prevState) =>
          prevState.filter((item) => savedMovie._id !== item._id)
        );
      })
      .catch((err) => {
        processAuthError(err);
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    setReqIsProcessing(true);
    mainApi
      .updateUser(userData)
      .then((res) => {
        setCurrentUser(res);
        setStatusMessage(true);
        setInfotooltipOpen(true);
        setTooltipMessage("Ваши данные обновлены!");
      })
      .catch((err) => {
        processAuthError(err);
        setStatusMessage(false);
        setInfotooltipOpen(true);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
      }).finally(()=>{
        setReqIsProcessing(false);
      });
  }

  function processAuthError(err) {
    if (err instanceof AuthError) {
      resetUser();
      history.push('/');
    }
  }

  function handleInfoTooltipClick() {
    setInfotooltipOpen(true);
  }

  function closePopup() {
    setInfotooltipOpen(false);
  }

  function onLogin(data) {
    setReqIsProcessing(true);
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((res) => {
        
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        history.push("/movies");
      })
      .catch((err) => {
        if (err.code === 401) {
          setStatusMessage(false);
          setInfotooltipOpen(true);
          setTooltipMessage("Неверный логин или пароль");
          history.push("/signin");
        } else {
          setStatusMessage(false);
          setInfotooltipOpen(true);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          history.push("/signin");
        }
      }).finally(()=>{
        setReqIsProcessing(false);
      });;
  }

  function onRegister(data) {
    setReqIsProcessing(true);
    return auth
      .register(data)
      .then((user) => {
        setStatusMessage(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
        onLogin(data);
      })
      .catch((err) => {
        if (err instanceof ConflictError) {
          setStatusMessage(false);
          setInfotooltipOpen(true);
          setTooltipMessage("Пользователь с таким email уже зарегистрирован");
        } else {
          setStatusMessage(false);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .finally(() => {
        handleInfoTooltipClick();
        setReqIsProcessing(false);
      });
  }

  function onLogout() {
    auth.logout().then(() => {
      resetUser();
      history.push("/signin");
    });
  }

  return (
    <section className="app">
      <Switch>
        <Route exact path="/">
          <Header isLoggedIn={isLoggedIn} toggleSideBar={toggleSideBar} />
          <Main />
          <Footer />
        </Route>

        
        <ProtectedRoute
          path="/movies"
          isLoggedIn={isLoggedIn}
          component={
            <>
              <Header isLoggedIn={isLoggedIn} toggleSideBar={toggleSideBar} />
              <Movies
                favorites={favoriteMovies}
                addToFavorites={handleAddMovie}
                removeFromFavorites={handleDeleteMovie}
                setStatusMessage={setStatusMessage}
                setTooltipMessage={setTooltipMessage}
              />
              <Footer />
            </>
          }
        ></ProtectedRoute>
        <ProtectedRoute
          path="/saved-movies"
          isLoggedIn={isLoggedIn}
          component={
            <>
              <Header isLoggedIn={isLoggedIn} toggleSideBar={toggleSideBar} />
              <SavedMovies
                favorites={favoriteMovies}
                removeFromFavorites={handleDeleteMovie}
              />
              <Footer />
            </>
          }
        />
        <ProtectedRoute
          path="/profile"
          isLoggedIn={isLoggedIn}
          component={
            <>
              <Header isLoggedIn={isLoggedIn} toggleSideBar={toggleSideBar} />
              <Profile
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
                onUpdateUser={handleUpdateUser}
              />
            </>
          }
        ></ProtectedRoute>
        <Route exact path="/signup">
          { isLoggedIn ?
          <Redirect to="/" />
          :
          <Register onRegister={onRegister} />
          }
        </Route>
        <Route exact path="/signin">
          { isLoggedIn ?
          <Redirect to="/" />
          : 
          <Login onLogin={onLogin} />
          }
        </Route>
        <Route path="*">

          <NotFound />

        </Route>
      </Switch>

      <SidebarMenu
        visible={isSideBarOpen}
        toggleSideBar={toggleSideBar}
      ></SidebarMenu>
      <InfoTooltip
        name="infotooltip"
        isLoggedIn={isLoggedIn}
        isOpen={isInfoTooltipOpen}
        onClose={closePopup}
        userStatus={statusMessage}
        tooltipMessage={tooltipMessage}
      ></InfoTooltip>
    </section>
  );
}

export default App;
