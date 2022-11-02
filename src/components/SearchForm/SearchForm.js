import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch, onClear }) {
  const [searchValue, setSearchValue] = useState("");
  const [noSearchValue, setNoSearchValue] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchValue) {
      setNoSearchValue("Нужно ввести ключевое слово");
    }
    handleSearch(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="search-form__textfield">
          <input
            type="search"
            placeholder="Фильм"
            className="search-form__textfield"
            id="search-form__textfield"
            value={searchValue}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="search-form__button">
          Поиск
        </button>
      </form>
  );
}

export default SearchForm;
