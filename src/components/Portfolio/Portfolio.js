import "./Portfolio.css";
import Arrow from "../../images/arrow-min.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <ul className="portfolio__nav">
        <li>
          <p className="portfolio__title">Портфолио</p>
          <a
            href="https://github.com/NadezhdaTerenteva/how-to-learn"
            target="blank"
            className="portfolio__link"
          >
            <h4 className="portfolio__link-text">Статичный сайт</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
          </a>
        </li>
        <li>
          <a
            href="https://nadezhdaterenteva.github.io/russian-travel/"
            target="blank"
            className="portfolio__link"
          >
            <h4 className="portfolio__link-text">Адаптивный сайт</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
          </a>
        </li>
        <li>
          <a
            href="https://mesto.nadyaterenteva.nomoredomains.sbs/"
            target="blank"
            className="portfolio__link"
          >
            <h4 className="portfolio__link-text">Одностраничное приложение</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
