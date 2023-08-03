import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { SHORT_FILM_MAX_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, handleMovieDelete, handleMovieFavorite }) {
  const [isChecked, setChecked] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isPreloader, setPreloader] = useState(false);
  const [notFoundSearch, setNotFoundSearch] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const savedMoviesSearch = localStorage.getItem("savedMoviesSearch");
  const savedSearchReq = localStorage.getItem("savedSearchReq");
  const savedShortsCheck = localStorage.getItem("savedShortsCheck");

  useEffect(() => {
    if (savedMoviesSearch) {
      setFilteredSavedMovies(JSON.parse(savedMoviesSearch));
    } else {
      setFilteredSavedMovies(savedMovies);
    }
  }, []);

  useEffect(() => {
    if (savedSearchReq) {
      values.search = JSON.parse(savedSearchReq);
    }
  }, []);

  useEffect(() => {
    if (savedShortsCheck) {
      setChecked(JSON.parse(savedShortsCheck));
    }
  }, []);

  useEffect(() => {
    if (savedMovies.length !== 0 && isChecked) {
      filterSavedMovies();
    }
  }, [isChecked]);

  useEffect(() => {
    if (savedMovies.length !== 0 && !isChecked) {
      filterSavedMovies();
    }
  }, [isChecked]);

  useEffect(() => {
    filterSavedMovies();
  }, [savedMovies]);

  function filterSavedMovies() {
    setPreloader(true);
    let filteredMoviesList = [];
    setNotFoundSearch(false);

    if (values.search && isChecked) {
      filteredMoviesList = savedMovies.filter((movie) => {
        return (
          movie.duration <= SHORT_FILM_MAX_DURATION &&
          movie.nameRU
            .toLowerCase()
            .trim()
            .includes(values.search.toLowerCase())
        );
      });
      localStorage.setItem(
        "savedMoviesSearch",
        JSON.stringify(filteredMoviesList)
      );
      localStorage.setItem("savedSearchReq", JSON.stringify(values.search));
      setFilteredSavedMovies(filteredMoviesList);
    }
    if (values.search && !isChecked) {
      filteredMoviesList = savedMovies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .trim()
          .includes(values.search.toLowerCase());
      });
      localStorage.setItem(
        "savedMoviesSearch",
        JSON.stringify(filteredMoviesList)
      );
      localStorage.setItem("savedSearchReq", JSON.stringify(values.search));
      setFilteredSavedMovies(filteredMoviesList);
    }

    if (filteredMoviesList.length === 0) {
      setNotFoundSearch(true);
    }
    setTimeout(() => {
      setPreloader(false);
    }, 500);
  }

  function handleSearch(evt) {
    evt.preventDefault();
    filterSavedMovies();
  }

  function handleShortsClick() {
    setChecked((isChecked) => !isChecked);
    localStorage.setItem("savedShortsCheck", !isChecked);
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
        searchReq={savedSearchReq}
        handleShortsClick={handleShortsClick}
      />
      <MoviesCardList
        filteredMovies={filteredSavedMovies}
        savedMovies={savedMovies}
        isPreloader={isPreloader}
        notFoundSearch={notFoundSearch}
        handleMovieDelete={handleMovieDelete}
        handleMovieFavorite={handleMovieFavorite}
      />
    </main>
  );
}

export default SavedMovies;
