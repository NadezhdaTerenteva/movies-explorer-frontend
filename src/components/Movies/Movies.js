import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Movies.css';


function Movies() {

  return (
    <section className="movies">
      <SearchForm></SearchForm>
      <FilterCheckbox></FilterCheckbox>
      <MoviesCardList>

      </MoviesCardList>
    </section>
  );
}

export default Movies;