import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import './Movies.css';


function Movies() {

  return (
    <div className="movies">
      <SearchForm></SearchForm>
      <FilterCheckbox></FilterCheckbox>
      <MoviesCardList>

      </MoviesCardList>
      <Preloader></Preloader>
    </div>
  );
}

export default Movies;