import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import Logo from "../../images/Logo-min.svg";
import { EMAIL_PATTERN } from "../../utils/constants";

function Register({ onRegister }) {
  const { formInputs, handleChange, errors, isValid } =
    useFormWithValidation({
      name: "",
      email: "",
      password: "",
    });

    const [message, setMessage] = useState("");

    const { currentUser, reqIsProcessing } = useContext(CurrentUserContext);

    const onSubmit = (evt) => {
      evt.preventDefault();
  
      onRegister(formInputs).catch((err) =>
        setMessage(err.message || "Что-то пошло не так")
      );
    };
  

  return (
    <section className="register">
      <div className="register-content">
        <Link to="/">
          <img src={Logo} alt="Лого" className="logo_in-forms"></img>
        </Link>
        <h3 className="register__header">Добро пожаловать!</h3>
        <form onSubmit={onSubmit} className="register__form">
          <label htmlFor="name" className="form-label">
            Имя
          </label>
          <div className="register__input-field">
            <input
              className="register__input"
              type="text"
              id="name"
              name="name"
              value={formInputs.name}
              placeholder="Имя"
              onChange={handleChange}
              pattern="[A-Za-zА-Яа-яЁё\s-]+"
              maxLength="30"
              minlenght="2"
              required
              disabled={reqIsProcessing}
            />
            <span className="register__error-message">{errors.name}</span>
          </div>
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <div className="register__input-field">
            <input
              className="register__input"
              type="email"
              id="email"
              name="email"
              value={formInputs.email}
              pattern={EMAIL_PATTERN}
              placeholder="email"
              onChange={handleChange}
              required
              disabled={reqIsProcessing}
            />
            <span className="register__error-message">{errors.email}</span>
          </div>
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <div className="register__input-field">
            <input
              className="register__input"
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
            <span className="register__error-message">{errors.password}</span>
          </div>
          <button
            className="register__submit-button"
            type="submit"
            disabled={!isValid || reqIsProcessing}
          >
            Зарегистрироваться
          </button>
        </form>
        <h4 className="register__caption">
          Уже зарегистрированы?
          <Link
            to="/signin"
            className="register__caption register__caption-link"
          >
            {" "}
            Войти
          </Link>
        </h4>
      </div>
    </section>
  );
}

export default Register;
