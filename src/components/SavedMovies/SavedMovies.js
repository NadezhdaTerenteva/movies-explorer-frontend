import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SavedMovies.css';

function SavedMovies() {

    return (
      <div className="saved-movies">
        <SearchForm></SearchForm>
        <FilterCheckbox></FilterCheckbox>
        <MoviesCardList>
        </MoviesCardList>
      </div>
    );
  }
  
  export default SavedMovies;