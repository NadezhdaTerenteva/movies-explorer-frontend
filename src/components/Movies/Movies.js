import React, { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./Movies.css";

import { moviesApi } from "../../utils/MoviesApi";

function Movies() {
  const [search, setSearch] = useState(""); //
  const [shortMovies, setShortMovies] = useState(false); //возможно стоит признак сохранять в локал сторадж
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((dataApi) => {
        console.dir(dataApi);
        setData(dataApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let moviesForShow = [...data];
    if (search !== "") {
      moviesForShow = moviesForShow.filter(
        (item) => item.nameRU.indexOf(search) !== -1
      );
    }

    if (shortMovies) {
      moviesForShow = moviesForShow.filter((item) => item.duration <= 40);
    }

    setDataShow(moviesForShow);
  }, [search, shortMovies, data]);

  const filterOnChange = () => {
    setShortMovies(!shortMovies)
  }

  const handleSearch = (searchRequest) => {
    setSearch(searchRequest);
    
  }

  const searchOnClear = () => {
    setSearch("");
  }

   

  return (
    <section className="movies">
      <SearchForm
        handleSearch={handleSearch}
        onClear={searchOnClear}
      />
      <FilterCheckbox
        value={shortMovies}
        onChangeHandler={filterOnChange}
        title="Короткометражки"
      />
      <MoviesCardList>
        {dataShow.map((movie) => (
          <MoviesCard key={movie.id} {...movie} />
        ))}
      </MoviesCardList>
    </section>
  );
}

export default Movies;
