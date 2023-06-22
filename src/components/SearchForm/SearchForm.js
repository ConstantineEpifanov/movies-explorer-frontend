import React from "react";
import FilterCheckBox from "../FilterCheckbox/FilterCheckBox";

function SearchForm() {
  return (
    <form className="search-form">
      <fieldset className="search-form-bar">
        <label className="search-form-bar-icon" htmlFor="search" />
        <input
          className="search-form-bar-input styled-focus"
          type="text"
          id="search"
          placeholder="Фильм"
          required
        />
        <button className="search-form-bar-button"></button>
        <div className="search-form-bar-line"></div>
      </fieldset>

      <FilterCheckBox />
    </form>
  );
}

export default SearchForm;
