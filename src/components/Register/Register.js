import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useInput from '../../hooks/useInput';
import { CurrentUserContext } from "../../context/CurrentUserContext";

import Logo from "../../images/Logo-min.svg";
import { nameValidators, emailValidators, passwordValidators } from "../../utils/validators";

const validators = {
  name: nameValidators,
  email: emailValidators,
  password: passwordValidators
}

function Register({ onRegister }) {
  // const { formInputs, handleChange, errors, isValid } =
  //   useFormWithValidation({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
    const [name, nameOnChange, nameIsValid, nameError ] = useInput("", validators);
    const [email, emailOnChange, emailIsValid, emailError ] = useInput("", validators);
    const [password, passwordOnChange, passwordIsValid, passwordError ] = useInput("", validators);
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);
    const { reqIsProcessing } = useContext(CurrentUserContext);

    useEffect(()=>{
      const formIsValid = nameIsValid && emailIsValid && passwordIsValid && email && password;
      setIsValid(formIsValid)
    }, [nameIsValid,emailIsValid,passwordIsValid, name, email, password])

    const onSubmit = (evt) => {
      evt.preventDefault();
  
      onRegister({name, email, password}).catch((err) =>
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
              value={name}
              placeholder="Имя"
              onChange={nameOnChange}
              pattern="[A-Za-zА-Яа-яЁё\s-]+"
              maxLength="30"
              minlenght="2"
              required
              disabled={reqIsProcessing}
            />
            <span className="register__error-message">{nameError}</span>
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
              value={email}
              placeholder="email"
              onChange={emailOnChange}
              required
              disabled={reqIsProcessing}
            />
            <span className="register__error-message">{emailError}</span>
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
              value={password}
              minLength="6"
              maxLength="10"
              required
              onChange={passwordOnChange}
              disabled={reqIsProcessing}
            ></input>
            <span className="register__error-message">{passwordError}</span>
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
