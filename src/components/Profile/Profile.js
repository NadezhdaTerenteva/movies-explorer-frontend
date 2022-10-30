import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { Link } from "react-router-dom";

import "./Profile.css";

function Profile({ onLogout, onUpdateUser }) {

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
    <section className="profile">
      <div className="profile-content">
        <h3 className="profile__header">{`Привет, ${currentUser.name || ''}!`}</h3>
        <form 
          className="profile__form"
          onSubmit={handleSubmit}>
          <div className="profile__input-field">
            <label for="name" className="profile__form-label">
              Имя
            </label>
            <input
              value={name || ""}
              onChange={handleNameChange}
              className="profile__input"
              type="text"
              id="name"
              name="name"
              required
            ></input>
          </div>
          <div className="profile__input-field">
            <label for="email" className="profile__form-label">
              E-mail
            </label>
            <input
              value={email || ""}
              onChange={handleEmailChange}
              className="profile__input"
              type="email"
              id="email"
              name="email"
              required
            ></input>
          </div>
          <button 
          className="profile__submit-button" 
          type="button">
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
  );
}

export default Profile;
