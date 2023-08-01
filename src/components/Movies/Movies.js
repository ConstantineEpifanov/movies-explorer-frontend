import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import useResize from "../../hooks/useResize";

function Movies({
  movies,
  isErrorSearchMessage,
  handleMovieDelete,
  handleMovieFavorite,
  savedMovies,
}) {
  const [isChecked, setChecked] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isPreloader, setPreloader] = useState(false);
  const [moviesAddCount, setMoviesAddCount] = useState(0);
  const [notFoundSearch, setNotFoundSearch] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const moviesSearch = localStorage.getItem("moviesSearch");
  const searchReq = localStorage.getItem("searchReq");
  const shortsCheck = localStorage.getItem("shortsCheck");

  const size = useResize();

  useEffect(() => {
    if (moviesSearch) {
      setFilteredMovies(JSON.parse(moviesSearch));
    }
  }, []);

  useEffect(() => {
    if (shortsCheck) {
      setChecked(JSON.parse(shortsCheck));
    }
  }, []);

  useEffect(() => {
    if (searchReq) {
      values.search = JSON.parse(searchReq)
    }
  }, []);

  useEffect(() => {
    if (movies.length !== 0 && isChecked) {
      filterMovies();
    }
  }, [isChecked]);

  useEffect(() => {
    if (movies.length !== 0 && !isChecked) {
      filterMovies();
    }
  }, [isChecked]);

  useEffect(() => {
    setMoviesAddCount(0);
  }, [filteredMovies]);

  function filterMovies() {
    setPreloader(true);
    let filteredMoviesList = [];
    setNotFoundSearch(false);


    if (values.search && isChecked) {
      filteredMoviesList = movies.filter((movie) => {
        return (
          movie.duration <= 40 &&
          movie.nameRU
            .toLowerCase()
            .trim()
            .includes(values.search.toLowerCase())
        );
      });
      localStorage.setItem("moviesSearch", JSON.stringify(filteredMoviesList));
      localStorage.setItem("searchReq", JSON.stringify(values.search));
      setFilteredMovies(filteredMoviesList);
    }
    if (values.search && !isChecked) {
      filteredMoviesList = movies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .trim()
          .includes(values.search.toLowerCase());
      });
      localStorage.setItem("moviesSearch", JSON.stringify(filteredMoviesList));
    localStorage.setItem("searchReq", JSON.stringify(values.search));
      setFilteredMovies(filteredMoviesList);
    }

    if (filteredMoviesList.length === 0) {
      setNotFoundSearch(true);
    }
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }

  const filmsStartQuantity = () => {
    return size.isScreenLarge ? 12 : size.isScreenMedium ? 8 : 5;
  };

  function handleMoreClick() {
    setMoviesAddCount((prev) => prev + (size.isScreenLarge ? 3 : 2));
  }

  function handleSearch(evt) {
    evt.preventDefault();
    filterMovies();
  }

  function handleShortsClick() {
    setChecked((isChecked) => !isChecked);
    localStorage.setItem("shortsCheck", !isChecked);
  }

  return (
    <main className="movies">
      <SearchForm
        filterMovies={handleSearch}
        errors={errors}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        isChecked={isChecked}
        searchReq={searchReq}
        handleShortsClick={handleShortsClick}
      />
      <MoviesCardList
        filteredMovies={filteredMovies}
        savedMovies={savedMovies}
        handleMoreClick={handleMoreClick}
        moviesAddCount={moviesAddCount}
        filmsStartQuantity={filmsStartQuantity}
        isPreloader={isPreloader}
        notFoundSearch={notFoundSearch}
        isErrorSearchMessage={isErrorSearchMessage}
        handleMovieDelete={handleMovieDelete}
        handleMovieFavorite={handleMovieFavorite}
      />
    </main>
  );
}

export default Movies;
