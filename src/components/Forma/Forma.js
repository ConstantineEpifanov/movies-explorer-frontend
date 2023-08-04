import React from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Forma({
  welcomeText,
  submitButtonText,
  questionText,
  linkText,
  link,
  children,
  handleSubmit,
  isValid,
  isLoading,
}) {
  const location = useLocation();

  return (
    <main>
      <section className="forma">
        <Link to="/">
          <img src={logo} alt="Логотип $" className="forma__logo link-hover" />
        </Link>
        <h1 className="forma__title">{welcomeText}</h1>
        <form onSubmit={handleSubmit} className="forma__form" noValidate>
          {children}
          <div
            className={
              location.pathname === "/signin"
                ? "forma__submit-container forma__submit-container_signin"
                : "forma__submit-container"
            }
          >
            <span className="forma__error forma__error_auth">
              {Error.message}
            </span>
            <button
              type="submit"
              className={
                isLoading || !isValid
                  ? "forma__button forma__button_disabled"
                  : "forma__button"
              }
              disabled={isLoading || !isValid}
            >
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

export default Forma;
