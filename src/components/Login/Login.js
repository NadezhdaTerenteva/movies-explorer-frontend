import React, { useState } from "react";

import Logo from "../../images/Logo-min.svg";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }

    onLogin(loginData).catch((err) =>
      setMessage(err.message || "Что-то пошло не так")
    );
  };

  return (
    <div className="login">
      <img
        src={Logo}
        alt="Лого"
        className="logo_in-forms"
      ></img>
      <h3 className="login__header">Рады видеть!</h3>
      <form onSubmit={handleSubmit} className="register__form">
      <label for="password" className="form-label">
          E-mail
        </label>
        <input
          className="login__input"
          type="email"
          id="email"
          name="email"
          value={loginData.email || ""}
          required
          onChange={handleChange}
        ></input>
        <label for="password" className="form-label">
          Пароль
        </label>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={loginData.password || ""}
          minLength="6"
          maxLength="10"
          required
          onChange={handleChange}
        ></input>
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
      <h4 className="login__caption">
      Ещё не зарегистрированы?
        <a className="login__caption login__caption-link">
          {" "}
          Регистрация
        </a>
      </h4>
    </div>
  );
}

export default Login;
