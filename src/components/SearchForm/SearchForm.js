import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <label for="search-form__textfield">
        <input 
        type="search" 
        placeholder="Фильм"
        className="search-form__textfield"
        id="search-form__textfield"
        required
        />
      </label>
      <button 
      type="submit"
      className="search-form__button">Поиск
      </button>
    </form>
  );
}

export default SearchForm;