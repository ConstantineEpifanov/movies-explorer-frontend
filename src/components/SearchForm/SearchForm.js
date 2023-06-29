import React from "react";
import FilterCheckBox from "../FilterCheckbox/FilterCheckBox";

function SearchForm() {
  return (
    <section>
      <form className="search-form">
        <fieldset className="search-form-bar">
          <label className="search-form-bar-icon" htmlFor="search" />
          <input
            className="search-form-bar-input"
            type="text"
            id="search"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search-form-bar-button link-hover"></button>
        </fieldset>

        <FilterCheckBox />
      </form>
    </section>
  );
}

export default SearchForm;
