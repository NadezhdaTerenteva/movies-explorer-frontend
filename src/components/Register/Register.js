import React, { useState } from "react";

import Logo from '../../images/Logo-min.svg';

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    setMessage("");
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(registerData).catch((err) =>
      setMessage(err.message || "Что-то пошло не так")
    );
  };

  return (
    <div className="register">
      <img src={Logo} alt="Лого" className="header__logo header__logo_in-forms"></img>
      <h3 className="register__header">Добро пожаловать!</h3>
      <form onSubmit={handleSubmit} className="register__form">
        <label for="name" className="form-label">Имя</label>
        <input
          className="register__input"
          type="text"
          id="name"
          name="name"
          value={registerData.name || ""}
          required
          onChange={handleChange}
        ></input>
        <label for="email" className="form-label">E-mail</label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          value={registerData.email || ""}
          required
          onChange={handleChange}
        ></input>
        <label for="password" className="form-label">Пароль</label>
        <input
          className="register__input"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={registerData.password || ""}
          minLength="6" maxLength="10"
          required
          onChange={handleChange}
        ></input>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <h4 className="register__caption">
        Уже зарегистрированы?
        <a className="register__caption register__caption-link">
          {" "}
          Войти
        </a>
      </h4>
    </div>
  );
}

export default Register;