import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { Link } from "react-router-dom";
import useInput from '../../hooks/useInput';
import { nameValidators, emailValidators } from "../../utils/validators";

import "./Profile.css";

const validators = {
  name: nameValidators,
  email: emailValidators
}

function Profile({ isLoggedIn, onLogout, onUpdateUser }) {

  const { currentUser, reqIsProcessing } = useContext(CurrentUserContext);
  const [viewOnly, setViewOnly] = useState(true);
  const [dataIsModified, setDataIsModified] = useState(false);

  const [name, nameOnChange, nameIsValid, nameError ] = useInput(currentUser.name, validators, true);
  const [email, emailOnChange, emailIsValid, emailError ] = useInput(currentUser.email, validators, true);
  const [isValid, setIsValid] = useState(false);

  useEffect(()=>{
    const formIsValid = name && nameIsValid && emailIsValid  && email;
    setIsValid(formIsValid)
  }, [nameIsValid,emailIsValid, name, email])

  useEffect(()=>{
    const dataIsModified = currentUser.email !== email || currentUser.name !== name;
    setDataIsModified(dataIsModified);
  }, [name, email, currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({name, email});
    setViewOnly(true);
  }

  const onEditClickHandler = (e) => {
    e.preventDefault();
    setViewOnly(false);
  }

  return (
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
              value={name || ''}
              onChange={nameOnChange}
              className="profile__input"
              type="text"
              id="name"
              name="name"
              pattern="[A-Za-zА-Яа-яЁё\s-]+"
              maxLength="30"
              minlenght="2"
              required
              disabled={viewOnly || reqIsProcessing}
            ></input>
            <span className="profile__error-message">{nameError}</span>
          </div>
          <div className="profile__input-field">
            <label className="profile__form-label">
              E-mail
            </label>
            <input
              value={email || ''}
              onChange={emailOnChange}
              className="profile__input"
              type="email"
              id="email"
              name="email"
              required
              disabled={viewOnly || reqIsProcessing}
            ></input>
            <span className="profile__error-message">{emailError}</span>
          </div>
          {
            viewOnly
            ? <button 
                className="profile__submit-button" 
                type="button"
                onClick={onEditClickHandler}
              >
                Редактировать
            </button>
            :
            <button 
              className="profile__submit-button" 
              type="submit"
              disabled={!isValid || !dataIsModified || reqIsProcessing}
            >
              Сохранить
            </button>

          }
          
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
