import Logo from '../../images/Logo.svg';
import './Header.css';

function Header() {
  return ( 
      <header className="header">
        <img src={Logo} alt="Лого" className="header__logo"></img>
        <div className="header__buttons">
          <a className="header__button_signup" href="#">Регистрация</a>
          <a className="header__button_signin" href="#">Войти</a>
        </div>
      </header> 
  );
}

export default Header;