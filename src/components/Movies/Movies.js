import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import useResize from "../../hooks/useResize";

function Movies({ movies, isErrorSearchMessage }) {
  const [searchValue, setSearchValue] = useState({});
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
    if (searchReq) {
      setSearchValue(JSON.parse(searchReq));
    }
  }, [searchReq]);

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
    let filteredMoviesList = [];
    setNotFoundSearch(false);

    if (values && isChecked) {
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

      setFilteredMovies(filteredMoviesList);
    }
    if (values && !isChecked) {
      filteredMoviesList = movies.filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .trim()
          .includes(values.search.toLowerCase());
      });
      localStorage.setItem("moviesSearch", JSON.stringify(filteredMoviesList));

      setFilteredMovies(filteredMoviesList);
    }

    if (filteredMoviesList.length === 0) {
      return setNotFoundSearch(true);
    }
    localStorage.setItem("searchReq", JSON.stringify(values.search));
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
        handleMoreClick={handleMoreClick}
        moviesAddCount={moviesAddCount}
        filmsStartQuantity={filmsStartQuantity}
        isPreloader={isPreloader}
        notFoundSearch={notFoundSearch}
        isErrorSearchMessage={isErrorSearchMessage}
      />
    </main>
  );
}

export default Movies;
