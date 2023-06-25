import React from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Form({
  welcomeText,
  submitButtonText,
  questionText,
  linkText,
  link,
  children,
}) {
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="forma">
      <form onSubmit={handleSubmit} className="forma__form">
        <Link to="/">
          <img src={logo} alt="Логотип $" className="forma__logo link-hover" />
        </Link>
        <h2 className="forma__title">{welcomeText}</h2>
        {children}
        <p className="forma__input-name">E-mail</p>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e@mail.ee"
          className="forma__form-input styled-focus"
          required
        />
        <span id="forma__error" className="forma__error"></span>
        <p className="forma__input-name">Пароль</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="СекретныйПароль"
          className="forma__form-input styled-focus"
          required
        />
        <span id="forma__error" className="forma__error forma__error_visible">
          Что-то пошло не так...
        </span>
        <div
          className={
            location.pathname === "/sign-in"
              ? "forma__submit-container forma__submit-container_signin"
              : "forma__submit-container"
          }
        >
          <button type="submit" className="forma__button">
            {submitButtonText}
          </button>
          <div className="forma__question">
            <p className="forma__text">{questionText} </p>
            <Link to={link} className="forma__link link-hover">
              {linkText}
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Form;
