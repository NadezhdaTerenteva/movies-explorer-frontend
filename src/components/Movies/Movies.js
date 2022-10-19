import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Movies.css';

function Movies() {

  return (
    <div className="movies">
      <FilterCheckbox></FilterCheckbox>
      <MoviesCardList>

      </MoviesCardList>
    </div>
  );
}

export default Movies;