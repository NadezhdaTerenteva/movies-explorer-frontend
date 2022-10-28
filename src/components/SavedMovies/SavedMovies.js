import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SavedMovies.css';

function SavedMovies() {

    return (
      <section className="saved-movies">
        <SearchForm></SearchForm>
        <FilterCheckbox></FilterCheckbox>
        <MoviesCardList>
        </MoviesCardList>
      </section>
    );
  }
  
  export default SavedMovies;