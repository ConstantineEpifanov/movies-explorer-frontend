import React, { useMemo, useState } from "react";
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
}) {
  const location = useLocation();

  const moviesRender = useMemo(() => {
    return filteredMovies.slice(0, filmsStartQuantity() + moviesAddCount);
  }, [filteredMovies, moviesAddCount]);

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
                  key={movie.id || movie.movieId}
                  movie={movie}
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
