import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <label for="search-form__itextfield">
        <input 
        type="text" 
        placeholder="Фильм"
        className="search-form__textfield"
        id="search-form__textfield"
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