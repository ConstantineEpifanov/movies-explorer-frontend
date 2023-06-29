import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies__cards">
      <ul className="movies__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>

      <button type="button" className="movies__more link-hover">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
