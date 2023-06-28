import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const mainPage = (
    <nav className="navigation navigation_main">
      <Link className="navigation__link navigation__link_main link-hover" to="/sign-up">
        Регистрация
      </Link>
      <Link className="navigation__button navigation__link_main link-hover" to="/sign-in">
        Войти
      </Link>
    </nav>
  );

  const loggenInPage = (
    <nav className="navigation">
      <button
        className={`navigation__burger-icon ${
          isMenuOpen ? "navigation__burger-icon_open" : ""
        }`}
        type="button"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="navigation__container">
      <NavLink
          className={({ isActive }) =>
            `navigation__link navigation__link_movies${
              isActive ? "navigation__link_active" : ""
            } link-hover`
          }
          to="/"
        >Главная</NavLink>
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${
              isActive ? "navigation__link_active" : ""
            } link-hover`
          }
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${
              isActive ? "navigation__link_active" : ""
            } link-hover`
          }
          to="/saved-movies"
        >
          Сохранённые фильмы
        </NavLink>
        <Link
          className="navigation__button navigation__button_logged link-hover"
          to="/profile"
        >
          Аккаунт
        </Link>
      </div>
    </nav>
  );

  return location.pathname === "/" ? mainPage : loggenInPage;
}

export default Navigation;
