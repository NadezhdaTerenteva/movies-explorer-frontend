import Logo from '../../images/Logo-min.svg';
import './Header.css';

function Header() {
  return ( 
      <header className="header header_theme_dark">
        <img src={Logo} alt="Лого" className="header__logo"></img>
        <div className="header__buttons">
          <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__button_signup">Регистрация</a>
          <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="header__button_signin">Войти</a>
        </div>
      </header> 
  );
}

export default Header;