import React, { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SavedMovies.css";

function SavedMovies({ favorites, removeFromFavorites }) {
  const [search, setSearch] = useState(""); //
  const [shortMovies, setShortMovies] = useState(false); //возможно стоит признак сохранять в локал сторадж
  const [dataShow, setDataShow] = useState([]);


  useEffect(() => {
    let moviesForShow = [...favorites];
    if (search !== "") {
      moviesForShow = moviesForShow.filter(
        (item) => item.nameRU.indexOf(search) !== -1
      );
    }

    if (shortMovies) {
      moviesForShow = moviesForShow.filter((item) => item.duration <= 40);
    }

    setDataShow(moviesForShow);
  }, [search, shortMovies, favorites]);

  const filterOnChange = () => {
    setShortMovies(!shortMovies);
  };

  const handleSearch = (searchRequest) => {
    setSearch(searchRequest);
  };

  const searchOnClear = () => {
    setSearch("");
  };

  const onToggleCardState = (movie) => {
    removeFromFavorites(movie);
  };

  return (
    <section className="movies">
      <SearchForm handleSearch={handleSearch} onClear={searchOnClear} />
      <FilterCheckbox
        value={shortMovies}
        onChangeHandler={filterOnChange}
        title="Короткометражки"
      />
        <MoviesCardList>
        {dataShow.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            onToggleState={onToggleCardState}
            isLiked= { favorites.findIndex(item=>item.id === movie.id) !== -1}
          />
        ))}
      </MoviesCardList>
    </section>
  );
}

export default SavedMovies;
