import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";


import Logo from "../../images/Logo-min.svg";
import { EMAIL_PATTERN } from "../../utils/constants";

function Login({ onLogin }) {
  const { formInputs, handleChange, errors, isValid } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  const [message, setMessage] = useState("");

  const { currentUser, reqIsProcessing } = useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formInputs.email || !formInputs.password) {
      return;
    }

    onLogin(formInputs).catch((err) =>
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
              value={formInputs.email}
              pattern={EMAIL_PATTERN}
              required
              onChange={handleChange}
              disabled={reqIsProcessing}
            ></input>
            <span className="login__error-message">{errors.email}</span>
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
              value={formInputs.password}
              minLength="6"
              maxLength="10"
              required
              onChange={handleChange}
              disabled={reqIsProcessing}
            ></input>
            <span className="login__error-message">{errors.password}</span>
          </div>
          <button
            className="login__submit-button"
            type="submit"
            disabled={!isValid }
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
