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
    <main>
      <section className="forma">
        <Link to="/">
          <img src={logo} alt="Логотип $" className="forma__logo link-hover" />
        </Link>
        <h1 className="forma__title">{welcomeText}</h1>
        <form onSubmit={handleSubmit} className="forma__form">
          {children}
          <label className="forma__input-name" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e@mail.ee"
            className="forma__form-input"
            required
          />
          <span className="forma__error"></span>
          <label className="forma__input-name" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="СекретныйПароль"
            className="forma__form-input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="forma__error forma__error_visible">
            Что-то пошло не так...
          </span>
          <div
            className={
              location.pathname === "/signin"
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
    </main>
  );
}

export default Form;
