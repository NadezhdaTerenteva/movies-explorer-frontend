import { NavLink } from "react-router-dom";

import "./SidebarMenu.css";
import AccountIcon from "../../images/account_icon-min.svg";

function SidebarMenu({ visible, toggleSideBar }) {
 

  const sidebarMenuClassName = `${
    visible ? "sidebar-menu sidebar-menu_opened" : "sidebar-menu"
  }`;

  return (
    <section 
      className={sidebarMenuClassName}
      onClick={toggleSideBar}>
      <div className={`sidebar-menu__content ${visible && "sidebar-menu__content_animated"}`}>
        <button
          className="sidebar-menu__close-button"
          type="button"
          onClick={toggleSideBar}
        />
        <div className="sidebar-menu__links">
          <NavLink 
            to="/" 
            className="sidebar-menu__link sidebar-menu__link-main"
            onClick={toggleSideBar}>
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="sidebar-menu__link sidebar-menu__link-films"
            onClick={toggleSideBar}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="sidebar-menu__link sidebar-menu__link-saved-films"
            onClick={toggleSideBar}
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink
            to="/profile"
            className="sidebar-menu__link sidebar__link-account"
            onClick={toggleSideBar}
          >
            <p className="sidebar__link-account-text">Аккаунт</p>
            <img
              src={AccountIcon}
              alt="Иконка"
              className="sidebar__link-account-icon"
            ></img>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default SidebarMenu;
