import React from "react";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <Link
            className="portfolio__link-name link-hover"
            to="https://github.com/ConstantineEpifanov/how-to-learn"
          >
            Статичный сайт<p className="portfolio__link-sign">↗</p>
          </Link>
        </li>
        <li className="portfolio__link-item">
          <Link
            className="portfolio__link-name link-hover"
            to="https://github.com/ConstantineEpifanov/russian-travel"
          >
            Адаптивный сайт<p className="portfolio__link-sign">↗</p>
          </Link>
        </li>
        <li className="portfolio__link-item">
          <Link
            className="portfolio__link-name link-hover"
            to="https://github.com/ConstantineEpifanov/react-mesto-api-full-gha"
          >
            Одностраничное приложение<p className="portfolio__link-sign">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
