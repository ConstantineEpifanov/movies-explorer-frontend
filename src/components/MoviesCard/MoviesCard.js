import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MoviesCard({ movie, handleDelete, handleAddToFavorite }) {
  const [isLiked, setLike] = useState(false);

  const location = useLocation();

  function getDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return hours + "ч " + minutes + "м";
  }

  return (
    <li className="card">
      <Link to={movie.trailerLink}>
        <img
          className="card__img link-hover"
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        />
      </Link>
      <div className="card__container">
        <h2 className="card__title">{movie.nameRU}</h2>
        {location.pathname === "/saved-movies" ? (
          <button
            className="card__delete card__delete_active link-hover"
            type="button"
            onClick={() => handleDelete(movie._id)}
          />
        ) : (
          <button
            className={`card__like ${
              isLiked ? "card__like_active" : ""
            } link-hover`}
            type="button"
            onClick={() => handleAddToFavorite(movie)}
          />
        )}
      </div>
      {movie.duration && (
        <p className="card__duration">{getDuration(movie.duration)}</p>
      )}
    </li>
  );
}

export default MoviesCard;
