import Logo from '../../images/Logo-min.svg';
import AccountIcon from '../../images/account_icon-min.svg';
import './Header.css';

function Header() {
  return ( 
    <>
      <header className="header header_theme_dark">
        <img src={Logo} alt="Лого" className="header__logo"></img>
        <div className="header__buttons">
          <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__button_signup">Регистрация</a>
          <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__button_signin">Войти</a>
        </div>
      </header> 

      <header className="header">
      <img src={Logo} alt="Лого" className="header__logo"></img>
      <div className="header__links">
        <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__link-films">Фильмы</a>
        <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__link-saved-films">Сохранённые фильмы</a>
        <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__link-account">
            <p className="header__link-account-text">Аккаунт</p>
            <img src={AccountIcon} alt="Иконка" className="header__link-account-icon"></img>
        </a>
      </div>
    </header> 
    </>
  );
}

export default Header;