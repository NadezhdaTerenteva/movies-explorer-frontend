import Film from "../../images/film1.png";
import "./MoviesCard.css";

function MoviesCard() {
  return (
    <section className="movies-card">
      <img src={Film} alt="Обложка фильма" className="movies-card__img"></img>
      <button type="button" className="movies-card__save-button movies-card__save-button_active">Сохранить</button>
      <button type="button" className="movies-card__saved-icon"></button>
      <button type="button" className="movies-card__delete-icon"></button>
      <div className="movies-card__description">
        <h5 className="movies-card__name">33 слова о дизайне</h5>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </section>
  );
}

export default MoviesCard;
