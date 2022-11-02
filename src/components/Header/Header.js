import { Link, Route, Switch } from "react-router-dom";
import Logo from "../../images/Logo-min.svg";
import AccountIcon from "../../images/account_icon-min.svg";
import "./Header.css";

function Header({ isLoggedIn, toggleSideBar }) {
  return (
    <Switch>
      isLoggedIn ? (
      <Route exact path="/">
        <header className="header header_theme_dark">
          <Link to="/">
            <img src={Logo} alt="Лого" className="header__logo"></img>
          </Link>
          <div className="header__buttons">
            <Link to="/signup" className="header__button_signup">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button_signin">
              Войти
            </Link>
          </div>
        </header>
      </Route>
      ) : (
      <Route>
        <header className="header">
          <Link to="/">
            <img src={Logo} alt="Лого" className="header__logo"></img>
          </Link>
          <div className="header__links">
            <Link to="/movies" className="header__link header__link-films">
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__link header__link-saved-films"
            >
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="header__link header__link-account">
              <p className="header__link-account-text">Аккаунт</p>
              <img
                src={AccountIcon}
                alt="Иконка"
                className="header__link-account-icon"
              ></img>
            </Link>
            <button 
              type="button"
              className="header__burger-menu"
              onClick={toggleSideBar}
            >
            </button>
          </div>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
