import React, { useState, useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

import { moviesApi } from "../../utils/MoviesApi";
import useLocalStorage from "../../hooks/useLocalStorage";

function Movies({ favorites, addToFavorites, removeFromFavorites, setStatusMessage, setTooltipMessage }) {
  const [search, setSearch] = useLocalStorage("movies_search", ""); //
  const [shortMovies, setShortMovies] = useLocalStorage("movies_toggle", false); //возможно стоит признак сохранять в локал сторадж
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [initialCount, setInitialCount] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    const setPaginationParamsByWindowSize = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setInitialCount(12);
        setLoadCount(3);
      } else if (width >= 768 && width < 1280) {
        setInitialCount(8);
        setLoadCount(2);
      } else {
        setInitialCount(5);
        setLoadCount(2);
      }
    };

    const onResizeHandler = () => {
      setTimeout(setPaginationParamsByWindowSize, 200);
    };

    setPaginationParamsByWindowSize();

    window.addEventListener("resize", onResizeHandler);

    return () => {
      window.removeEventListener("resize", onResizeHandler);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((dataApi) => {
        setData(dataApi);
      })
      .catch((err) => {
        setStatusMessage(false);
        setTooltipMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let moviesForShow = [...data];
    if (search !== "") {
      moviesForShow = moviesForShow.filter(
        (item) => item.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    }

    if (shortMovies) {
      moviesForShow = moviesForShow.filter((item) => item.duration <= 40);
    }

    setDataShow(moviesForShow);
    setPage(1); //сброс пагинации
  }, [search, shortMovies, data]);

  useEffect(() => {
    console.log(`Перерендер при смене страницы Тек страница: ${page} `);

    if (page === 1) {
      setDataRender(dataShow.slice(0, initialCount));
    } else {
      const endIndex = Math.min(
        initialCount + (page - 1) * loadCount,
        dataShow.length
      );
      setDataRender(dataShow.slice(0, endIndex));
    }
  }, [page, dataShow, loadCount]);

  const filterOnChange = () => {
    setShortMovies(!shortMovies);
  };

  const handleSearch = (searchStr) => {
    setSearch(searchStr);
  };

  const searchOnClear = () => {
    setSearch("");
  };

  const onToggleCardState = (movie, isLiked) => {
    isLiked ? removeFromFavorites(movie) : addToFavorites(movie);
  };

  const loadMoreHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <section className="movies">
      <SearchForm
        searchValue={search}
        handleSearch={handleSearch}
        onClear={searchOnClear}
      />
      <FilterCheckbox
        value={shortMovies}
        onChangeHandler={filterOnChange}
        title="Короткометражки"
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList>
          {dataRender.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onToggleState={onToggleCardState}
              isLiked={
                favorites.findIndex((item) => item.id === movie.id) !== -1
              }
            />
          ))}
        </MoviesCardList>
      )}
      {(dataRender.length === 0) && (!isLoading) && (
        <span className="movies__error-message">Ничего не найдено</span>
      )}
      {dataShow.length > dataRender.length && (
        <button
          className="movies-card-list__more-button"
          onClick={loadMoreHandler}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default Movies;
