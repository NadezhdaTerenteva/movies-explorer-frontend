import './AboutMe.css';
import Photo from '../../images/photo.png';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__description">
        <div className="about-me__info">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__occupation">Фронтенд-разработчик, 30 лет</p>
            <p className="about-project__bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
             </p>
            <a href="https://github.com/NadezhdaTerenteva" className="about-me__github-link">Github</a>
        </div>
        <img src={Photo} alt="Фото" className="about-me__photo"></img>
      </article>
    </section>
  );
}

export default AboutMe;