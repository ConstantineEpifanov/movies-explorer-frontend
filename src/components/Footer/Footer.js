import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__line"></div>
      <div className="footer__container">
        <p className="footer__copyright">Constantine © 2023</p>
        <ul className="footer__links">
          <Link
            className="footer__link link-hover"
            to="https://practicum.yandex.ru/"
          >
            <li>Яндекс.Практикум</li>
          </Link>
          <Link
            className="footer__link link-hover"
            to="https://github.com/ConstantineEpifanov/"
          >
            <li>Github</li>
          </Link>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
