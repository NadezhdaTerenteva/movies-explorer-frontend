import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";

import Header from '../Header/Header';


import "./Profile.css";

function Profile({ isLoggedIn, onLogout, onUpdateUser }) {

  const { formInputs, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: "",
      email: "",
    });

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      email,
    });
  }

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

 
  return (
    <>
    <Header isLoggedIn={isLoggedIn}/>
    <section className="profile">
      
      <div className="profile-content">
        <h3 className="profile__header">{`Привет, ${currentUser.name || ''}!`}</h3>
        <form 
          className="profile__form"
          onSubmit={handleSubmit}>
          <div className="profile__input-field">
            <label className="profile__form-label">
              Имя
            </label>
            <input
              value={name || formInputs.name}
              onChange={handleNameChange}
              className="profile__input"
              type="text"
              id="name"
              name="name"
              pattern="[A-Za-zА-Яа-яЁё\s-]+"
              maxLength="30"
              minlenght="2"
              required
            ></input>
            <span className="profile__error-message">{errors.name}</span>
          </div>
          <div className="profile__input-field">
            <label className="profile__form-label">
              E-mail
            </label>
            <input
              value={email || formInputs.email}
              onChange={handleEmailChange}
              className="profile__input"
              type="email"
              id="email"
              name="email"
              required
            ></input>
            <span className="profile__error-message">{errors.email}</span>
          </div>
          <button 
          className="profile__submit-button" 
          type="button"
          disabled={!isValid}>
            Редактировать
          </button>
        </form>
        <h4 className="profile__caption">
          <Link to="/" 
          onClick={onLogout}
          className="profile__caption profile__caption-link">
            Выйти из аккаунта
          </Link>
        </h4>
      </div>
    </section>
    </>
  );
}

export default Profile;
