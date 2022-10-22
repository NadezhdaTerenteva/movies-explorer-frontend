import "./SidebarMenu.css";
import AccountIcon from "../../images/account_icon-min.svg";
import CloseButtonIcon from "../../images/close-button_icon-min.svg";

function SidebarMenu() {
  return (
    <div className="sidebar-menu sidebar-menu_opened">
      <div className="sidebar-menu__content">
      <button
          className="sidebar-menu__close-button"
          type="button"
        />
        <div className="sidebar-menu__links">
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="sidebar-menu__link sidebar-menu__link-main"
          >
            Главная
          </a>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="sidebar-menu__link sidebar-menu__link-films"
          >
            Фильмы
          </a>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="sidebar-menu__link sidebar-menu__link-saved-films"
          >
            Сохранённые фильмы
          </a>
          <a
            href="https://yandex.ru/maps"
            target="_blank"
            rel="noreferrer"
            className="sidebar-menu__link sidebar__link-account"
          >
            <p className="sidebar__link-account-text">Аккаунт</p>
            <img
              src={AccountIcon}
              alt="Иконка"
              className="sidebar__link-account-icon"
            ></img>
          </a>
          
        </div>
        
      </div>
    </div>
  );
}

export default SidebarMenu;
