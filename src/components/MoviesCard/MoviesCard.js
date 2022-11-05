import { useLocation } from "react-router-dom";

import "./MoviesCard.css";
import { FILE_ROOT } from "../../utils/MoviesApi";

function MoviesCard({ movie, isLiked, onToggleState }) {
  
  const { image, nameRU, duration, trailerLink } = movie;
 
  const location = useLocation();

  // преобразование минут в часы
  function changeDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  function handleCardLike() {
    onToggleState(movie, isLiked);
  }

  const cardSavedButtonClassName = `${
    isLiked
      ? "movies-card__saved-icon movies-card__saved-icon_active"
      : "movies-card__saved-icon"
  }`;

  const cardSaveButtonClassName = `${
    isLiked
      ? "movies-card__save-button"
      : "movies-card__save-button movies-card__save-button_active"
  }`;

  return (
    <section className="movies-card">
      <a
        className="movies-card__container"
        target="_blank"
        rel="noreferrer"
        href={trailerLink}
      >
        <img
          src={`${FILE_ROOT}${image.formats.thumbnail.url}`}
          alt="Обложка фильма"
          className="movies-card__img"
        ></img>
      </a>
      {location.pathname === "/movies" && (
        <>
          <button
            type="button"
            onClick={handleCardLike}
            className={cardSaveButtonClassName}
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={handleCardLike}
            className={cardSavedButtonClassName}
          ></button>
        </>
      )}

      {location.pathname === "/saved-movies" && (
        <button
          type="button"
          onClick={handleCardLike}
          className="movies-card__delete-icon movies-card__delete-icon_active"
        ></button>
      )}
      <div className="movies-card__description">
        <h5 className="movies-card__name">{nameRU}</h5>
        <p className="movies-card__duration">{changeDuration(duration)}</p>
      </div>
    </section>
  );
}

export default MoviesCard;
