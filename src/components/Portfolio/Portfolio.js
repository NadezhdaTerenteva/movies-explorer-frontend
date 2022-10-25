import './Portfolio.css';
import Arrow from '../../images/arrow-min.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <nav className="portfolio__nav">
        <p className="portfolio__title">Портфолио</p>
        <a href="https://github.com/NadezhdaTerenteva/how-to-learn" target="blank" className="portfolio__link">
            <h4 className="portfolio__link-text">Статичный сайт</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
        </a>
        <a href="https://github.com/NadezhdaTerenteva/russian-travel" target="blank" className="portfolio__link">
            <h4 className="portfolio__link-text">Адаптивный сайт</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
        </a>
        <a href="https://github.com/NadezhdaTerenteva/react-mesto-api-full" target="blank" className="portfolio__link">
            <h4 className="portfolio__link-text">Одностраничное приложение</h4>
            <img src={Arrow} alt="Стрелочка" className="portfolio__arrow"></img>
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;