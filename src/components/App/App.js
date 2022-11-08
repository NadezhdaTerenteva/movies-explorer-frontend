import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import * as auth from "../../utils/Auth";
import { mainApi } from "../../utils/MainApi";

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
  const [currentUser, setCurrentUser] = useState({});

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

  const [statusMessage, setStatusMessage] = useState(true);

  const [tooltipMessage, setTooltipMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  //  // Получаем данные пользователя
  useEffect(() => {
    if (isLoggedIn === true) {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("we are here");
          setIsLoggedIn(false);
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  //Получаем сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn === true) {
      console.log("sdssdsd");
      mainApi
        .getFavoriteMovies()
        .then((moviesList) => {
          if (moviesList) {
            setFavoriteMovies(moviesList);
          }
        })
        .catch((err) => {
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
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .updateUser(userData)
      .then((res) => {
        setCurrentUser(res);
        setInfotooltipOpen(true);
        setTooltipMessage("Ваши данные обновлены!");
      })
      .catch((err) => {
        setInfotooltipOpen(true);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleInfoTooltipClick() {
    setInfotooltipOpen(true);
  }

  function closePopup() {
    setInfotooltipOpen(false);
  }

  function onLogin(data) {
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        history.push("/movies");
      })
      .catch((err) => {
        if (err.code === 401) {
          setTooltipMessage("Неверный логин или пароль");
          history.push("/signin");
        } else {
          setStatusMessage(false);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          history.push("/signin");
        }
      });
  }

  function onRegister(data) {
    return auth
      .register(data)
      .then((user) => {
        setStatusMessage(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
        history.push("/movies");
      })
      .catch((err) => {
        if (err.code === 409) {
          setStatusMessage(false);
          setTooltipMessage("Пользователь с таким email уже зарегистрирован");
        } else {
          setStatusMessage(false);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .finally(() => {
        handleInfoTooltipClick();
      });
  }

  function onLogout() {
    auth.logout().then(() => {
      setIsLoggedIn(false);
      history.push("/signin");
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            { isLoggedIn ?
            <Redirect to="/profile" />
            :
            <NotFound />
            }
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
    </CurrentUserContext.Provider>
  );
}

export default App;
