import { Link } from "react-router-dom";

import "./SidebarMenu.css";
import AccountIcon from "../../images/account_icon-min.svg";

function SidebarMenu() {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu__content">
        <button className="sidebar-menu__close-button" type="button" />
        <div className="sidebar-menu__links">
          <Link to="/" className="sidebar-menu__link sidebar-menu__link-main">
            Главная
          </Link>
          <Link
            to="/movies"
            className="sidebar-menu__link sidebar-menu__link-films"
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className="sidebar-menu__link sidebar-menu__link-saved-films"
          >
            Сохранённые фильмы
          </Link>
          <Link
            to="/profile"
            className="sidebar-menu__link sidebar__link-account"
          >
            <p className="sidebar__link-account-text">Аккаунт</p>
            <img
              src={AccountIcon}
              alt="Иконка"
              className="sidebar__link-account-icon"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
