import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const mainPage = (
    <nav className="navigation navigation_main">
      <Link className="navigation__link link-hover" to="/sign-up">
        Регистрация
      </Link>
      <Link
        className="navigation__button link-hover"
        to="/sign-in"
      >
        Войти
      </Link>
    </nav>
  );

  const loggenInPage = (
    <nav className="navigation">
      <div className="navigation__container">
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
      </div>
      <Link
        className="navigation__button navigation__button_logged link-hover"
        to="/profile"
      >
        Аккаунт
      </Link>
    </nav>
  );

  // const loggenInPageBurger = (
  //   <nav className="navigation navigation_burger">
  //     <div className="navigation__container">
  //       <Link className="navigation__link link-hover" to="/">
  //         Главная
  //       </Link>
  //       <NavLink
  //         className={({ isActive }) =>
  //           `navigation__link ${
  //             isActive ? "navigation__link_active" : ""
  //           } link-hover`
  //         }
  //         to="/movies"
  //       >
  //         Фильмы
  //       </NavLink>
  //       <NavLink
  //         className={({ isActive }) =>
  //           `navigation__link ${
  //             isActive ? "navigation__link_active" : ""
  //           } link-hover`
  //         }
  //         to="/saved-movies"
  //       >
  //         Сохранённые фильмы
  //       </NavLink>
  //     </div>
  //     <Link
  //       className="navigation__button navigation__button_logged link-hover"
  //       to="/profile"
  //     >
  //       Аккаунт
  //     </Link>
  //   </nav>
  // );

  return location.pathname === "/" ? mainPage : loggenInPage;
}

export default Navigation;
