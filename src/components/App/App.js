import React, { useState, useEffect, useHistory } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import * as auth from "../../utils/Auth.js";
import { mainApi } from "../../utils/MainApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

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
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

import "./App.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {

  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  const [movies, setMovies] = useState([]);

  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

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

  // добавление фильма в сохраненные
  function handleAddMovie(movie) {
    mainApi
      .addMovie(movie)
      .then(newMovie => setMovies([newMovie, ...movies]))
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление фильма из сохраненных
  function handleDeleteMovie(movie) {
    const isOwn = movie.owner === currentUser._id;
    
    if (isOwn) {
      mainApi
        .deleteMovie(movie._id)
        .then(() => {
          setMovies((prevState) => prevState.filter((i) => movie._id !== i._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  
  // const movieList = movies.map((item) => {
  //   return (
  //     <MoviesCard
  //       key={item._id}
  //       card={item}
  //       // onCardClick={handleCardClick}
  //       // onCardLike={handleCardLike}
  //       // onCardDelete={handleCardDelete}
  //     />
  //   );
  // });

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

  function handleInfoTooltipClick() {
    setInfotooltipOpen(true);
  }

  function closePopup() {
    setInfotooltipOpen(false);
  }

  useEffect(() => {
    if (isLoggedIn) {
    auth
      .getContent()
      .then((data) => {
        // setUserEmail(data.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/profile");
    }
  }, [isLoggedIn, history]);

  function onLogin(data) {
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((res) => {
        // setUserEmail(email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        handleInfoTooltipClick();
        setStatusMessage(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function onRegister(data) {
    return auth
      .register(data)
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

  function onLogout() {
     auth
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
          <ProtectedRoute path="/movies">
            <Header isLoggedIn={isLoggedIn} />
            <Movies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies">
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Header isLoggedIn={isLoggedIn}/>
            <Profile 
            onLogout={onLogout}
            handleUpdateUser={handleUpdateUser}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin}/>
          </Route>
          <Route path="*">
          {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
            <NotFound />
          </Route>
        </Switch>

        <SidebarMenu></SidebarMenu>
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
