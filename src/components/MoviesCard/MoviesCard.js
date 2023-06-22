import React from "react";
import card from "../../images/card.jpg";

function MoviesCard() {
  return (
    <li className="card">
      <img className="card__img" src={card} alt="Постер" />
      <div className="card__container">
        <h2 className="card__title">
          Gimme Danger^ История Игги и The Stooges в красках
        </h2>
        <button className="card__like"></button>
      </div>
      <p className="card__duration">1ч 4м</p>
    </li>
  );
}

export default MoviesCard;
