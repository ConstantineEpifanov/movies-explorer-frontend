import React, { useMemo } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  handleMoreClick,
  filteredMovies,
  moviesAddCount,
  filmsStartQuantity,
  isPreloader,
  notFoundSearch,
  isErrorSearchMessage,
  savedMovies,
  handleMovieDelete,
  handleMovieFavorite,
}) {
  const location = useLocation();

  const moviesRender = useMemo(() => {
    if (location.pathname === "/movies") {
      return filteredMovies.slice(0, filmsStartQuantity() + moviesAddCount);
    } else {
      return filteredMovies;
    }
  }, [filteredMovies, moviesAddCount]);

  function getSavedMovieCard(savedMovies, movie) {
    return savedMovies.find((savedMovies) => savedMovies.movieId === movie.id);
  }

  return (
    <section className="movies__cards">
      {isPreloader ? (
        <Preloader isPreloader={isPreloader} />
      ) : isErrorSearchMessage ? (
        <>
          <p>Во время запроса произошла ошибка.</p>
          <p>
            Возможно, проблема с соединением или сервер недоступен. Подождите
            немного и попробуйте ещё раз
          </p>
        </>
      ) : notFoundSearch ? (
        <p>Ничего не найдено</p>
      ) : (
        <>
          <ul className="movies__list">
            {moviesRender.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie._id}
                  movie={movie}
                  savedMovies={savedMovies}
                  isLiked={getSavedMovieCard(savedMovies, movie)}
                  handleMovieDelete={handleMovieDelete}
                  handleMovieFavorite={handleMovieFavorite}
                />
              );
            })}
          </ul>
          {location.pathname === "/movies" &&
            filteredMovies.length > moviesRender.length && (
              <button
                type="button"
                onClick={handleMoreClick}
                className="movies__more link-hover"
              >
                Ещё
              </button>
            )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
