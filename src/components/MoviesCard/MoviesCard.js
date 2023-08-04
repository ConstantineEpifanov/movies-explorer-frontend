import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MINUTES_IN_HOUR } from "../../utils/constants";

function MoviesCard({
  movie,
  savedMovies,
  handleMovieDelete,
  handleMovieFavorite,
  isLiked,
}) {
  const location = useLocation();

  function onCardClick() {
    if (isLiked) {
      handleMovieDelete(savedMovies.find((m) => m.movieId === movie.id));
    } else {
      handleMovieFavorite(movie);
    }
  }

  function onDelete() {
    handleMovieDelete(movie);
  }

  function getDuration(duration) {
    const hours = Math.floor(duration / MINUTES_IN_HOUR);
    const minutes = duration % MINUTES_IN_HOUR;

    return hours + "ч " + minutes + "м";
  }

  return (
    <li className="card">
      <Link to={movie.trailerLink}>
        <img
          className="card__img link-hover"
          src={
            location.pathname !== "/saved-movies"
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        />
      </Link>
      <div className="card__container">
        <h2 className="card__title">{movie.nameRU}</h2>
        {location.pathname === "/saved-movies" ? (
          <button
            className="card__delete card__delete_active link-hover"
            type="button"
            onClick={onDelete}
          />
        ) : (
          <button
            className={`card__like ${
              isLiked ? "card__like_active" : ""
            } link-hover`}
            type="button"
            onClick={onCardClick}
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
