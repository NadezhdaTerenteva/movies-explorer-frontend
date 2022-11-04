import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ searchValue, handleSearch, onClear }) {
  const [inputValue, setInputValue] = useState(searchValue);
  const [noSearchValue, setNoSearchValue] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      setNoSearchValue("Нужно ввести ключевое слово");
    }
    handleSearch(inputValue);
  };

  const inputOnChange = (e) => {
    setInputValue(e.target.value);
  }

  const onSearchClear = () => {
    setInputValue('');
    onClear();
  }

  const deleteSearchButtonClassName = `${
    inputValue !== ""
      ? "search-form__clear-button search-form__clear-button_active"
      : "search-form__clear-button"
  }`;

  return (
      <form onSubmit={handleSubmit} className="search-form">
        {/* <label htmlFor="search-form__textfield"> */}
          <input
            type="text"
            placeholder="Фильм"
            className="search-form__textfield"
            id="search-form__textfield"
            value={inputValue}
            onChange={inputOnChange}
            required
          />
        {/* </label> */}
        <button 
        type="button" 
        className={deleteSearchButtonClassName}
        onClick={onSearchClear}
        ></button>
        <button type="submit" className="search-form__button">
          Поиск
        </button>
      </form>
  );
}

export default SearchForm;
