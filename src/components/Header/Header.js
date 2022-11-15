import { Link, NavLink, Switch, useLocation } from "react-router-dom";
import Logo from "../../images/Logo-min.svg";
import AccountIcon from "../../images/account_icon-min.svg";
import "./Header.css";

function Header({ isLoggedIn, toggleSideBar }) {

  const location = useLocation();

  return (
    <Switch> 
      { !isLoggedIn
      ? <header className={`header ${
        location.pathname === '/' ? "header_theme_dark" : ""}`}>
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
     : 
        <header className={`header ${
          location.pathname === '/' ? "header_theme_dark" : ""}`}>
          <Link to="/">
            <img src={Logo} alt="Лого" className="header__logo"></img>
          </Link>
          <div className="header__links">
            <NavLink to="/movies" 
              activeClassName="header__link_active"
              className={`header__link ${
              location.pathname === '/' ? "header__link_theme_dark" : ""} header__link-films`} >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="header__link_active"
              className={`header__link ${
                location.pathname === '/' ? "header__link_theme_dark" : ""} header__link-saved-films`} >
              Сохранённые фильмы
            </NavLink>
            <NavLink to="/profile" 
                activeClassName="header__link_active"
                className={`header__link ${
                  location.pathname === '/' ? "header__link_theme_dark" : ""} header__link-account`} >
              <p className="header__link-account-text">Аккаунт</p>
              <img
                src={AccountIcon}
                alt="Иконка"
                className="header__link-account-icon">
                  </img>
            </NavLink>
            <button 
              type="button"
              className={`header__burger-menu ${
              location.pathname === '/' ? "header__burger-menu_theme_dark" : ""} `}
              onClick={toggleSideBar}
            >
            </button>
          </div>
        </header>
      }
    </Switch>
  );
}

export default Header;
