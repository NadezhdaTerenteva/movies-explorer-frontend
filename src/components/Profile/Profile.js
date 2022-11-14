import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { EMAIL_PATTERN } from "../../utils/constants";
import "./Profile.css";

function Profile({ isLoggedIn, onLogout, onUpdateUser }) {

  const { currentUser, reqIsProcessing } = useContext(CurrentUserContext);
  const [viewOnly, setViewOnly] = useState(true);
  const [dataIsModified, setDataIsModified] = useState(false);

  const { formInputs, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: currentUser.name || "",
      email: currentUser.email || ""
    });

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(formInputs);
  }

  
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const onEditClickHandler = (e) => {
    e.preventDefault();
    setViewOnly(false);
  }

  const inputOnChangeHandler = (e) => {
    
    const storedValue = currentUser[e.target.name];
    setDataIsModified(e.target.value !== storedValue);
  
    handleChange(e);
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
              value={formInputs.name || ''}
              onChange={inputOnChangeHandler}
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
            <span className="profile__error-message">{errors.name}</span>
          </div>
          <div className="profile__input-field">
            <label className="profile__form-label">
              E-mail
            </label>
            <input
              value={formInputs.email || ''}
              onChange={inputOnChangeHandler}
              className="profile__input"
              type="email"
              id="email"
              name="email"
              pattern={EMAIL_PATTERN}
              required
              disabled={viewOnly || reqIsProcessing}
            ></input>
            <span className="profile__error-message">{errors.email}</span>
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
