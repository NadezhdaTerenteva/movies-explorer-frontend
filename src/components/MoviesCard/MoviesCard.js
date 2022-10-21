import Film from "../../images/film1.png";
import "./MoviesCard.css";

function MoviesCard() {
  return (
    <div className="movies-card">
      <img src={Film} alt="Обложка фильма" className="movies-card__img"></img>
      <button className="movies-card__save-button movies-card__save-button_active">Сохранить</button>
      <button className="movies-card__saved-icon movies-card__saved-icon_active"></button>
      <button className="movies-card__delete-icon movies-card__delete-icon_active"></button>
      <div className="movies-card__description">
        <h5 className="movies-card__name">33 слова о дизайне</h5>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </div>
  );
}

export default MoviesCard;
