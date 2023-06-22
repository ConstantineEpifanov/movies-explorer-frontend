import React from "react";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <Link
          className="portfolio__link link-hover"
          to="https://github.com/ConstantineEpifanov/how-to-learn"
        >
          <li className="portfolio__link-name">Статичный сайт</li>
          <p className="portfolio__link-sign">↗</p>
        </Link>
        <div className="line"></div>
        <Link
          className="portfolio__link link-hover"
          to="https://github.com/ConstantineEpifanov/russian-travel"
        >
          <li className="portfolio__link-name">Адаптивный сайт</li>
          <p className="portfolio__link-sign">↗</p>
        </Link>
        <div className="line"></div>
        <Link
          className="portfolio__link link-hover"
          to="https://github.com/ConstantineEpifanov/react-mesto-api-full-gha"
        >
          <li className="portfolio__link-name">Одностраничное приложение</li>
          <p className="portfolio__link-sign">↗</p>
        </Link>
      </ul>
    </section>
  );
}

export default Portfolio;
