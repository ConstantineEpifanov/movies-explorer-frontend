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

  // Вставка данных при загрузки страницы из локалки
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

  // useEffect(() => {
  //   if (searchReq) {
  //     values.search = JSON.parse(searchReq)
  //   }
  // }, []);

// Переключение короткометражек для рендера карточек
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

  // Кол-во фильмов на странице при рендере
  useEffect(() => {
    setMoviesAddCount(0);
  }, [filteredMovies]);


// Фильтр-поиск фильмов из локалки
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


  // Стартовое кол-во фильмов для отображения на разных разрешениях
  const filmsStartQuantity = () => {
    return size.isScreenLarge ? 12 : size.isScreenMedium ? 8 : 5;
  };
  // Кнопка еще
  function handleMoreClick() {
    setMoviesAddCount((prev) => prev + (size.isScreenLarge ? 3 : 2));
  }
// Клик на кнопку поиска
  function handleSearch(evt) {
    evt.preventDefault();
    filterMovies();
  }
// Клик на короткометражки
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
