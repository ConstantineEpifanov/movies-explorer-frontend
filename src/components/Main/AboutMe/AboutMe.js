import React from "react";
import { Link } from "react-router-dom";
import photo from "../../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <article className="about-me__info">
        <h3 className="about-me__info-title">Константин</h3>
        <p className="about-me__info-subtitle">Фронтенд-разработчик, 34 года</p>
        <p className="about-me__info-text">
          Я родился и живу в Санкт-Петербурге, закончил факультет экономики и
          управления СПбТЭИ. У меня есть жена, дочь и сын. Увлекаюсь театром.
          Недавно начал кодить и понеслось...
        </p>
        <Link
          className="about-me__info-link link-hover"
          to="https://github.com/ConstantineEpifanov/"
        >
          Github
        </Link>

        <img className="about-me__photo" src={photo} alt="Фото студента"></img>
      </article>

    </section>
  );
}

export default AboutMe;
