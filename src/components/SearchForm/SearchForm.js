import React, { useEffect } from "react";
import FilterCheckBox from "../FilterCheckbox/FilterCheckBox";
import { useLocation } from "react-router-dom";

function SearchForm({
  filterMovies,
  values,
  errors,
  handleChange,
  isValid,
  isChecked,
  searchReq,
  handleShortsClick,
  isDisabledForm,
}) {
  const location = useLocation();

  // Вставка данных
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      (typeof searchReq === String || Number)
    ) {
      values.search = JSON.parse(searchReq);
    }
  }, []);

  return (
    <section>
      <form className="search-form" onSubmit={filterMovies} noValidate>
        <fieldset className="search-form-bar">
          <label className="search-form-bar__icon" htmlFor="search" />
          <input
            className="search-form-bar__input"
            type="text"
            id="search"
            name="search"
            placeholder="Фильм"
            required
            value={values.search || ""}
            minLength={1}
            onChange={handleChange}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`search-form-bar__button ${
              isDisabledForm || !isValid
                ? "search-form-bar__button_disabled"
                : "link-hover"
            }`}
            disabled={isDisabledForm || !isValid}
          ></button>
          {errors.search && (
            <span className="search-form-bar__error">
              Нужно ввести ключевое слово!
            </span>
          )}
        </fieldset>

        <FilterCheckBox
          isChecked={isChecked}
          handleShortsClick={handleShortsClick}
        />
      </form>
    </section>
  );
}

export default SearchForm;
