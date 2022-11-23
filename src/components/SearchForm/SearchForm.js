import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ searchValue, handleSearch, onClear }) {
  const [inputValue, setInputValue] = useState(searchValue);
  const [noSearchValue, setNoSearchValue] = useState('');

  useEffect(() => {
    setNoSearchValue('')
  }, [inputValue]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    inputValue ? handleSearch(inputValue) : setNoSearchValue('Введите ключевое слово!')
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
      <form onSubmit={handleSubmit} className="search-form" noValidate>
          <input
            type="text"
            placeholder="Фильм"
            className="search-form__textfield"
            id="search-form__textfield"
            value={inputValue}
            onChange={inputOnChange}
            required
          />
        <button 
        type="button" 
        className={deleteSearchButtonClassName}
        onClick={onSearchClear}
        ></button>
        <span className="search-form__error-message">{noSearchValue}</span>
        <button type="submit" className="search-form__button">
          Поиск
        </button>
      </form>
  );
}

export default SearchForm;
