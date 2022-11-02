import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import * as auth from "../../utils/Auth";
import {mainApi} from "../../utils/MainApi";

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

  const [movies, setMovies] = useState([]);

  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

  const [statusMessage, setStatusMessage] = useState(true);

  const [tooltipMessage, setTooltipMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const history = useHistory();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  //  // Получаем данные пользователя
   useEffect(() => {
    if (isLoggedIn)
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res)
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log('we are here');
          setIsLoggedIn(false);
          console.log(err);
        });
  }, [isLoggedIn]);


  // Получаем сохраненные фильмы
  // useEffect(() => {
  //   if (isLoggedIn)
  //     mainApi
  //       .getMovies()
  //       .then((moviesList) => {
          
  //         if (moviesList) {
  //           setMovies(moviesList)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }, [isLoggedIn]);

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

  // useEffect(() => {
  //   if (isLoggedIn) {
  //   auth
  //     .getContent()
  //     .then((data) => {
  //       // setUserEmail(data.data.email);
  //       setIsLoggedIn(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/profile");
  //   }
  // }, [isLoggedIn, history]);

  function onLogin(data) {
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((user) => {
        setIsLoggedIn(true);
        //setCurrentUser(user);
        history.push('/movies');
      })
      .catch((err) => {
        if (err.code === 401) {
          setTooltipMessage("Неверный логин или пароль");
          history.push('/signin');
        } else {
          setStatusMessage(false);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          history.push('/signin');
        }
      })
  }


  function onRegister(data) {
    return auth
      .register(data)
      .then((user) => {
        setStatusMessage(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
        history.push("/signin");
      })
      .catch((err) => {
        if (err.code === 409) {
          setStatusMessage(false);
          setTooltipMessage("Пользователь с таким email уже зарегистрирован");
        } 
        else {
          setStatusMessage(false);
          setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
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
          <ProtectedRoute
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={
              <>
              <Header
                isLoggedIn={isLoggedIn}
                toggleSideBar={toggleSideBar}
              />
              <Movies />
              <Footer />
              </>
            }
          >
            
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>

        
          <ProtectedRoute
            path="/profile" 
            isLoggedIn={isLoggedIn}
            component ={<Profile 
              isLoggedIn={isLoggedIn}
              onLogout={onLogout}
              handleUpdateUser={handleUpdateUser}
              />}
          >
            
            <Header isLoggedIn={isLoggedIn}/>
            
          
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
