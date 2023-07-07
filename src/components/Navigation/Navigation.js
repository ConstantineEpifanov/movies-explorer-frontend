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
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link
            className="navigation__link navigation__link_main link-hover"
            to="/signup"
          >
            Регистрация
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            className="navigation__link navigation__button navigation__link_main link-hover"
            to="/signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );

  const loggenInPage = (
    <nav className="navigation">
      <button
        className={`navigation__burger-icon ${
          isMenuOpen ? "navigation__burger-icon_open" : ""
        } link-hover`}
        type="button"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className="navigation__container">
        <li className="navigation__item navigation__item_burger">
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${
                isActive ? "navigation__link_active" : ""
              } link-hover`
            }
            to="/"
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
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
        </li>
        <li className="navigation__item">
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
        </li>
        <li className="navigation__button navigation__button_logged">
          <Link
            className="navigation__link navigation__link_logged link-hover"
            to="/profile"
          >
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );

  return location.pathname === "/" ? mainPage : loggenInPage;
}

export default Navigation;
