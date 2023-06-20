import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <ul className="about-project__list">
        <li className="about-project__list-item">
          <h3 className="about-project__item-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__item-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__list-item">
          <h3 className="about-project__item-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__item-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__progress-bar">
        <div className="about-project__progress-bar-item about-project__progress-bar-item_backend">
          1 неделя
        </div>
        <div className="about-project__progress-bar-item about-project__progress-bar-item_frontend">
          4 недели
        </div>
        <p className="about-project__progress-bar-item-caption">Back-end</p>
        <p className="about-project__progress-bar-item-caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
