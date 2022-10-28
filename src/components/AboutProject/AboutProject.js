import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title"><a name="about-project">О проекте</a></h2>
      <article className="about-project__description">
        <h3 className="about-project__subtitle about-project__subtitle_1">Дипломный проект включал 5 этапов</h3>
        <h3 className="about-project__subtitle about-project__subtitle_2">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__paragraph about-project__paragraph_1">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about-project__paragraph about-project__paragraph_2">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
      <article className="about-project__terms">
        <p className="about-project__p about-project__p_1">1 неделя</p>
        <p className="about-project__p about-project__p_2">4 недели</p>
        <p className="about-project__p about-project__p_3">Back-end</p>
        <p className="about-project__p about-project__p_4">Front-end</p>
      </article>
    </section>
  );
}

export default AboutProject;