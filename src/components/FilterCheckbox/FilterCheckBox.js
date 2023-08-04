import React from "react";

function FilterCheckBox({ isChecked, handleShortsClick }) {
  return (
    <fieldset className="filter-checkbox">
      <label className="filter-checkbox__label link-hover" htmlFor="shortfilm">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          id="shortfilm"
          onChange={handleShortsClick}
          checked={isChecked}
        />
        <span className="filter-checkbox__visible"></span>
        Короткометражки
      </label>
    </fieldset>
  );
}

export default FilterCheckBox;
