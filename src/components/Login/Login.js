import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useInput from '../../hooks/useInput';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { emailValidators, passwordValidators } from "../../utils/validators";

import Logo from "../../images/Logo-min.svg";

const validators = {
  email: emailValidators,
  password: passwordValidators
}

function Login({ onLogin }) {

  const [email, emailOnChange, emailIsValid, emailError ] = useInput("", validators);
  const [password, passwordOnChange, passwordIsValid, passwordError ] = useInput("", validators);
  
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  const { reqIsProcessing } = useContext(CurrentUserContext);

  useEffect(()=>{
    const formIsValid = emailIsValid && passwordIsValid && email && password;
    setIsValid(formIsValid)
  }, [emailIsValid,passwordIsValid, email, password])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }

    onLogin({email, password}).catch((err) =>
      setMessage(err.message || "Что-то пошло не так")
    );
  };

  return (
    <section className="login">
      <div className="login-content">
        <Link to="/">
          <img src={Logo} alt="Лого" className="logo_in-forms"></img>
        </Link>
        <h3 className="login__header">Рады видеть!</h3>
        <form onSubmit={handleSubmit} className="login__form">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <div className="login__input-field">
            <input
              className="login__input"
              type="email"
              id="email"
              name="email"
              value={email}
              
              required
              onChange={emailOnChange}
              disabled={reqIsProcessing}
            ></input>
            <span className="login__error-message">{emailError}</span>
          </div>
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <div className="login__input-field">
            <input
              className="login__input"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              minLength="6"
              maxLength="10"
              required
              onChange={passwordOnChange}
              disabled={reqIsProcessing}
            ></input>
            <span className="login__error-message">{passwordError}</span>
          </div>
          <button
            className="login__submit-button"
            type="submit"
            disabled={!isValid || reqIsProcessing}
          >
            Войти
          </button>
        </form>
        <h4 className="login__caption">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__caption login__caption-link">
            {" "}
            Регистрация
          </Link>
        </h4>
      </div>
    </section>
  );
}

export default Login;
