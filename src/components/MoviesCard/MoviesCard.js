import React, {useState} from "react";
import { Link } from "react-router-dom";
import card from "../../images/card.jpg";

function MoviesCard() {
const [isLiked, setLike] = useState(false)

function toggleLike() {
  setLike(!isLiked)
}

  return (
    <li className="card">
      <Link to="https://www.kinopoisk.ru/film/565818/"><img className="card__img link-hover" src={card} alt="Gimme Danger: История Игги и The Stooges в красках" /></Link>
      <div className="card__container">
        <h2 className="card__title">
          Gimme Danger: История Игги и The Stooges в красках
        </h2>
        <button type="button" className={`card__like ${isLiked ? "card__like_active" :""} link-hover` } onClick={toggleLike}></button>
      </div>
      <p className="card__duration">1ч 4м</p>
    </li>
  );
}

export default MoviesCard;
